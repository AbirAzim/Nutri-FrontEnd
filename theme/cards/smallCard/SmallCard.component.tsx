/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./smallcard.module.scss";
import { IoClose } from "react-icons/io5";
import IconWarper from "../../iconWarper/IconWarper";
import { CompareRecipeType } from "../../../type/compareRecipeType";

interface SmallCardComponentProps {
  img?: string;
  text?: string;
  fnc?: (recipe: any) => void;
  recipe?: any;
  findCompareRecipe?: (id: string) => any;
  fucUnCheck?: (id: string, e: React.SyntheticEvent) => void;
  compareLength: number;
  handleRemoveFromCompare?: (
    id: string,
    e: React.SyntheticEvent,
    versionId: string,
  ) => void;
  id?: string;
  defaultVersionId?: string;
}

export default function SmallCardComponent({
  img = "",
  text = "",
  fnc = () => {},
  findCompareRecipe = () => {},
  fucUnCheck = () => {},
  compareLength = 0,
  handleRemoveFromCompare = () => {},
  id = "",
  defaultVersionId = "",
  recipe = {},
}: SmallCardComponentProps) {
  text = text || "Chocolate Avocado Smoothie";
  img = img || "/cards/coriander.png";

  const findRecipe = findCompareRecipe && findCompareRecipe(id);

  const handleClick = () => {
    fnc && fnc(recipe);
  };

  const handleUnCheck = (e: React.SyntheticEvent) => {
    fucUnCheck && fucUnCheck(id, e);
  };

  return (
    <div className={styles.smallCard}>
      <div className={styles.smallCard__innerContainer}>
        {findRecipe ? (
          <button
            className={`${styles.compar}`}
            onClick={(e) => handleUnCheck(e)}
          >
            <IconWarper
              defaultBg="primary"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
              iconColor="iconColorWhite"
            >
              <IoClose fontSize={16} />
            </IconWarper>
            compare
          </button>
        ) : (
          <button
            disabled={compareLength === 8 ? true : false}
            className={`${styles.compar} 
         ${compareLength === 8 ? styles.disable : ""}
         `}
            onClick={handleClick}
          >
            compare
          </button>
        )}

        <div className={styles.tick}>
          <IconWarper
            hover="bgPrimary"
            defaultBg="gray"
            handleClick={(e) =>
              handleRemoveFromCompare(id, e, defaultVersionId)
            }
          >
            <IoClose />
          </IconWarper>
        </div>

        <div className={styles.smallCard__top}>
          <img src={img} alt="coriander" />
        </div>
        <div
          className={styles.smallCard__bottom}
          style={{
            backgroundColor: findRecipe ? "#FBEBE3" : "inherit",
          }}
        >
          <p
            style={{
              fontWeight: findRecipe ? "bold" : "500",
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
