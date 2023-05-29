import { useLazyQuery, useMutation } from "@apollo/client";
import { faRectangleHistory } from "@fortawesome/pro-regular-svg-icons";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import useToUpdateBlogField from "../../../customHooks/blog/useToUpdateBlogFirld";
import ADD_NEW_BLOG_COLLECTION from "../../../gqlLib/blog/mutation/addNewBlogCllection";
import ADD_OR_REMOVE_TO_BLOG_COLLECTION from "../../../gqlLib/blog/mutation/addOrRemoveToBlogCollection";
import DELETE_BLOG_COLLECTION from "../../../gqlLib/blog/mutation/deleteBlogCollection";
import EDIT_BLOG_COLLECTION from "../../../gqlLib/blog/mutation/editBlogCollection";
import GET_ALL_BLOG_COLLECTIONS from "../../../gqlLib/blog/query/getAllBlogCollections";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setIsActiveBlogForCollection,
  setIsOpenBlogCollectionTray,
} from "../../../redux/slices/blogSlice";
import ConfirmationModal from "../../../theme/confirmationModal/ConfirmationModal";
import SkeletonCollections from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollections";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import notification from "../../utility/reactToastifyNotification";
import AddCollectionModal from "../common/addCollectionModal/AddCollectionModal";
import IconForAddComment from "../common/iconForAddComment/IconForAddComment";
import SingleCollection from "../common/singleCollection/SingleCollection";
import TrayTag from "../TrayTag";
import TrayWrapper from "../TrayWrapper";
import styles from "./BlogCollectionTray.module.scss";

