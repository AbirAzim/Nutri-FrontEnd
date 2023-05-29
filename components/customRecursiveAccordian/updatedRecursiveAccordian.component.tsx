import React from "react";
import { useAppSelector } from "../../redux/hooks";
import UpdatedCustomAccordion from "../../theme/accordion/updatedAccordion.component copy";
import styles from "./updatedRecursiveAccordian.module.scss";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import GET_DAILY_GOALS from "../../gqlLib/dri/query/getDailyGoals";
import DropDown, {
  DropDownType,
} from "../../theme/dropDown/DropDown.component";
import useWindowSize from "../utility/useWindowSize";

interface recursiveAccordianInterface {
  variant?: string;
  dataObject: object;
  counter?: number;
  showUser?: boolean;
  servingSize?: number;
  sinngleIngQuintity?: number;
  measurementDropDownState?: DropDownType & { showDropDown: boolean };
}

const UpdatedRecursiveAccordian = ({
  variant = "main",
  dataObject = {},
  counter = 1,
  showUser = true,
  servingSize = 1,
  sinngleIngQuintity = 1,
  measurementDropDownState = {
    listElem: [],
    style: {},
    value: "",
    name: "",
    handleChange: () => {},
    showDropDown: false,
  },
}: recursiveAccordianInterface) => {
  const { height } = useWindowSize();
  const { showDropDown, ...rest } = measurementDropDownState;
  const { user, dbUser } = useAppSelector((state) => state?.user);
  const router = useRouter();
  const { data: dailyData } = useQuery(GET_DAILY_GOALS, {
    fetchPolicy: "network-only",
    variables: { memberId: dbUser?._id },
  });

  const goals = dailyData?.getDailyGoals?.goals;
  return (
    <>
      {showDropDown && (
        <div className={styles.unitDropDownBox}>
          <p className={styles.title}>Portion</p>
          <DropDown {...rest} />
        </div>
      )}
      <div className={styles.nutritionHeader}>
        <div className={styles.recursiveAccordianHeading__heading}>
          <div className={styles.recursiveAccordianHeading__heading__1}>
            Calories
          </div>
          <div className={styles.recursiveAccordianHeading__heading__2}>
            {
              //@ts-ignore
              dataObject?.Calories?.cals?.value &&
                Math?.round(
                  //@ts-ignore
                  (dataObject?.Calories?.cals?.value * counter) / servingSize,
                )
            }
          </div>
          {showUser ? (
            <div className={styles.recursiveAccordianHeading__heading__3}>
              {user ? (
                <div className={styles.userName}>
                  {dbUser?.image ? (
                    <Image
                      src={dbUser?.image}
                      alt="prfile.png"
                      objectFit="cover"
                      layout="fill"
                      onClick={() =>
                        router?.push("/user/?type=personalization&toggle=1")
                      }
                    />
                  ) : (
                    <FaRegUser
                      className={styles.userName__image}
                      onClick={() =>
                        router?.push("/user/?type=personalization&toggle=1")
                      }
                    />
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.recursiveAccordianHeading__subheading}>
        <div className={styles.recursiveAccordianHeading__subheading__3}>
          Value
        </div>
        <div className={styles.recursiveAccordianHeading__subheading__4}>
          Daily%
        </div>
      </div>
      <div
        className={`${styles.recursiveAccordianBody} y-scroll`}
        style={
          variant === "panel"
            ? { maxHeight: 680 }
            : { maxHeight: `${height - 350}px` }
        }
      >
        {Object?.entries(dataObject)?.map((elem) => {
          if (elem[0] !== "Calories") {
            return (
              <UpdatedCustomAccordion
                key={elem[0] + Date.now()}
                title={elem[0]}
                content={elem[1]}
                type={"mainHeading"}
                counter={counter}
                dailyGoalsData={goals}
                servingSize={servingSize}
                sinngleIngQuintity={sinngleIngQuintity}
              />
            );
          }
        })}
      </div>
    </>
  );
};
export default UpdatedRecursiveAccordian;
