import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setIsNewVersionInfo,
  setOpenVersionTray,
} from "../../../redux/slices/versionTraySlice";
import TrayWrapper from "../TrayWrapper";
import styles from "./VersionsTray.module.scss";
import NoteHead from "../commentsTray/noteSection/noteHead/NoteHead";
import NoteBody from "../commentsTray/noteSection/noteBody/NoteBody";
import { VscVersions } from "react-icons/vsc";
import useToGetARecipeVersion from "../../../customHooks/useToGetARecipeVersion";
import useToChangeDefaultVersion from "../../../customHooks/useToChangeDefaultVersion";
import TrayTag from "../TrayTag";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleVerticalHistory } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import Image from "next/image";
import { faStarSharp } from "@fortawesome/pro-solid-svg-icons";
import useToAddARecipeVersion from "../../../customHooks/useToAddARecipeVersion";
import useToEditOfARecipeVersion from "../../../customHooks/useToEditOfARecipeVersion";
import useToRemoveARecipeVersion from "../../../customHooks/useToRemoveARecipeVersion";
import notification from "../../utility/reactToastifyNotification";
import ConfirmationModal from "../../../theme/confirmationModal/ConfirmationModal";
import useToUpdateAfterEditVersion from "../../../customHooks/useToUpdateAfterEditVersion";
import { setDetailsARecipe } from "../../../redux/slices/recipeSlice";
import { VersionAddDataType } from "../../../type/versionAddDataType";
import updateName from "../../../helperFunc/string/updateName";
import { VersionDataType } from "../../../type/recipeDetailsType";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";

interface VersionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

