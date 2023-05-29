import React, { FC } from "react";
import HeaderComponent from "../components/header/Header.component";
import SidebarComponent from "../components/sidebar/Sidebar.component";
import styles from "./container.module.scss";
import CollectionTray from "../components/sidetray/collection/RecipeCollectionAndThemeTray";
import NutritionTrayComponent from "../components/sidetray/wiki/nutrition/nutrition.component";
import HealthTrayComponent from "../components/sidetray/wiki/health/heath.component";
import IngredientTrayComponent from "../components/sidetray/wiki/ingredient/ingredient.component";
import FilterTray from "../components/sidetray/filter";
import CommentsTray from "../components/sidetray/commentsTray/RecipeCommentsTray";
import CartPanel from "../component/templates/Panel/CartPanel.component/Panel.component";
import VersionTray from "../components/sidetray/versionTray/VersionTray";
import WikiCommentsTray from "../components/sidetray/wikiCommentsTray";
import BlogCommentsTray from "../components/sidetray/blogCommentsTray";
import BlogCollectionTray from "../components/sidetray/blogCollectionTray";
import PlanCollectionTray from "../components/sidetray/planCollectionTray";
import FooterRecipeFilter from "../components/footer/footerRecipeFilter.component";
import HeadTagInfo, { HeadTagInfoType } from "../theme/headTagInfo";
import PlanCommentsTray from "../components/sidetray/planCommentsTray";
import NotificationTray from "../components/sidetray/notificationTray";

interface ShowTray {
  show: boolean;
  showTagByDeafult?: boolean;
  showPanle?: "left" | "right";
}

type AContainerProps = {
  showHeader?: boolean;
  showSidebar?: boolean;
  showCollectionTray?: ShowTray;
  showVersionTray?: ShowTray;
  showGroceryTray?: ShowTray;
  showCommentsTray?: ShowTray;
  showCommentsTrayForPlan?: ShowTray;
  showWikiCommentsTray?: ShowTray;
  showBlogCommentsTray?: ShowTray;
  showBlogCollectionTray?: ShowTray;
  showPlanCollectionTray?: ShowTray;
  showRecipeFilterTray?: ShowTray;
  showNotificationTray?: ShowTray;
  logo?: boolean;
  headerTitle?: string;
  headerIcon?: string | React.ReactNode;
  children: React.ReactNode;
  nutritionTray?: Boolean;
  healthTray?: Boolean;
  ingredientTray?: Boolean;
  headerFullWidth?: Boolean;
  headTagInfo?: HeadTagInfoType;
};