interface BlogCollectionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}
const PlanCollectionTray = ({
  showPanle,
  showTagByDefaut,
}: BlogCollectionTrayProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState({
    image: null,
    name: "",
    slug: "",
    description: "",
  });
  const [menuIndex, setMenuIndex] = useState(0);
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [isDeleteCollection, setIsDeleteCollection] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const [isCollectionUpdate, setIsCollectionUpdate] = useState(false);
  const { isOpenBlogCollectionTray, activeBlogForCollection } = useAppSelector(
    (state) => state?.blog,
  );
  const memberId = useAppSelector((state) => state?.user?.dbUser?._id || "");
  const isMounted = useRef(null);
  const [
    getAllBlogCollections,
    {
      data: allCollectionData,
      loading: allCollectionLoading,
      error: allCollectionError,
    },
  ] = useLazyQuery(GET_ALL_BLOG_COLLECTIONS, {
    fetchPolicy: "cache-and-network",
  });
  const [editBlogCollection, { loading: editBlogCollectionLoading }] =
    useMutation(EDIT_BLOG_COLLECTION);
  const [addNewBlogCollection, { loading: addNewBlogCollectionLoading }] =
    useMutation(ADD_NEW_BLOG_COLLECTION);
  const [deleteCollection, { loading: deleteCollectionLoading }] = useMutation(
    DELETE_BLOG_COLLECTION,
  );
  const [addOrRemoveBlogFromCollection] = useMutation(
    ADD_OR_REMOVE_TO_BLOG_COLLECTION,
  );
  const dispatch = useAppDispatch();
  const handleToUpdateBlog = useToUpdateBlogField();

  const handleAddOrRemoveBlogFormCollection = async () => {
    try {
      const { data } = await addOrRemoveBlogFromCollection({
        variables: {
          memberId,
          collectionIds: activeBlogForCollection.collectionIds,
          blogId: activeBlogForCollection.id,
        },
      });

      handleToUpdateBlog(activeBlogForCollection.id, {
        blogCollections: activeBlogForCollection.collectionIds,
      });

      dispatch(setIsActiveBlogForCollection({ id: "", collectionIds: [] }));
      notification("info", `Collection update successfully`);
      setIsCollectionUpdate(false);
    } catch (error) {
      notification("error", error?.message);
      setIsCollectionUpdate(false);
    }
  };

  // add or edit collection
  const handleAddOrEditCollection = async () => {
    try {
      if (input?.name) {
        if (isEditCollection) {
          await editBlogCollection({
            variables: {
              data: {
                memberId,
                editId: collectionId,
                editableObject: {
                  description: input.description,
                  slug: input.slug,
                  name: input.name,
                },
              },
            },
            update(cache, { data: { editABlogCollection } }) {
              cache.writeQuery({
                query: GET_ALL_BLOG_COLLECTIONS,
                variables: { memberId },
                data: {
                  getAllBlogCollections: {
                    blogCollections:
                      allCollectionData?.getAllBlogCollections?.blogCollections.map(
                        (collection) =>
                          collection?._id === editABlogCollection?._id
                            ? { ...collection, ...editABlogCollection }
                            : collection,
                      ),
                  },
                },
              });
            },
          });
          setOpenModal(false);
          setInput({ image: null, name: "", description: "", slug: "" });
          setOpenModal(false);
        } else {
          await addNewBlogCollection({
            variables: {
              data: {
                memberId,
                name: input.name,
                slug: input.slug,
                description: input.description,
              },
            },
            update(cache, { data: { addNewBlogCollection } }) {
              cache.writeQuery({
                query: GET_ALL_BLOG_COLLECTIONS,
                variables: { memberId },
                data: {
                  getAllBlogCollections: {
                    blogCollections: [
                      ...allCollectionData?.getAllBlogCollections
                        ?.blogCollections,
                      addNewBlogCollection,
                    ],
                  },
                },
              });
            },
          });
        }

        setOpenModal(false);
        setInput({ image: null, name: "", slug: "", description: "" });
        if (isEditCollection) {
          notification("info", "Collection edit successfully");
        } else {
          notification("info", "Collection add successfully");
        }
      } else {
        notification("info", "Please write collection name");
      }
    } catch (error) {
      notification("error", "An error occurred");
    }
  };
  // open collection modal
  const addNewCollection = () => {
    setIsDeleteCollection(false);
    setIsEditCollection(false);
    setInput((pre) => ({
      ...pre,
      name: "",
      slug: "",
      description: "",
      image: null,
    }));
    setOpenModal(true);
  };

  // delete collection
  const handleOpenConfirmationModal = (collectionId: string) => {
    setIsDeleteCollection(true);
    setCollectionId(collectionId);
    setOpenModal(true);
  };

  // handle delete collection
  const handleDeleteCollection = async () => {
    try {
      await deleteCollection({
        variables: {
          collectionId,
          memberId,
        },
        update(cache, { data: { deleteBlogCollection } }) {
          cache.writeQuery({
            query: GET_ALL_BLOG_COLLECTIONS,
            variables: { memberId },
            data: {
              getAllBlogCollections: {
                blogCollections: [...deleteBlogCollection?.blogCollections],
              },
            },
          });
        },
      });
      setOpenModal(false);
      notification("info", "Delete collection successfully");
    } catch (error) {
      setOpenModal(false);
      notification("error", error?.message);
    }
  };

  // edit a collection
  const handleEditCollection = (
    id: string,
    name: string,
    slug: string,
    description: string,
  ) => {
    setIsDeleteCollection(false);
    setInput((pre) => ({
      ...pre,
      name,
      slug,
      description,
    }));
    setIsEditCollection(true);
    setCollectionId(id);
    setOpenModal(true);
  };

  // handle change blog form collection
  const handleChange = async (e, collectionId) => {
    setIsCollectionUpdate(true);
    if (e?.target?.checked) {
      dispatch(
        setIsActiveBlogForCollection({
          ...activeBlogForCollection,
          collectionIds: [
            ...activeBlogForCollection.collectionIds,
            collectionId,
          ],
        }),
      );
    } else {
      dispatch(
        setIsActiveBlogForCollection({
          ...activeBlogForCollection,
          collectionIds: activeBlogForCollection.collectionIds.filter(
            (id) => id !== collectionId,
          ),
        }),
      );
    }
  };

  useEffect(() => {
    if (isOpenBlogCollectionTray) {
      getAllBlogCollections({ variables: { memberId } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenBlogCollectionTray]);

  useEffect(() => {
    if (isMounted.current) {
      if (!isOpenBlogCollectionTray) {
        if (isCollectionUpdate && activeBlogForCollection.id) {
          handleAddOrRemoveBlogFormCollection();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenBlogCollectionTray]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={() => {
        !isCollectionUpdate &&
          dispatch(setIsActiveBlogForCollection({ id: "", collectionIds: [] }));
        dispatch(setIsOpenBlogCollectionTray(!isOpenBlogCollectionTray));
      }}
      openTray={isOpenBlogCollectionTray}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faBookmark} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <ToggleMenu
        toggleMenuList={[
          <div key={"key0"} className={styles.menu}>
            <FontAwesomeIcon
              icon={faRectangleHistory}
              className={styles.icon}
            />
            <p>Collections</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />
      <IconForAddComment
        handleIconClick={addNewCollection}
        label="Add collection"
      />
      {allCollectionLoading ? (
        <SkeletonCollections />
      ) : (
        allCollectionData?.getAllBlogCollections?.blogCollections?.map(
          (collection, i) => {
            const {
              _id,
              name,
              slug,
              collectionDataCount,
              image,
              blogs,
              description,
            } = collection;

            return (
              <SingleCollection
                key={_id}
                id={_id}
                name={name}
                description={description}
                slug={slug}
                image={image || "/cards/food.png"}
                collectionItemLength={collectionDataCount}
                showMoreMenu={true}
                handleDeleteCollection={handleOpenConfirmationModal}
                handleEditCollection={handleEditCollection}
                index={i}
                menuIndex={menuIndex}
                setMenuIndex={setMenuIndex}
                changeItemWithinCollection={
                  activeBlogForCollection.id ? true : false
                }
                isRecipeWithinCollection={activeBlogForCollection.collectionIds?.includes(
                  _id,
                )}
                deleteCollectionLoading={deleteCollectionLoading}
                handleClickCheckBox={handleChange}
                collectionRoute="blogCollection"
              />
            );
          },
        )
      )}
      {isDeleteCollection && (
        <ConfirmationModal
          text="All the related entities will be removed along with this collection !!!"
          cancleFunc={() => setOpenModal(false)}
          submitFunc={handleDeleteCollection}
          loading={deleteCollectionLoading}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      {!isDeleteCollection && (
        <AddCollectionModal
          input={input}
          setInput={setInput}
          setOpenModal={setOpenModal}
          handleToAddOrUpdateCollection={handleAddOrEditCollection}
          isAddOrUpdateCollectionLoading={
            addNewBlogCollectionLoading || editBlogCollectionLoading
          }
          openModal={openModal}
        />
      )}
    </TrayWrapper>
  );
};

export default PlanCollectionTray;
