import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { useMutation } from "@apollo/client";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import ADD_OR_REMOVE_RECIPE_FORM_COLLECTION from "../../../../gqlLib/collection/mutation/addOrRemoveRecipeFromCollection";
import SkeletonCollections from "../../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollections";
import SingleCollection from "../../common/singleCollection/SingleCollection";
import CREATE_SHARE_COLLECTION_LINK from "../../../../gqlLib/collection/mutation/createShareCollectionLink";
import notification from "../../../../components/utility/reactToastifyNotification";
import Share, {
  SharedUserInfoType,
} from "../../../../component/organisms/Share/Distribute.component";

interface CollectionComponentProps {
  collections: {}[];
  collectionsLoading: boolean;
  handleDeleteCollection?: (id: string, isSharedCollection?: boolean) => void;
  handleEditCollection?: (
    id: string,
    name: string,
    slug: string,
    description: string,
    isSharedCollection?: boolean,
  ) => void;
}

export default function CollectionComponent({
  collections,
  collectionsLoading,
  handleDeleteCollection = () => {},
  handleEditCollection = () => {},
}: CollectionComponentProps) {
  const [addOrRemoveRecipeFromCollection] = useMutation(
    ADD_OR_REMOVE_RECIPE_FORM_COLLECTION,
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const {
    changeRecipeWithinCollection,
    activeRecipeId,
    singleRecipeWithinCollections,
  } = useAppSelector((state) => state?.collections);
  const [emails, setEmails] = useState<SharedUserInfoType[]>([]);
  const [collectionInfo, setCollectionInfo] = useState<any>({});
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [collectionHasRecipe, setCollectionHasRecipe] = useState<string[]>([]);
  const { openCollectionsTary } = useAppSelector((state) => state?.sideTray);
  const [isCollectionUpdate, setIsCollectionUpdate] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [showMsgField, setShowMsgField] = useState(false);
  const [link, setLink] = useState("");

  const isMounted = useRef(null);
  const { referenceOfRecipeUpdateFunc } = useAppSelector(
    (state) => state?.recipe,
  );
  const { bulkRecipeIdsForAddedInCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const [shareCollection, { loading: shareCollectionLoading }] = useMutation(
    CREATE_SHARE_COLLECTION_LINK,
  );

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const handleOpenShareModal = (
    id: string,
    title: string,
    image: string,
    slug: string,
    isSharedCollection: boolean = false,
    sharedUserEmail: string = "",
  ) => {
    setCollectionInfo({
      id,
      title,
      image,
      slug,
      isSharedCollection,
      sharedUserEmail,
    });
    setShowInviteModal(true);
    setEmails([]);
  };

  const copyLinkHandler = async (isGlobalShare: boolean = true) => {
    if (!isGlobalShare && !emails.length) {
      notification("warning", "Please enter email");
      return;
    }
    try {
      const link = await generateShareLink(isGlobalShare);
      navigator.clipboard.writeText(link);
      notification("success", "Link has been copied in clipboard");
      setHasCopied(true);
    } catch (error) {
      notification("error", "Not able to share collection");
    }

    // setShow(false)//;
  };

  const generateShareLink = async (isGlobalShare: boolean = true) => {
    try {
      const { data } = await shareCollection({
        variables: {
          data: {
            shareTo: isGlobalShare
              ? []
              : emails.map((info) => ({
                  shareToEmail: info.email,
                  canContribute: info.canCollaborate,
                  canShareWithOthers: info.canCollaborate,
                })),
            sharedBy: userId,
            collectionId: collectionInfo?.id,
            isSharedCollection: collectionInfo?.isSharedCollection,
          },
        },
      });
      setShowInviteModal(false);
      const generatedLink = `${
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_HOSTING_DOMAIN
          : "http://localhost:3000"
      }/collection/recipeCollection/${collectionInfo?.slug}?${
        isGlobalShare
          ? "token=" + data.createShareCollectionLink
          : "collectionId=" + collectionInfo?.id
      }`;
      setLink(link);
      return generatedLink;
    } catch (error) {
      notification("error", "Not able to share collection");
      return error;
    }
  };

  const resetModal = () => {
    setEmails([]);
    setShowMsgField(false);
  };

  const handleAddOrRemoveRecipeFormCollection = async () => {
    try {
      await addOrRemoveRecipeFromCollection({
        variables: {
          data: {
            userId: dbUser?._id,
            addToTheseCollections: collectionHasRecipe,
            recipes: activeRecipeId
              ? [activeRecipeId]
              : bulkRecipeIdsForAddedInCollection,
            isCollectionData: activeRecipeId ? false : true,
          },
        },
      });

      referenceOfRecipeUpdateFunc(activeRecipeId, {
        userCollections: collectionHasRecipe?.length
          ? singleRecipeWithinCollections
          : [],
      });

      reactToastifyNotification("success", `Collection update successfully`);
      setIsCollectionUpdate(false);
    } catch (error) {
      reactToastifyNotification("error", error?.message);
      setIsCollectionUpdate(false);
    }
  };

  const handleChange = async (e, collectionId) => {
    setIsCollectionUpdate(true);
    if (e?.target?.checked) {
      setCollectionHasRecipe((pre) => [...pre, collectionId]);
    } else {
      setCollectionHasRecipe((pre) => [
        ...pre?.filter((id) => id !== collectionId),
      ]);
    }
  };

  useEffect(() => {
    setCollectionHasRecipe(singleRecipeWithinCollections);
  }, [singleRecipeWithinCollections]);

  useEffect(() => {
    if (isMounted.current) {
      if (!openCollectionsTary) {
        if (isCollectionUpdate) {
          handleAddOrRemoveRecipeFormCollection();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCollectionsTary]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div>
      {changeRecipeWithinCollection ? null : (
        <>
          {/* <SingleCollection
            name="All Recipes"
            slug="all-recipes"
            collectionRoute="recipeCollection"
          /> */}
          <SingleCollection
            name="My Recipes"
            slug="my-recipes"
            collectionRoute="recipeCollection"
          />
          <SingleCollection
            name="Shared With Me"
            collectionRoute="recipeCollection"
            route={`/collection/recipeCollection/shared_with_me`}
          />
        </>
      )}
      {collectionsLoading ? (
        <SkeletonCollections />
      ) : (
        collections?.map((collection: any, i: number) => {
          const {
            _id,
            image,
            name,
            slug,
            recipes,
            description,
            isShared,
            sharedBy,
            personalizedName,
            canContribute,
          } = collection;

          return !canContribute ? null : (
            <SingleCollection
              key={collection?._id}
              name={personalizedName || name}
              slug={slug}
              id={_id}
              description={description}
              image={image || "/cards/food.png"}
              isRecipeWithinCollection={collectionHasRecipe?.includes(_id)}
              index={i}
              collectionItemLength={recipes?.length}
              changeItemWithinCollection={changeRecipeWithinCollection}
              handleClickCheckBox={handleChange}
              showMoreMenu={true}
              menuIndex={menuIndex}
              setMenuIndex={setMenuIndex}
              handleDeleteCollection={handleDeleteCollection}
              handleEditCollection={handleEditCollection}
              collectionRoute="recipeCollection"
              handleShareCollection={handleOpenShareModal}
              isShared={isShared}
              sharedBy={sharedBy}
              canContribute={canContribute}
            />
          );
        })
      )}

      <Share
        image={collectionInfo?.image}
        setShow={setShowInviteModal}
        show={showInviteModal}
        title={collectionInfo?.title}
        copyLinkHandler={copyLinkHandler}
        createLinkLoading={shareCollectionLoading}
        emails={emails}
        generatedLink={link}
        generateShareLink={generateShareLink}
        hasCopied={hasCopied}
        heading={"Share Collection"}
        onCancel={resetModal}
        setEmails={setEmails}
        setShowMsgField={setShowMsgField}
        showMsgField={showMsgField}
        submitBtnText="Share"
        isAdditionInfoNeedForPersonalShare={true}
        sharedUserEmail={collectionInfo?.sharedUserEmail}
      />
      {/* 
      <Invite
        show={showInviteModal}
        setShow={setShowInviteModal}
        {...collectionInfo}
        emails={emails}
        setEmails={setEmails}
        handleCancel={resetModal}
        handleInvitation={handleInvitation}
        loading={shareCollectionLoading}
        submitBtnText="Share"
      /> */}
    </div>
  );
}
