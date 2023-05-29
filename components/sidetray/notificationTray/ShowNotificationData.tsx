import React from "react";
import { useQuery } from "@apollo/client";
import GET_SHARE_NOTIFICATION from "../../../gqlLib/notification/query/getShareNotification";
import { useAppSelector } from "../../../redux/hooks";
import NotificationDetails from "./NotificationDetails";
import SkeletonComment from "../../../theme/skeletons/skeletonComment/SkeletonComment";
import styles from "./NotificationTray.module.scss";

const ShowNotificationData = () => {
  const userId = useAppSelector((state) => state?.user?.dbUser?._id);
  const { data, loading } = useQuery(GET_SHARE_NOTIFICATION, {
    variables: { userId },
    fetchPolicy: "cache-and-network",
  });
  if (loading) {
    return <SkeletonComment />;
  }
  const notification = data?.getShareNotification;
  return (
    <>
      {notification?.totalNotification ? (
        notification?.shareNotifications?.map(
          ({ _id, image, type, shareData, sharedBy }) => {
            return (
              <NotificationDetails
                key={_id}
                variables={{ userId, token: _id }}
                shareData={shareData}
                sharedBy={sharedBy}
                image={image}
                type={type}
              />
            );
          },
        )
      ) : (
        <div className={styles.noNotification}>
          <p className={styles.text}>{"No comments"}</p>
        </div>
      )}
    </>
  );
};

export default ShowNotificationData;