const AContainer: FC<AContainerProps> = (props) => {
  const {
    headerIcon = "",
    showHeader = true,
    showSidebar = true,
    showCollectionTray = {
      show: false,
      showTagByDeafult: true,
      showPanle: "left",
    },
    showVersionTray = {
      show: false,
      showTagByDeafult: true,
      showPanle: "right",
    },
    showGroceryTray = {
      show: false,
      showTagByDeafult: true,
      showPanle: "right",
    },
    showCommentsTray = {
      show: false,
      showTagByDeafult: true,
      showPanle: "right",
    },
    showCommentsTrayForPlan = {
      show: false,
      showTagByDeafult: false,
      showPanle: "right",
    },
    showWikiCommentsTray = {
      show: false,
      showTagByDeafult: false,
      showPanle: "right",
    },
    showBlogCommentsTray = {
      show: false,
      showTagByDeafult: false,
      showPanle: "right",
    },
    showBlogCollectionTray = {
      show: false,
      showTagByDeafult: false,
      showPanle: "left",
    },
    showPlanCollectionTray = {
      show: false,
      showTagByDeafult: false,
      showPanle: "left",
    },
    showRecipeFilterTray = {
      show: false,
      showPanle: "left",
      showTagByDeafult: false,
    },
    showNotificationTray = {
      show: true,
      showPanle: "right",
      showTagByDeafult: false,
    },
    logo = true,
    headerTitle = "",
    nutritionTray = false,
    healthTray = false,
    ingredientTray = false,
    headerFullWidth = false,
    headTagInfo = { description: "", title: "" },
  } = props;

  return (
    <div className={styles.containerA}>
      <HeadTagInfo {...headTagInfo} />
      {showSidebar ? (
        <div className={styles.sidebarA}>
          <SidebarComponent />
        </div>
      ) : null}
      <div
        className={styles.mainA}
        style={headerFullWidth ? { width: "100%" } : {}}
      >
        {showHeader ? (
          <HeaderComponent
            logo={logo}
            headerTitle={headerTitle}
            fullWidth={headerFullWidth}
            headerIcon={headerIcon}
          />
        ) : null}
        {showCollectionTray?.show ? (
          <div className={`${styles.fixed__main__left}`}>
            <CollectionTray
              showTagByDefaut={showCollectionTray?.showTagByDeafult}
              showPanle={showCollectionTray?.showPanle}
            />
          </div>
        ) : null}
        {showVersionTray?.show ? (
          <div className={`${styles.fixed__main__right}`}>
            <VersionTray
              showTagByDefaut={showVersionTray?.showTagByDeafult}
              showPanle={showVersionTray?.showPanle}
            />
          </div>
        ) : null}
        {showGroceryTray?.show ? (
          <div className={styles.fixed__main__right}>
            <CartPanel
              showTagByDefaut={showGroceryTray?.showTagByDeafult}
              showPanle={showGroceryTray?.showPanle}
            />
          </div>
        ) : null}
        {showCommentsTray?.show && (
          <div className={styles.fixed__main__right}>
            <CommentsTray
              showTagByDefaut={showCommentsTray?.showTagByDeafult}
              showPanle={showCommentsTray?.showPanle}
            />
          </div>
        )}
        {showCommentsTrayForPlan?.show && (
          <div className={styles.fixed__main__right}>
            <PlanCommentsTray
              showPanle={showCommentsTrayForPlan.showPanle}
              showTagByDefaut={showCommentsTrayForPlan.showTagByDeafult}
            />
          </div>
        )}
        {showWikiCommentsTray?.show && (
          <div className={styles.fixed__main__right}>
            <WikiCommentsTray
              showTagByDefaut={showWikiCommentsTray?.showTagByDeafult}
              showPanle={showWikiCommentsTray?.showPanle}
            />
          </div>
        )}
        {showBlogCommentsTray?.show && (
          <div className={styles.fixed__main__right}>
            <BlogCommentsTray
              showTagByDefaut={showBlogCommentsTray?.showTagByDeafult}
              showPanle={showBlogCommentsTray?.showPanle}
            />
          </div>
        )}
        {showNotificationTray?.show && (
          <div className={styles.fixed__main__right}>
            <NotificationTray
              showTagByDefaut={showBlogCommentsTray?.showTagByDeafult}
              showPanle={showBlogCommentsTray?.showPanle}
            />
          </div>
        )}
        {showBlogCollectionTray?.show && (
          <div className={styles.fixed__main__left}>
            <BlogCollectionTray
              showTagByDefaut={showBlogCollectionTray?.showTagByDeafult}
              showPanle={showBlogCollectionTray?.showPanle}
            />
          </div>
        )}
        {showPlanCollectionTray?.show && (
          <div className={styles.fixed__main__left}>
            <PlanCollectionTray
              showTagByDefaut={showPlanCollectionTray?.showTagByDeafult}
              showPanle={showPlanCollectionTray?.showPanle}
            />
          </div>
        )}
        {nutritionTray && (
          <div className={styles.fixed__main__left}>
            <NutritionTrayComponent title="Nutrition Lists" />
          </div>
        )}
        {healthTray && (
          <div className={styles.fixed__main__left}>
            <HealthTrayComponent title="Health Lists" />
          </div>
        )}
        {ingredientTray && (
          <div className={styles.fixed__main__left}>
            <IngredientTrayComponent title="Ingredient Lists" />
          </div>
        )}
        {showRecipeFilterTray && (
          // <Menu
          //   pageWrapId={"page-wrap"}
          //   outerContainerId={"outer-container"}
          //   isOpen={openFilterTray}
          //   customBurgerIcon={false}
          //   itemListElement="div"
          //   noOverlay
          // >

          // </Menu>
          <div className={styles.fixed__main__left}>
            <FilterTray
              showTagByDefaut={showRecipeFilterTray?.showTagByDeafult}
              showPanle={showRecipeFilterTray?.showPanle}
            />
          </div>
        )}
        {props.children}
        <FooterRecipeFilter />
      </div>
    </div>
  );
};

export default AContainer;
