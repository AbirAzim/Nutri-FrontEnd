import React from "react";
import TrayWrapper from "../TrayWrapper";
import TrayTag from "../TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { faBell, faBellConcierge } from "@fortawesome/pro-light-svg-icons";
import { setIsNotificationTrayOpen } from "../../../redux/slices/notificationSlice";
import ShowNotificationData from "./ShowNotificationData";
import styles from "./NotificationTray.module.scss";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
interface CommentsTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

export default function NotificationTray({
  showPanle,
  showTagByDefaut,
}: CommentsTrayProps) {
  const dispatch = useAppDispatch();
  const { isNotificationTrayOpen } = useAppSelector(
    (state) => state.notification,
  );

  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={() => dispatch(setIsNotificationTrayOpen(false))}
      openTray={isNotificationTrayOpen}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faBell} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <ToggleMenu
        toggleMenuList={[
          <div key={"key0"} className={styles.menu}>
            <FontAwesomeIcon icon={faBell} className={styles.icon} />

            <p>Notifications</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />
      <ShowNotificationData />
    </TrayWrapper>
  );
}
