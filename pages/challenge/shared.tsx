import { useQuery } from "@apollo/client";
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import Icon from "../../component/atoms/Icon/Icon.component";
import { GET_SHARED_CHALLENGE_DETAILS } from "../../graphql/Challenge";
import styles from "../../styles/pages/challenge.module.scss";
import HeadTagInfo from "../../theme/headTagInfo";
import { useAppSelector } from "../../redux/hooks";

const Shared = () => {
  const router = useRouter();
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { data } = useQuery(GET_SHARED_CHALLENGE_DETAILS, {
    variables: {
      challengeId: router.query?.id,
      memberId,
      token: router.query?.token,
    },
  });

  const onViewChallenge = (e) => {
    router.push(
      `/challenge?id=${router.query?.id}&token=${router.query?.token}`,
    );
  };

  // if (!router.query?.id || !router.query?.token) return <></>;
  return (
    <Fragment>
      <HeadTagInfo
        {...{
          title: "Challenge share",
          description: "challenge share",
        }}
      />
      <header className={styles.shared__header}>
        <img src="/logo.png" alt="" />
      </header>
      <main className={styles.shared__main}>
        <div className="row">
          <div className="col-8">
            <h1>
              {data?.getChallengeInfoById?.memberInfo?.displayName} has shared a
              Poily Challenge with you!
            </h1>
            <p>
              Follow along has Gabriel&apos;s daily blending builds a habitual
              practice of blending.
            </p>
            <button onClick={onViewChallenge}>Join Challenge</button>
            <div style={{ textAlign: "center" }}>
              <h3>{data?.getChallengeInfoById?.challengeName}</h3>
              <div className={styles.shared__preview}>
                <img
                  src={`https://blending.s3.us-east-1.amazonaws.com/images/single/${router.query?.id}.jpg`}
                  alt="Challenge Preview"
                />
              </div>
            </div>
          </div>
          <div className="col-4">
            <img
              src="/images/scnd_phone.png"
              alt=""
              className={styles.shared__main_mockup}
            />
          </div>
        </div>
      </main>
      <footer className={styles.shared__footer}>
        <div className={styles.shared__footer_bg}></div>
        <div className={styles.shared__footer_social}>
          <Icon className="mr-20" fontName={faFacebook} size={24} />
          <Icon className="mr-20" fontName={faInstagram} size={24} />
          <Icon className="mr-20" fontName={faTwitter} size={24} />
          <Icon className="mr-20" fontName={faYoutube} size={24} />
          <Icon className="mr-20" fontName={faPinterest} size={24} />
          <Icon fontName={faTiktok} size={24} />
          <p>{`© ${new Date().getFullYear()} Blending101 - ${new Date().getFullYear()}`}</p>
        </div>
        <img src="/images/footer-img.png" alt="" />
      </footer>
    </Fragment>
  );
};

export default Shared;
