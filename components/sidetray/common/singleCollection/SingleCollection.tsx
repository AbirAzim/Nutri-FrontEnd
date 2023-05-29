import { faHandHolding } from "@fortawesome/free-solid-svg-icons";
import {
  faPencil,
  faShareNodes,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setChangeRecipeWithinCollection } from "../../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../../redux/slices/sideTraySlice";
import CustomCheckbox from "../../../../theme/checkbox/CustomCheckbox";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";
import useHover from "../../../utility/useHover";
import styles from "./SingleMenu.module.scss";
import Image from "next/image";

interface IndividualCollectionType {
  name?: string;
  image?: string;
  slug?: string;
  description?: string;
  showMoreMenu?: boolean;
  changeItemWithinCollection?: boolean;
  isRecipeWithinCollection?: boolean;
  id?: string;
  handleClickCheckBox?: (e: React.SyntheticEvent, id: string) => void;
  index?: number;
  collectionItemLength?: number;
  menuIndex?: number;
  setMenuIndex?: Dispatch<SetStateAction<number>>;
  handleDeleteCollection?: (id: string, isShared?: boolean) => void;
  handleShareCollection?: (
    id: string,
    name: string,
    image: string,
    slug: string,
    isSharedCollection?: boolean,
    sharedUserEmail?: string,
  ) => void;
  handleEditCollection?: (
    id: string,
    name: string,
    slug: string,
    description: string,
    isShared?: boolean,
  ) => void;
  deleteCollectionLoading?: boolean;
  collectionRoute: "recipeCollection" | "blogCollection" | "planCollection";
  isShared?: boolean;
  sharedBy?: {
    _id?: string;
    email?: string;
    firstName?: string;
    displayName?: string;
    lastName?: string;
    image?: string;
  };
  canContribute?: boolean;
  route?: string;
}

const SingleCollection = ({
  name = "All Recipes",
  image = "/cards/food.png",
  slug = "",
  description = "",
  showMoreMenu = false,
  changeItemWithinCollection = false,
  isRecipeWithinCollection = false,
  id = "",
  handleClickCheckBox = () => {},
  index,
  collectionItemLength = 0,
  menuIndex = 0,
  setMenuIndex = () => {},
  handleDeleteCollection = () => {},
  handleShareCollection = (
    id: string = "",
    name: string = "",
    image: string = "",
    slug: string = "",
    isSharedCollection = false,
    sharedUserEmail = "",
  ) => {},
  handleEditCollection = () => {},
  deleteCollectionLoading = false,
  collectionRoute = "recipeCollection",
  isShared = false,
  sharedBy = {
    _id: "",
    displayName: "",
    email: "",
    firstName: "",
    image: "",
    lastName: "",
  },
  canContribute,
  route = "",
}: IndividualCollectionType) => {
  console.log(image);

  const [hoverRef, isHovered] = useHover();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClick = (index: number) => {
    if (menuIndex === index) {
      setMenuIndex(index);
    } else {
      setMenuIndex(index);
    }
  };

  // close recipe collection tray
  const handleCollectionRoute = (route: string) => {
    router.push(route);
    if (collectionRoute === "recipeCollection") {
      dispatch(setOpenCollectionsTary(false));
      dispatch(setChangeRecipeWithinCollection(false));
    }
  };

  return (
    <>
      <div className={styles.collection__child} key={id} ref={hoverRef}>
        <div
          className={styles.leftSide}
          onClick={() =>
            handleCollectionRoute(
              route ||
                `/collection/${collectionRoute}/${slug}${
                  isShared ? "?collectionId=" + id : ""
                }`,
            )
          }
        >
          <div className={styles.img}>
            <img
              className={styles.abs}
              src={image}
              alt="col_img"
              width={47}
              height={47}
            />
            {/* <div
              className={styles.abs}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div> */}
          </div>
          <p>{name}</p>
          {isShared && (
            <Tooltip
              content={`Shared by : ${
                sharedBy.displayName ||
                sharedBy.firstName ||
                sharedBy.lastName ||
                sharedBy.email ||
                ""
              }`}
              direction="top"
            >
              <FontAwesomeIcon
                icon={faHandHolding}
                className={styles.handIcon}
              />
            </Tooltip>
          )}
        </div>

        {showMoreMenu ? (
          changeItemWithinCollection ? (
            <div className={styles.checkBox}>
              <CustomCheckbox
                checked={isRecipeWithinCollection}
                handleChange={(e) => handleClickCheckBox(e, id)}
              />
            </div>
          ) : isHovered ? (
            name === "My Favorite" ? (
              <p style={{ marginRight: "10px" }}>{collectionItemLength}</p>
            ) : (
              <div
                className={styles.rightSide}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(index);
                }}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />

                <div
                  className={`${styles.menu} ${
                    menuIndex === index ? styles.showMenu : ""
                  }`}
                >
                  <div className={styles.iconBox}>
                    <Tooltip content="Edit" direction="top">
                      <FontAwesomeIcon
                        icon={faPencil}
                        className={styles.icon}
                        onClick={() =>
                          handleEditCollection(
                            id,
                            name,
                            slug,
                            description,
                            isShared,
                          )
                        }
                      />
                    </Tooltip>
                  </div>

                  {deleteCollectionLoading ? (
                    <div className={styles.iconBox}>
                      <CircularRotatingLoader
                        color="primary"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                  ) : (
                    <div className={styles.iconBox}>
                      <Tooltip content="Delete" direction="top">
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={styles.icon}
                          onClick={() => handleDeleteCollection(id, isShared)}
                        />
                      </Tooltip>
                    </div>
                  )}
                  {canContribute && (
                    <div className={styles.iconBox}>
                      <Tooltip content="Share" direction="top">
                        <FontAwesomeIcon
                          icon={faShareNodes}
                          className={styles.icon}
                          onClick={() =>
                            handleShareCollection(
                              id,
                              name,
                              image,
                              slug,
                              isShared,
                              sharedBy?.email || "",
                            )
                          }
                        />
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            )
          ) : (
            <p style={{ marginRight: "10px" }}>{collectionItemLength}</p>
          )
        ) : null}
      </div>
    </>
  );
};

export default SingleCollection;
