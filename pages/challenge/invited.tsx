import { useMutation, useQuery } from "@apollo/client";
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
import Loader from "../../component/atoms/Loader/loader.component";
import {
  ACCEPT_CHALLENGE,
  GET_INVITE_CHALLENGE_DETAILS,
} from "../../graphql/Challenge";
import { useAppSelector } from "../../redux/hooks";

import styles from "../../styles/pages/challenge.module.scss";
import HeadTagInfo from "../../theme/headTagInfo";

const Invited = () => {
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, loading } = useQuery(GET_INVITE_CHALLENGE_DETAILS, {
    variables: {
      id: router.query?.id,
    },
  });
  const [acceptChallenge] = useMutation(ACCEPT_CHALLENGE);

  const onJoinChallenge = () => {
    acceptChallenge({
      variables: {
        user: memberId,
        token: router.query?.id,
      },
    }).then((response) => {
      router.push(`/challenge/?id=${response?.data?.acceptChallenge}`);
    });
  };

  // useEffect(() => {
  //   dispatch(
  //     updateHeadTagInfo({
  //       title: "Challenge invite",
  //       description: "challenge invite",
  //     }),
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (loading) return <Loader />;

  return (
    <Fragment>
      <HeadTagInfo
        {...{
          title: "Challenge invite",
          description: "challenge invite",
        }}
      />
      <header className={styles.invited__header}>
        <img src="/logo.png" alt="" />
      </header>
      <main className={styles.invited__main}>
        <div className="row">
          <div className="col-9">
            <h1>
              {data?.getInviteChallengeInfo?.invite?.invitedBy?.displayName} has
              invited you to join a Poily Challenge!
            </h1>
            <p>
              Join the{" "}
              <span>
                &quot;
                {
                  data?.getInviteChallengeInfo?.invite?.challengeId
                    ?.challengeName
                }
                &quot;
              </span>
              . Track and visualize your daily blending habit with ease.
            </p>
            <button onClick={onJoinChallenge}>Join Challenge</button>
            <div className="row mt-60">
              <div className="col-4"></div>
              <div className="col-8 flex jc-center">
                <div className={styles.invited__info}>
                  <div>
                    <h2>
                      Challenge <span>Superpowers</span>
                    </h2>
                    <ul>
                      <li>Log blend ingredients by typing or speaking</li>
                      <li>Generate pantry aware grocery list</li>
                      <li>Share your challenge progress on social media</li>
                      <li>
                        Quickly add recipes from your plan or recipe discovery
                      </li>
                      <li>
                        See how you rank with other Challenge participants
                      </li>
                      <li>Track your medicinal performance over time</li>
                      <li>
                        Get analytics on what you consume i.e. ingredients,
                        processed foods, macros, nutrients, etc.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3" style={{ position: "relative" }}>
            <img
              src="/images/top-ingredients.png"
              alt=""
              className={styles.invited__main_ing}
            />
            <img
              src="/images/scnd_phone.png"
              alt=""
              className={styles.invited__main_mockup}
            />
            <img
              src="/images/leaderboard.svg"
              alt=""
              className={styles.invited__main_leader}
            />
          </div>
        </div>
      </main>
      <footer className={styles.invited__footer}>
        <div className={styles.invited__footer_bg}></div>
        <div className={styles.invited__footer_social}>
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

export default Invited;
