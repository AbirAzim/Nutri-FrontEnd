import React, { useMemo, useState } from "react";
import { faLightbulbOn } from "@fortawesome/pro-light-svg-icons";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";

import styles from "./Statistics.module.scss";
import { useAppSelector } from "../../../redux/hooks";
import RxScore from "../../molecules/Charts/RxScore.component";
import TopIngredients from "../../molecules/Charts/TopIngredients.component";

const useStatistics = (statistics) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [rxScore, setRxScore] = useState([]);
  const [topIngredients, setTopIngredients] = useState([]);

  useMemo(() => {
    setLeaderboard(
      statistics?.sharedWith.map((user) => ({
        id: user?.memberId?._id,
        name: user?.memberId?.displayName,
        profile: user?.memberId?.image,
        score: Math.round(user?.blendScore),
      })) || [],
    );
    setTopIngredients(
      statistics?.topIngredients.slice(0, 5).map((ing) => ({
        icon:
          ing?.ingredientId?.featuredImage ||
          "https://freepngimg.com/thumb/mango/1-2-mango-png.png",
        label: ing?.ingredientId?.ingredientName,
        quantity: ing?.count,
      })) || [],
    );
  }, [statistics]);
  return { leaderboard, rxScore, topIngredients };
};

const Statistics = ({ statistics, height }) => {
  const { leaderboard, rxScore, topIngredients } = useStatistics(statistics);
  return (
    <div className={styles.statistics}>
      <IconHeading icon={faLightbulbOn} title={"Challenge Stats"} />
      <div className={styles.statistics__body} style={{ height }}>
        <Leaderboard
          leaderboard={leaderboard}
          myScore={statistics?.blendScore}
        />
        <RxScore />
        <TopIngredients ingredients={topIngredients} />
      </div>
    </div>
  );
};

export default Statistics;

const Leaderboard = ({ leaderboard, myScore }) => {
  const { _id: userId, image } = useAppSelector((state) => state.user?.dbUser);
  const meInLeaderboard = useMemo(() => {
    return leaderboard.some((leader) => leader.id === userId);
  }, [leaderboard, userId]);
  return (
    <div>
      <div className={styles.statistics__graph}>
        <h3>Leaderboard</h3>
        <ul className={styles.leaderboard}>
          {leaderboard?.map((leader) => {
            const myself = leader.id === userId;
            return (
              <li className={styles.leaderboard__item} key={leader.id}>
                <div className={styles.leaderboard__info}>
                  <span>
                    <img
                      src={leader.profile || "/images/user-profile.png"}
                      alt="User"
                    />
                    <h6 style={{ fontWeight: myself ? "500" : "normal" }}>
                      {myself ? "You" : leader.name}
                    </h6>
                  </span>
                  <span>{leader.score}%</span>
                </div>
                <div className={styles.leaderboard__progress}>
                  <div style={{ width: `${leader.score}%` }} />
                </div>
              </li>
            );
          })}
          {!meInLeaderboard && (
            <li className={styles.leaderboard__item}>
              <div className={styles.leaderboard__info}>
                <span>
                  <img src={image || "/images/user-profile.png"} alt="User" />
                  <h6 style={{ fontWeight: 500 }}>You</h6>
                </span>
                <span>{Math.ceil(myScore) || 0}%</span>
              </div>
              <div className={styles.leaderboard__progress}>
                <div style={{ width: `${myScore}%` }} />
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
