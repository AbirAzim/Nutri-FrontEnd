import React from "react";
import styles from "../NoteSection.module.scss";
import { format } from "date-fns";
import SkeletonNote from "../../../../../theme/skeletons/skeletonNote/SkeletonNote";
import Tooltip from "../../../../../theme/toolTip/CustomToolTip";
import IconWarper from "../../../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/pro-light-svg-icons";
import CircularRotatingLoader from "../../../../../theme/loader/circularRotatingLoader.component";
import { faShareNodes, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarSharp } from "@fortawesome/pro-solid-svg-icons";
import { useAppSelector } from "../../../../../redux/hooks";
import notification from "../../../../utility/reactToastifyNotification";
import useTurnedOnOrOffVersion from "../../../../../customHooks/useTurnedOnOrOffVersion";
import useToChangeDefaultVersion from "../../../../../customHooks/useToChangeDefaultVersion";

type isFromRecipePageType = "details" | "edit" | "default";

interface NoteBodyPops {
  data?: any[];
  updateItem?: (val: any) => void;
  deleteItem?: (id: string, isTurnedOn?: boolean) => void;
  varient?: "notes" | "versions";
  loading?: boolean;
  isFromRecipePage?: isFromRecipePageType;
  handleToGetARecipeVersion?: (
    id: string,
    isOriginalVersion: boolean,
    isShareAble: boolean | null,
  ) => void;
  handleToChangeDefaultVersion?: (
    versionId: string,
    isOriginalVersion: boolean,
  ) => void;
  deleteItemLoading?: boolean;
  handleTurnOnOrOffVersion?: (turnedOn: boolean, versionId: string) => void;
}
const NoteBody = ({
  data = [],
  deleteItem = () => {},
  updateItem = () => {},
  varient = "notes",
  loading = false,
  isFromRecipePage = "default",
  handleToGetARecipeVersion = () => {},
  handleToChangeDefaultVersion = () => {},
  deleteItemLoading = false,
  handleTurnOnOrOffVersion = () => {},
}: NoteBodyPops) => {
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  return (
    <div className={`${styles.noteEditBox} y-scroll`}>
      {loading ? (
        <SkeletonNote />
      ) : data?.length ? (
        data?.map((item, index) => {
          return (
            <div className={styles.singleNoteEdit} key={index}>
              <div className={styles.header}>
                <h3
                  onClick={() =>
                    handleToGetARecipeVersion(
                      item?._id,
                      false,
                      item?.isDefault ? null : item?.isShareAble,
                    )
                  }
                  className={`${
                    isFromRecipePage === "edit" ||
                    isFromRecipePage === "details"
                      ? styles.headingHover
                      : null
                  } ${
                    detailsARecipe?.tempVersionInfo?.version?._id === item?._id
                      ? styles.active
                      : ""
                  }`}
                >
                  {item?.title || item?.postfixTitle}
                </h3>
                {isFromRecipePage === "default" ||
                isFromRecipePage === "edit" ? (
                  <FloodingMenuOne
                    deleteItem={deleteItem}
                    deleteItemLoading={deleteItemLoading}
                    item={item}
                    updateItem={updateItem}
                  />
                ) : null}
              </div>

              <div className={styles.noteDis}>
                <p>{item?.body || item?.description}</p>

                <div className={styles.buttomDis}>
                  <span>
                    {item?.updatedAt ? (
                      <>
                        {format(new Date(item?.updatedAt), "MM/dd/yyyy")}{" "}
                        (edited)
                      </>
                    ) : (
                      item?.createdAt &&
                      format(new Date(item?.createdAt), "MM/dd/yyyy")
                    )}
                  </span>
                  {isFromRecipePage === "edit" ||
                  isFromRecipePage === "details" ? (
                    <FloodingMenuTwo
                      handleToChangeDefaultVersion={
                        handleToChangeDefaultVersion
                      }
                      handleTurnOnOrOffVersion={handleTurnOnOrOffVersion}
                      isFromRecipePage={isFromRecipePage}
                      item={item}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className={styles.noNotes}>
          No {`${varient === "notes" ? "Notes" : "Varsions"}`}
        </p>
      )}
    </div>
  );
};

export default NoteBody;

interface FloodingMenuOneProps {
  item: any;
  updateItem: (agr: any) => void;
  deleteItem: (versionId: string, isTurnedOn?: boolean) => void;
  deleteItemLoading: boolean;
}

const FloodingMenuOne = ({
  item,
  updateItem = () => {},
  deleteItem = () => {},
  deleteItemLoading = false,
}: FloodingMenuOneProps) => {
  return (
    <div className={styles.rightSide}>
      <div className={styles.content}>
        <IconWarper
          hover="none"
          defaultBg="gray"
          handleClick={() => updateItem(item)}
          style={{ marginRight: "5px" }}
        >
          <FontAwesomeIcon icon={faPen} fontSize={12} />
        </IconWarper>

        <IconWarper
          hover="none"
          defaultBg="gray"
          handleClick={() => deleteItem(item?._id, item?.isVersionSharable)}
        >
          {deleteItemLoading ? (
            <CircularRotatingLoader
              color="white"
              style={{ fontSize: "16px" }}
            />
          ) : (
            <FontAwesomeIcon icon={faTrash} fontSize={12} />
          )}
        </IconWarper>
      </div>
    </div>
  );
};

interface FloodingMenuTwoProps {
  item: any;
  isFromRecipePage: isFromRecipePageType;
  handleToChangeDefaultVersion: (
    versionId: string,
    isOriginalVersion: boolean,
  ) => void;
  handleTurnOnOrOffVersion?: (turnedOn: boolean, versionId: string) => void;
}

const FloodingMenuTwo = ({
  item = {},
  isFromRecipePage = "default",
}: FloodingMenuTwoProps) => {
  const detailsARecipe = useAppSelector(
    (state) => state?.recipe?.detailsARecipe,
  );
  const userId = useAppSelector((state) => state?.user?.dbUser?._id);
  const { handleTurnOnOrOffVersion, loading: versionTurnOnOrOffLoading } =
    useTurnedOnOrOffVersion();
  const { handleToUpdateDefaultVersion, loading: changeDefaultVersionLoading } =
    useToChangeDefaultVersion();

  // handle turn of and off version
  const handleToTurnOnOrOffVersion = (turnedOn: boolean, versionId: string) => {
    if (turnedOn && versionId === detailsARecipe?.defaultVersion?._id) {
      notification(
        "warning",
        "Not allow to turn off as it's default version !!!",
      );
    } else {
      handleTurnOnOrOffVersion(
        !turnedOn,
        userId,
        detailsARecipe?.recipeId?._id,
        versionId,
      );
    }
  };
  // handle turn of and off version

  const handleToChangeDefault = async (
    versionId: string,
    isShareAble: boolean,
    isDefault: boolean,
  ) => {
    if (isDefault) {
      notification("info", "This version is already default version !!!");
    } else {
      if (!isShareAble) {
        notification(
          "warning",
          "Not allow to make default as it's turn off version !!!",
        );
      } else {
        await handleToUpdateDefaultVersion(
          userId,
          detailsARecipe?.recipeId?._id,
          versionId,
          versionId === detailsARecipe?.defaultVersion?._id,
        );
      }
    }
  };

  return (
    <div className={styles.leftSide}>
      <Tooltip
        content={`Make share ${item?.isVersionSharable ? "off" : "On"}`}
        direction="left"
      >
        {versionTurnOnOrOffLoading ? (
          <CircularRotatingLoader
            color="primary"
            style={{ marginLeft: "12px" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faShareNodes}
            className={`${styles.star}  ${
              item?.isVersionSharable ? styles.on : styles.off
            }`}
            onClick={() =>
              isFromRecipePage === "edit" &&
              handleToTurnOnOrOffVersion(
                item?.isVersionSharable ? true : false,
                item?._id,
              )
            }
          />
        )}
      </Tooltip>

      <Tooltip
        content={item?.isDefault ? "Default" : "Make default"}
        direction="left"
      >
        {changeDefaultVersionLoading ? (
          <CircularRotatingLoader
            color="primary"
            style={{ marginLeft: "12px" }}
          />
        ) : (
          <FontAwesomeIcon
            onClick={() =>
              isFromRecipePage === "edit" &&
              handleToChangeDefault(
                item?._id,
                item?.isVersionSharable ? true : false,
                item?.isDefault,
              )
            }
            className={`${styles.star}  ${
              item?.isDefault ? styles.on : styles.off
            }`}
            icon={faStarSharp}
          />
        )}
      </Tooltip>
    </div>
  );
};
