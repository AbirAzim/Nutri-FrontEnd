import React, { Dispatch, SetStateAction } from "react";
import CustomModal from "../../theme/modal/customModal/CustomModal";
import LastModifiedCollectionModalContent from "../../theme/lastModifiedColletionModalContent/LastModifiedCollectionModalContent";

interface Props {
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  shouldCloseOnOverlayClick?: boolean;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  lastModifiedCollectionName: string;
  openCollectionPanel: () => void;
}

const ShowLastModifiedCollection = ({
  open,
  setOpen,
  contentStyle,
  overlayStyle,
  shouldCloseOnOverlayClick,
  lastModifiedCollectionName,
  openCollectionPanel,
}: Props) => {
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      contentStyle={contentStyle}
      overlayStyle={overlayStyle}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <LastModifiedCollectionModalContent
        title={lastModifiedCollectionName}
        handleChange={openCollectionPanel}
      />
    </CustomModal>
  );
};

export default ShowLastModifiedCollection;