const VersionTray = ({ showPanle, showTagByDefaut }: VersionTrayProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [removeVersionInfo, setRemoveVersionInfo] = useState<{
    [key: string]: any;
  }>({});
  const [showForm, setShowForm] = useState(false);
  const [updateVersion, setUpdateVersion] = useState(false);
  const [formState, setFormState] = useState({ title: "", body: "" });
  const [updateVersionId, setUpdateVersionId] = useState("");
  const [isVersionSharable, setIsVersionSharable] = useState(false);
  const { openVersionTray, openVersionTrayFormWhichPage, isNewVersionInfo } =
    useAppSelector((state) => state?.versionTray);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const { handleToGetARecipeVersion } = useToGetARecipeVersion();
  const router = useRouter();
  const { handleToUpdateDefaultVersion, loading: changeDefaultVersionLoading } =
    useToChangeDefaultVersion();
  const { handleToAddRecipeVersion, loading: addNewVersionLoading } =
    useToAddARecipeVersion();
  const { handleToEditARecipeVersion, loading: editOrCreateVersionLoading } =
    useToEditOfARecipeVersion();
  const handleToUpdateARecipeVersionAfterEdit = useToUpdateAfterEditVersion();
  const { handleToRemoveARecipeVersion, loading: removeARecipeVersionLoading } =
    useToRemoveARecipeVersion();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  // toggle form and if new version info exist remove
  const toggleForm = () => {
    setShowForm((pre) => !pre);

    if (isNewVersionInfo) {
      dispatch(setIsNewVersionInfo(null));
    }
  };

  // update form function
  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e?.target;
    setFormState((pre) => ({ ...pre, [name]: value }));
  };

  // close version tray
  const closeTray = () => {
    dispatch(setOpenVersionTray(false));
  };

  // create or update a recipe version
  const createOrUpdateVarsion = async () => {
    try {
      if (updateVersion) {
        const returnObj = await handleToEditARecipeVersion(
          dbUser?._id,
          detailsARecipe?.recipeId?._id,
          updateVersionId,
          isVersionSharable,
          {
            postfixTitle: formState?.title,
            description: formState?.body,
          },
        );
        handleToUpdateARecipeVersionAfterEdit(
          updateVersionId,
          isVersionSharable,
          {
            postfixTitle: formState?.title,
            description: formState?.body,
          },
          returnObj,
        );
        toggleForm();
      } else {
        const obj: VersionAddDataType = {
          description: formState?.body,
          postfixTitle: formState?.title,
          recipeId: detailsARecipe?.recipeId?._id,
          userId: dbUser?._id,
          ingredients: isNewVersionInfo?.ingredients || null,
          recipeInstructions: isNewVersionInfo?.recipeInstructions || null,
          servingSize: isNewVersionInfo?.servingSize || null,
          selectedImage: isNewVersionInfo?.selectedImage || "",
          errorIngredients: isNewVersionInfo?.errorIngredients || null,
        };
        const version = await handleToAddRecipeVersion(
          obj,
          allVersions?.map((version) => version?.postfixTitle),
        );
        if (version) {
          dispatch(
            setDetailsARecipe({
              ...detailsARecipe,
              turnedOnVersions: [version, ...detailsARecipe?.turnedOnVersions],
              versionsCount: detailsARecipe?.versionsCount + 1,
            }),
          );
          notification("success", `Recipe version create successfully`);
        }
        toggleForm();
        if (isNewVersionInfo) {
          dispatch(setIsNewVersionInfo(null));
        }
      }
    } catch (error) {
      console.log(error);
      notification("error", "Something went wrong");
      toggleForm();
    }
  };

  // open confirmation modal when delete a version
  const openConfirmationModal = (versionId: string, isTurnedOn?: boolean) => {
    setRemoveVersionInfo({ versionId, isTurnedOn });
    setOpenModal(true);
  };

  // version delete function
  const deleteRecipeVersion = async () => {
    await handleToRemoveARecipeVersion(
      dbUser?._id,
      detailsARecipe?.recipeId?._id,
      removeVersionInfo?.versionId,
      removeVersionInfo?.isTurnedOn,
    );
    setOpenModal(false);
  };

  const handleButtonClick = (title = "", body = "") => {
    setFormState((pre) => ({ ...pre, title, body }));
    setUpdateVersion(false);
    toggleForm();
  };

  // update version value before edit
  const updateVersionValue = (val: any) => {
    const title = val?.postfixTitle;
    const id = val?._id;
    const body = val?.description;
    const isVersionSharable = val?.isVersionSharable;
    setIsVersionSharable(isVersionSharable);
    setUpdateVersion(true);
    setFormState((pre) => ({ ...pre, title, body }));
    setUpdateVersionId(id);
    toggleForm();
  };

  // normalize version to show default and turn on/off indicator
  const allVersions: VersionDataType[] = useMemo(() => {
    let versions: VersionDataType[] = [];

    versions = [
      ...(detailsARecipe?.turnedOnVersions?.map((version) => ({
        ...version,
        isVersionSharable: true,
        isDefault: false,
      })) || []),
      ...(detailsARecipe?.turnedOffVersions?.map((version) => ({
        ...version,
        isVersionSharable: false,
      })) || []),
    ];

    if (!detailsARecipe?.isMatch) {
      if (
        versions?.find(
          (version) => version?._id === detailsARecipe?.defaultVersion?._id,
        )
      ) {
        versions = versions?.map((version) =>
          version?._id === detailsARecipe?.defaultVersion?._id
            ? { ...version, isDefault: true }
            : version,
        );
      } else {
        versions = [
          {
            ...detailsARecipe?.defaultVersion,
            isVersionSharable: true,
            isDefault: true,
          },
          ...versions,
        ];
      }
    }
    return versions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    detailsARecipe?.defaultVersion,
    detailsARecipe?.isMatch,
    detailsARecipe?.turnedOffVersions,
    detailsARecipe?.turnedOnVersions,
  ]);

  // change default version function
  const changeDefaultVersionAndUpdateValue = async (
    userId: string,
    recipeId: string,
    versionId: string,
    isOriginalVersion: boolean,
    isDefault: boolean,
  ) => {
    if (isDefault) {
      notification("info", "This version is already default version !!!");
    } else {
      await handleToUpdateDefaultVersion(
        userId,
        recipeId,
        versionId,
        isOriginalVersion,
      );
    }
  };

  // if new version info update state
  useEffect(() => {
    if (isNewVersionInfo) {
      const {
        postfixTitle = "",
        description = "",
        recipeId = "",
        userId = "",
        ingredients = [],
        recipeInstructions = [],
        servingSize = 0,
      } = isNewVersionInfo;
      setFormState((pre) => ({
        ...pre,
        title: updateName(postfixTitle, [
          postfixTitle,
          ...allVersions?.map((version) => version?.postfixTitle),
        ]),
        body: description,
      }));
      setShowForm(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewVersionInfo]);

  useEffect(() => {
    const newName = updateName(
      detailsARecipe?.recipeId?.originalVersion?.postfixTitle,
      [
        detailsARecipe?.recipeId?.originalVersion?.postfixTitle,
        ...allVersions?.map((version) => version?.postfixTitle),
      ],
    );
    if (showForm && !formState?.title) {
      setFormState((pre) => ({
        ...pre,
        title: newName,
      }));
    }
    if (showForm && !formState?.body) {
      setFormState((pre) => ({
        ...pre,
        body: `${newName} description`,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showForm]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={closeTray}
      openTray={openVersionTray}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag icon={<VscVersions />} placeMent="left" hover={hover} />
      )}
    >
      <div className={styles.versionContainer}>
        <div className={styles.header}>
          <div className={styles.headingLeft}>
            <FontAwesomeIcon
              icon={faRectangleVerticalHistory}
              color="#7cbc39"
            />
            <h3 className={styles.text}>Recipe versions</h3>
          </div>
          <div
            className={styles.headingRight}
            onClick={() =>
              detailsARecipe?.versionsCount &&
              router.push(`/versionCompare/${detailsARecipe?.recipeId?._id}`)
            }
          >
            <Tooltip content="Compare versions" direction="left">
              <Image
                src={
                  detailsARecipe?.versionsCount
                    ? "/images/compare-fill-icon.svg"
                    : "/images/compare-fill-icon-gray.svg"
                }
                alt="icon"
                loading="lazy"
                width={16}
                height={16}
                style={{
                  cursor: detailsARecipe?.versionsCount
                    ? "pointer"
                    : "not-allowed",
                }}
              />
              {/* <FontAwesomeIcon icon={faScaleBalanced} color="#7cbc39" /> */}
            </Tooltip>
          </div>
        </div>

        <div className={styles.recipeName}>
          <div className={styles.leftSide}>
            <Image
              src={
                detailsARecipe?.recipeId?.image?.find((img) => img?.default)
                  ?.image
              }
              alt="recipe_img"
              width={45}
              height={45}
              objectFit="cover"
              loading="lazy"
              className={styles.image}
            />
            <h3
              className={`${styles.heading} 
             
              `}
              onClick={() =>
                handleToGetARecipeVersion(
                  detailsARecipe?.recipeId?.originalVersion?._id,
                  true,
                  null,
                )
              }
            >
              {detailsARecipe?.recipeId?.originalVersion?.postfixTitle ||
                detailsARecipe?.recipeId?.name}
            </h3>
          </div>

          <div className={styles.rightSide}>
            {/* <Tooltip
              content={`Share ${detailsARecipe?.isMatch ? "on" : "off"}`}
              direction="left"
            >
              <FontAwesomeIcon
                icon={faShareNodes}
                className={`${styles.star} ${
                  detailsARecipe?.isMatch ? styles.on : styles.off
                }`}
              />
            </Tooltip> */}
            <Tooltip
              content={`${
                detailsARecipe?.isMatch ? "Default" : "Make default"
              }`}
              direction="left"
            >
              {changeDefaultVersionLoading ? (
                <CircularRotatingLoader color="primary" />
              ) : (
                <FontAwesomeIcon
                  onClick={() =>
                    openVersionTrayFormWhichPage === "edit" &&
                    changeDefaultVersionAndUpdateValue(
                      dbUser?._id,
                      detailsARecipe?.recipeId?._id,
                      detailsARecipe?.recipeId?.originalVersion?._id,
                      true,
                      detailsARecipe?.isMatch,
                    )
                  }
                  icon={faStarSharp}
                  className={`${styles.star} ${
                    openVersionTrayFormWhichPage !== "edit" &&
                    styles.pointerEventNone
                  } ${detailsARecipe?.isMatch ? styles.on : styles.off}`}
                />
              )}
            </Tooltip>
          </div>
        </div>
        <NoteHead
          showForm={showForm}
          toggleNoteForm={toggleForm}
          noteForm={formState}
          updateNoteForm={updateForm}
          createOrUpdateNote={createOrUpdateVarsion}
          handleButtonClick={() => handleButtonClick()}
          isFromRecipePage={openVersionTrayFormWhichPage}
          variant="versions"
          addNewItemLoading={addNewVersionLoading || editOrCreateVersionLoading}
        />
        <NoteBody
          data={allVersions}
          deleteItem={openConfirmationModal}
          updateItem={updateVersionValue}
          varient="versions"
          // loading={addNewVersionLoading}
          isFromRecipePage={openVersionTrayFormWhichPage}
          handleToGetARecipeVersion={handleToGetARecipeVersion}
        />
      </div>
      <ConfirmationModal
        text="All the related entities will be removed along with this version !!!"
        cancleFunc={() => setOpenModal(false)}
        submitFunc={deleteRecipeVersion}
        loading={removeARecipeVersionLoading}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </TrayWrapper>
  );
};

export default VersionTray;
