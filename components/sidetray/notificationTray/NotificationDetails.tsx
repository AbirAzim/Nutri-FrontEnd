import styles from "./NotificationTray.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import CommentAndNoteButton from "../../../theme/button/commentAndNoteButton/CommentAndNoteButton";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../redux/hooks";
import { setIsNotificationTrayOpen } from "../../../redux/slices/notificationSlice";
import useToAcceptRecipeShare from "../../../customHooks/notification/useToAcceptRecipeShare";
import useToRejectRecipeShare from "../../../customHooks/notification/useToRejectRecipeShare";
import { slugify } from "../../../helperFunc/string/slugToTittle";
import useToAcceptCollectionShare from "../../../customHooks/collection/useToAcceptCollectionShare";
import useToRejectCollectionShare from "../../../customHooks/collection/useToRejectCollectionShare";

const NotificationDetails = ({
  shareData,
  sharedBy,
  variables,
  image,
  type,
}) => {
  const { entityId } = shareData;
  const { displayName, firstName, lastName } = sharedBy;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { functionAcceptRecipeShare, acceptRecipeShareLoading } =
    useToAcceptRecipeShare();
  const { functionAcceptCollectionShare, acceptCollectionShareLoading } =
    useToAcceptCollectionShare();
  const { functionRejectRecipeShare, rejectRecipeShareLoading } =
    useToRejectRecipeShare();
  const { functionRejectCollectionShare, rejectCollectionShareLoading } =
    useToRejectCollectionShare();

  // show recipe
  const showRecipe = (type, entityId, token) => {
    if (type === "Recipe") {
      router.push(
        `/recipe_details/${entityId?._id}/${token ? "?token=" + token : ""} `,
      );
    }
    if (type === "Collection") {
      router.push(
        `/collection/recipeCollection/${slugify(entityId?.name)}${
          "?collectionId=" + entityId?._id
        }`,
      );
    }
    dispatch(setIsNotificationTrayOpen(false));
  };
  return (
    <div className={styles.singleNotificationContainer}>
      <div className={styles.recipeName}>
        <div className={styles.leftSide}>
          {image ? (
            <Image
              src={image || ""}
              alt="recipe_img"
              width={45}
              height={45}
              objectFit="cover"
              loading="lazy"
              className={styles.image}
            />
          ) : (
            <div className={styles.image}>
              <FontAwesomeIcon icon={faUser} color="gray" size="2x" />
            </div>
          )}

          <div>
            <h3
              onClick={() => showRecipe(type, entityId, variables?.token)}
              className={`${styles.heading}`}
            >
              {entityId?.name}
            </h3>
            <p className={styles.sharedBy}>
              Shared by : {displayName || firstName || lastName}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.btnBox}>
        <CommentAndNoteButton
          type="submitBtn"
          submitBtnVarient="secondary"
          style={{ boxShadow: "5px 5px 15px #e5e6e4" }}
          text={
            acceptRecipeShareLoading || acceptCollectionShareLoading ? (
              <CircularRotatingLoader
                color="white"
                style={{ fontSize: "16px" }}
              />
            ) : (
              "Add to Collection"
            )
          }
          handleClick={() => {
            if (type === "Recipe") {
              functionAcceptRecipeShare(variables);
            }
            if (type === "Collection") {
              functionAcceptCollectionShare(variables);
            }
          }}
        />
        <CommentAndNoteButton
          type="cancleBtn"
          text={
            rejectRecipeShareLoading || rejectCollectionShareLoading ? (
              <CircularRotatingLoader
                color="primary"
                style={{ fontSize: "16px" }}
              />
            ) : (
              "Decline"
            )
          }
          handleClick={() => {
            if (type === "Recipe") {
              functionRejectRecipeShare(variables);
            }
            if (type === "Collection") {
              functionRejectCollectionShare(variables);
            }
          }}
        />
      </div>
    </div>
  );
};

export default NotificationDetails;
