/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./centerElements.module.scss";
import ScoreTray from "./scoreTray/scoreTray.component";
import Image from "next/image";
import { setQuantity } from "../../../../redux/edit_recipe/quantity";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setSelectedBlendCategory } from "../../../../redux/edit_recipe/editRecipeStates";
import RecipeDropDown from "../../../../theme/dropDown/recipeDropDown.component";
import HandleImageShow from "../../share/handleImageShow/HandleImageShow";
import InputComponent from "../../../../theme/input/input.component";
import TextArea from "../../../../theme/textArea/TextArea";
import { RecipeDetailsType } from "../../../../type/recipeDetailsType";
import useOnClickOutside from "../../../utility/useOnClickOutside";
import { useMutation } from "@apollo/client";
import DELETE_A_RECIPE from "../../../../gqlLib/recipes/mutations/deleteARecipe";
import { useRouter } from "next/router";
import notification from "../../../utility/reactToastifyNotification";
import CustomModal from "../../../../theme/modal/customModal/CustomModal";
import ConfirmationModal from "../../../../theme/confirmationModal/ConfirmationModal";
import { GiGl } from "../../../../type/nutrationType";

type CenterElementsProps = {
  copyDetailsRecipe?: RecipeDetailsType;
  updateEditRecipe?: (key: string, value: any) => void;
  allBlendCategories?: [];
  selectedBLendCategory?: string;
  existingImage?: string[];
  setExistingImage?: Dispatch<SetStateAction<string[]>>;
  setImages?: Dispatch<SetStateAction<any[]>>;
  images?: any[];
  giGl?: GiGl;
};

const Center_Elements = ({
  copyDetailsRecipe = null,
  updateEditRecipe = () => {},
  allBlendCategories,
  selectedBLendCategory,
  images = [],
  setImages = () => {},
  existingImage = [],
  setExistingImage = () => {},
  giGl = {
    netCarbs: 0,
    totalGi: 0,
    totalGL: 0,
  },
}: CenterElementsProps) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const [blendCategoryState, setBlendCategoryState] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const outsideClickRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outsideClickRef, () => setOpenMenu(false));
  const quantity_number = useAppSelector(
    (state) => state?.quantityAdjuster?.quantityNum,
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const [deleteARecipe, { loading }] = useMutation(DELETE_A_RECIPE);
  const router = useRouter();
  let BlendtecItem = [
    { name: `Blentec`, value: `Blentec` },
    { value: `Blentec`, name: `Blentec` },
  ];
  let OzItem = [
    { name: "64oz", value: "64oz" },
    { value: "64oz", name: "64oz" },
  ];

  // delete one recipe
  const deleteOneRecipe = async () => {
    try {
      await deleteARecipe({
        variables: {
          userId: dbUser?._id,
          recipeId: copyDetailsRecipe?.recipeId._id,
        },
      });
      setOpenModal(false);
      router?.push("/");
    } catch (error) {
      notification("error", "Unable to delete recipe");
    }
  };

  useEffect(() => {
    if (!selectedBLendCategory) return;
    setBlendCategoryState(selectedBLendCategory);
  }, [selectedBLendCategory]);

  useEffect(() => {
    let blendCategoryId = allBlendCategories?.filter((elem) => {
      //@ts-ignore
      return elem?.name === blendCategoryState;
    });

    blendCategoryId &&
      // @ts-ignore
      dispatch(setSelectedBlendCategory(blendCategoryId[0]?._id));
  }, [blendCategoryState]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.topSection}>
          <InputComponent
            borderSecondary={true}
            style={{ fontWeight: "bold", color: "#000000", fontSize: "16px" }}
            value={copyDetailsRecipe?.tempVersionInfo?.version?.postfixTitle}
            name={"postfixTitle"}
            onChange={(e) =>
              updateEditRecipe(e?.target?.name, e?.target?.value)
            }
          />
        </div>
        <div className={styles.addImagediv}>
          <HandleImageShow
            existingImage={existingImage}
            setExistingImage={setExistingImage}
            images={images}
            setImages={setImages}
            checkBoxProps={{
              showCheckBox: true,
              selectedImage:
                copyDetailsRecipe?.tempVersionInfo?.version?.selectedImage,
              handleChange: (e) =>
                updateEditRecipe("selectedImage", e?.target?.value),
            }}
          />
        </div>
        <div className={styles.scoreTraydiv}>
          <TextArea
            name="description"
            borderSecondary={true}
            value={copyDetailsRecipe?.tempVersionInfo?.version?.description}
            onChange={(e) =>
              updateEditRecipe(e?.target?.name, e?.target?.value)
            }
            style={{ color: "#484848", resize: "vertical" }}
          />

          <ScoreTray giGl={giGl} />
          <div className={styles.blendingOptions}>
            <div className={styles.blendingOptions__left}>
              <ul>
                <li>
                  <div className={styles.left__options}>
                    <RecipeDropDown
                      elemList={allBlendCategories}
                      selectedValue={blendCategoryState}
                      setSelectedValue={setBlendCategoryState}
                    />
                  </div>
                </li>
                <li>
                  <div className={styles.left__options}>
                    <RecipeDropDown elemList={BlendtecItem} />
                  </div>
                </li>
                <li>
                  <div className={styles.left__options}>
                    <RecipeDropDown elemList={OzItem} />
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.blendingOptions__right}>
              <div className={styles.blendingOptions__right__options}>
                <span className={styles.text}>{quantity_number}</span>
                <div className={styles.arrow}>
                  <div className={styles.arrow_div}>
                    <Image
                      onClick={() => {
                        dispatch(
                          setQuantity(
                            quantity_number < 1 ? 1 : quantity_number - 1,
                          ),
                        );
                      }}
                      src={"/icons/dropdown.svg"}
                      alt="icon"
                      width={"17px"}
                      height={"15px"}
                      className={styles.reverse_arrow}
                    />
                    <Image
                      onClick={() => {
                        dispatch(setQuantity(quantity_number + 1));
                      }}
                      src={"/icons/dropdown.svg"}
                      alt="icon"
                      width={"17px"}
                      height={"15px"}
                      className={styles.original_arrow}
                    />
                  </div>
                </div>
              </div>
              <span className={styles.timer_icon}>
                <Image
                  src={"/icons/time-icon.svg"}
                  alt="Picture will load soon"
                  height={"20px"}
                  width={"20px"}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        text="All the related entities will be removed along with this recipe !!!"
        cancleFunc={() => setOpenModal(false)}
        submitFunc={deleteOneRecipe}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default Center_Elements;
