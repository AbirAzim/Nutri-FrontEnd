import React, { useEffect } from "react";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";
import { MdClose, MdMail } from "react-icons/md";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";

import CustomModal from "../../../theme/modal/customModal/CustomModal";
import styles from "../../../theme/shareRecipeModal/ShareRecipeModal.module.scss";

interface ShareProps {
  name: string;
  show: boolean;
  setShow: any;
  link: string;
  onShare: () => void;
}

const ShareModal: React.FC<ShareProps> = ({
  name,
  show,
  setShow,
  children,
  link,
  onShare,
}) => {
  useEffect(() => {
    if (!show) return;
    onShare();
  }, [onShare, show]);

  return (
    <CustomModal open={show} setOpen={setShow}>
      <div className={styles.shareRecipeModalContainer}>
        <div className={styles.header}>
          <button onClick={() => setShow(false)} className="hvr-pop">
            <MdClose className={styles.closeIcon} />
          </button>
          <h5>Share - {name}</h5>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.socialIconGroup}>
            <EmailShareButton
              url={link}
              subject="Blending101"
              body="lorem20"
              className="mr-20"
            >
              <a className={styles.instaIcon} href="#">
                <MdMail />
              </a>
            </EmailShareButton>

            <FacebookShareButton
              url={link}
              quote={"This is quote"}
              hashtag="#Branding"
              className="mr-20"
            >
              <a className={styles.fbIcon} href="#">
                <FaFacebookF />
              </a>
            </FacebookShareButton>

            <PinterestShareButton
              media="https://blending101.com/Blend_Formula.png"
              url="https://duacpw47bhqi1.cloudfront.net/recipe_details/621ccee8ede2edf391c431fe/"
              description="Hello World"
              className="mr-20"
            >
              <a className={styles.pinterestIcon} href="#">
                <FaPinterestP />
              </a>
            </PinterestShareButton>

            <TwitterShareButton
              url="https://duacpw47bhqi1.cloudfront.net/recipe_details/621ccee8ede2edf391c431fe/"
              title="Blending101"
              hashtags={["Branding"]}
              via="http://blending101.com/"
            >
              <a className={styles.twitterIcon} href="#">
                <FaTwitter />
              </a>
            </TwitterShareButton>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ShareModal;
