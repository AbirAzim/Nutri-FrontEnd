/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from "react";
import styles from "./AddCollection.module.scss";
import CommentAndNoteButton from "../../../../theme/button/commentAndNoteButton/CommentAndNoteButton";
import InputComponent from "../../../../theme/input/input.component";
import slugStringGenerator from "../../../utility/slugStringGenerator";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import TextArea from "../../../../theme/textArea/TextArea";
import CustomModal from "../../../../theme/modal/customModal/CustomModal";

export interface InputValueType {
  name: string;
  slug: string;
  description: string;
  image?: string | null;
}

type AddCollectionModalProps = {
  input: InputValueType;
  setInput: Dispatch<SetStateAction<InputValueType>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  handleToAddOrUpdateCollection?: () => void;
  isAddOrUpdateCollectionLoading?: boolean;
  openModal: boolean;
};

const AddCollectionModal = ({
  input,
  setInput,
  setOpenModal = () => {},
  handleToAddOrUpdateCollection = () => {},
  isAddOrUpdateCollectionLoading = false,
  openModal = false,
}: AddCollectionModalProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e?.target;
    if (type === "file") {
      // @ts-ignore
      setInput((pre) => ({ ...pre, image: e?.target?.files[0] }));
    } else {
      if (name === "name") {
        const convertToSlug = slugStringGenerator(value);
        setInput((pre) => ({ ...pre, name: value, slug: convertToSlug }));
      } else {
        setInput((pre) => ({ ...pre, [name]: value }));
      }
    }
  };

  // const uploadImage = async () => {
  //   await createNewCollection({
  //     variables: {
  //       data: {
  //         UserEmail: dbUser?.email,
  //         collection: {
  //           image: "",
  //           name: input?.name,
  //           recipes: [],
  //         },
  //       },
  //     },
  //   });
  //   setLoadings(false);
  //   setOpenModal(false);
  //   setInput({ image: null, name: "" });
  //   notification("info", "Collection add successfully");
  // };

  // const submitData = async () => {
  //   setLoadings(true);
  //   try {
  //     if (input?.image) {
  //       if (input?.name) {
  //         uploadImage();
  //       } else {
  //         notification("info", "Please write collection name");
  //       }
  //     } else {
  //       handleToAddOrUpdateCollection();
  //     }
  //   } catch (error) {
  //     setLoadings(false);
  //     notification("error", error?.message);
  //   }
  // };

  return (
    <CustomModal open={openModal} setOpen={setOpenModal}>
      <div className={styles.addCollectionContainer}>
        {/* <div className={styles.fileUpload}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <img
          src={
            input?.image
              ? URL.createObjectURL(input?.image)
              : "/images/black-add.svg"
          }
          alt="addIcon"
          style={{
            objectFit: input?.image ? "cover" : "contain",
            width: input?.image ? "100px" : "36px",
            height: input?.image ? "100px" : "36px",
          }}
        />
      </div> */}
        <div className={styles.rightSide}>
          <InputComponent
            borderSecondary={true}
            placeholder="Collection Name"
            value={input?.name}
            name="name"
            onChange={handleChange}
          />
          <TextArea
            style={{ marginTop: "10px" }}
            borderSecondary={true}
            placeholder="Description"
            value={input?.description}
            name="description"
            onChange={handleChange}
          />

          <div className={styles.buttonGroup}>
            <CommentAndNoteButton
              type="submitBtn"
              style={{ marginRight: "30px" }}
              handleClick={handleToAddOrUpdateCollection}
              text={
                isAddOrUpdateCollectionLoading ? (
                  <CircularRotatingLoader color="white" />
                ) : (
                  "Submit"
                )
              }
            />
            <CommentAndNoteButton
              type="cancleBtn"
              handleClick={() => setOpenModal(false)}
              text="Cancel"
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddCollectionModal;
