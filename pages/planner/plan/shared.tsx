import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRightLong } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../../../component/atoms/Icon/Icon.component";
import { PLAN_SHARE_INFO } from "../../../graphql/Planner";
import styles from "../../../styles/pages/planner.module.scss";
import HeadTagInfo from "../../../theme/headTagInfo";
import Loader from "../../../component/atoms/Loader/loader.component";

const Shared = () => {
  const router = useRouter();
  const token = router.query.token;
  const { data, loading } = useQuery(PLAN_SHARE_INFO, {
    variables: {
      token: token,
    },
    skip: token === "",
  });
  const share = data?.getPlanShareInfo;

  const handleViewPlan = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/planner/plan/${share?.plan?._id}?token=${token}`,
    );
  };

  if (loading && !share?.invitedBy?.displayName) {
    <Loader />;
  }

  return (
    <Fragment>
      <HeadTagInfo
        {...{
          title: "Meal Plans share",
          description: "meal plans share",
        }}
      />
      <header className={styles.shared__header}>
        <img src="/logo.png" alt="" />
      </header>
      <main className={styles.shared__main}>
        <h1>
          {share?.invitedBy?.displayName} has shared a Poily meal plan with you!
        </h1>
        <p>
          Meal plans complete with recipes and ingredients ready to be added to
          your grocery list and shopped.
        </p>
        <div className="row">
          <div className="col-6">
            <button onClick={handleViewPlan}>View Plan</button>
            <div className={styles.shared__preview_header}>
              <h3>{share?.plan?.planName}</h3>
              <div>
                3 of {share?.recipeCount}
                <a>
                  more <Icon fontName={faArrowRightLong} size="2rem" />
                </a>
              </div>
            </div>
            <div className={styles.shared__preview_wrapper}>
              {share?.recipes?.map((recipe) => (
                <div className={styles.shared__preview} key={recipe?._id}>
                  <img
                    src={
                      recipe.image.find((img) => img.default)?.image ||
                      recipe.image[0].image ||
                      "/images/img1.png"
                    }
                    alt=""
                  />
                  <h6>{recipe?.name}</h6>
                  <div>
                    <span>
                      RX Score <i>905</i>
                    </span>
                    <span>
                      Calories <i>15</i>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-6">
            <div className={styles.shared__info}>
              <div>
                <h2>
                  Plan <span>Superpowers</span>
                </h2>
                <ul>
                  <li>
                    Discover plans based on culinary or medicinal preferences.
                  </li>
                  <li>Generate pantry aware grocery list</li>
                  <li>Share your with Poily users or on social media</li>
                  <li>Share your with Poily users or on social media</li>
                  <li>Plan from 5 to 30 days</li>
                  <li>View nutrition insights for you plans</li>
                  <li>See cost and time estimates for meals and plans</li>
                </ul>
              </div>
            </div>
            <img
              src="/images/iphone_mockup.png"
              alt=""
              className={styles.shared__main_mockup}
            />
          </div>
        </div>
      </main>
      <footer className={styles.shared__footer}>
        <div className={styles.shared__footer_social}>
          <Icon className="mr-20" fontName={faFacebook} size={24} />
          <Icon className="mr-20" fontName={faInstagram} size={24} />
          <Icon className="mr-20" fontName={faTwitter} size={24} />
          <Icon className="mr-20" fontName={faYoutube} size={24} />
          <Icon className="mr-20" fontName={faPinterest} size={24} />
          <Icon fontName={faTiktok} size={24} />
          <p>© 2022 Blending101 - 2022</p>
        </div>
        <img src="/images/footer-img.png" alt="" />
      </footer>
    </Fragment>
  );
};

export default Shared;
