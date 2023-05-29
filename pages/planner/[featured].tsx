import { useRouter } from "next/router";
import React, { useState } from "react";
import Icon from "../../component/atoms/Icon/Icon.component";
import AContainer from "../../containers/A.container";
import styles from "../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../styles/pages/viewAll.module.scss";
import IconWarper from "../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FEATURED_DICTIONARY } from "../../data/Misc";
import { useFeaturedPlan } from "../../hooks/modules/Plan/usePlanDiscovery";
import PlanCard from "../../component/module/Planner/PlanCard.component";
import ShowLastModifiedCollection from "../../components/showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenPlanCollectionTray } from "../../redux/slices/Planner.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Loader from "../../theme/loader/Loader";

const ViewAll = () => {
  const router = useRouter();
  const featured = router.query?.featured as string;
  const module = featured && FEATURED_DICTIONARY[featured];
  const [page, setPage] = useState(1);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const { data, loading, observer } = useFeaturedPlan({
    param: featured,
    page,
    setPage,
  });

  const dispatch = useAppDispatch();
  const { lastModifiedPlanCollection } = useAppSelector(
    (state) => state?.planner,
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <AContainer
      showCollectionTray={{ show: true, showTagByDeafult: true }}
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
      showCommentsTrayForPlan={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.main__div}>
        <div className="flex jc-between mt-30">
          <div className="flex ai-center">
            <Icon
              className={classes.head__icon}
              fontName={module?.icon}
              size="3rem"
              color="#fe5d1f"
            />
            <h2 className={classes.head__title}>{module?.title}</h2>
          </div>
          <IconWarper
            handleClick={() => router.push("/planner")}
            iconColor="iconColorWhite"
            defaultBg="secondary"
            hover="bgSecondary"
            style={{ width: "28px", height: "28px" }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconWarper>
        </div>
        <div className="row mt-40 mb-20">
          {data?.map((item) => (
            <div key={item?._id} className="col-3" ref={observer}>
              <PlanCard
                planId={item?._id}
                title={item.planName}
                image={item?.image?.url}
                isCollectionIds={item?.planCollections}
                noOfComments={item?.commentsCount}
                setOpenCollectionModal={setOpenCollectionModal}
              />
            </div>
          ))}
        </div>
        <ShowLastModifiedCollection
          open={openCollectionModal}
          setOpen={setOpenCollectionModal}
          shouldCloseOnOverlayClick={true}
          lastModifiedCollectionName={lastModifiedPlanCollection?.name}
          openCollectionPanel={() => {
            dispatch(setIsOpenPlanCollectionTray(true));
            setOpenCollectionModal(false);
          }}
        />
      </div>
    </AContainer>
  );
};

export default ViewAll;
