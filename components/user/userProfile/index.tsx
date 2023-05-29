import React, { useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import ProgessBar from "./progessBar/ProgessBar";
import styles from "./UserProfile.module.scss";
import StepOne from "./steps/stepOne/StepOne";
import StepTwo from "./steps/stepTwo/StepTwo";
import ChangeSteps from "./changeSteps/ChangeSteps";
import StepThree from "./steps/stepThree/StepThree";
import StepFour from "./steps/stepFour/StepFour";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { useMutation } from "@apollo/client";
import EDIT_CONFIGRATION_BY_ID from "../../../gqlLib/user/mutations/editCofigrationById";
import { setDbUser } from "../../../redux/slices/userSlice";
import { setLoading } from "../../../redux/slices/utilitySlice";
import reactToastifyNotification from "../../../components/utility/reactToastifyNotification";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-regular-svg-icons";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<any>({
    gender: "",
    activity: "",
    age: {
      months: false,
      quantity: "",
      years: true,
    },
    weightInKilograms: "",
    heightInCentimeters: "",
    dieteryLifeStyle: "",
    allergies: [],
    preExistingMedicalConditions: [],
    meditcation: [],
    whyBlending: [],
    pregnantOrLactating: "",
  });
  const [steps, setSteps] = useState(1);
  const { dbUser, user, provider } = useAppSelector((state) => state?.user);
  const { configuration } = dbUser;
  const [editUserData] = useMutation(EDIT_CONFIGRATION_BY_ID);
  const dispatch = useAppDispatch();
  const history = useRouter();

  useEffect(() => {
    if (configuration) {
      const {
        activity,
        age,
        allergies,
        dieteryLifeStyle,
        gender,
        heightInCentimeters,
        weightInKilograms,
        meditcation,
        preExistingMedicalConditions,
        whyBlending,
        pregnantOrLactating,
      } = configuration;

      setUserProfile((pre) => ({
        ...pre,
        gender,
        activity,
        age,
        heightInCentimeters,
        weightInKilograms,
        dieteryLifeStyle,
        allergies: allergies || [],
        preExistingMedicalConditions: preExistingMedicalConditions || [],
        meditcation: meditcation || [],
        whyBlending: whyBlending || [],
        pregnantOrLactating,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkGoals = (value, fieldName) => {
    const goal = userProfile?.[fieldName]?.find((item) => item === value);
    if (goal) {
      return true;
    } else {
      return false;
    }
  };

  const updateUserProfile = (name: string, value: any) => {
    if (name === "preExistingMedicalConditions" || name === "meditcation") {
      if (value) {
        setUserProfile((pre) => ({
          ...pre,
          [name]: [...pre[name], value],
          // [name]: [...pre[name], { id: uniqueId(), label: value }],
        }));
      }
    } else if (name === "whyBlending" || name === "allergies") {
      if (checkGoals(value, name)) {
        setUserProfile((pre) => ({
          ...pre,
          [name]: [...pre[name].filter((item) => item !== value)],
        }));
      } else {
        setUserProfile((pre) => ({
          ...pre,
          [name]: [...pre[name], value],
        }));
      }
    } else {
      setUserProfile((pre) => ({ ...pre, [name]: value }));
    }
  };

  const removeInput = (name: string, value: any) => {
    if (name === "preExistingMedicalConditions" || name === "meditcation") {
      if (value) {
        setUserProfile((pre) => ({
          ...pre,
          [name]: [...pre[name].filter((item) => item !== value)],
        }));
      }
    }
  };

  const updateUserData = async () => {
    const arrangData = {
      ...userProfile,
    };

    if (steps === 4) {
      dispatch(setLoading(true));
      try {
        await editUserData({
          variables: {
            data: { editId: configuration?._id, editableObject: arrangData },
          },
        });

        dispatch(
          setDbUser({
            ...dbUser,
            configuration: { ...dbUser?.configuration, ...arrangData },
          }),
        );
        dispatch(setLoading(false));
        reactToastifyNotification(
          "info",
          "Congratulation! you updated profile successfully",
        );
        history.push("/recipe_discovery");
      } catch (error) {
        dispatch(setLoading(false));
        reactToastifyNotification("error", error?.message);
      }
    } else {
      dispatch(setLoading(true));
      try {
        await editUserData({
          variables: {
            data: { editId: configuration?._id, editableObject: arrangData },
          },
        });

        dispatch(
          setDbUser({
            ...dbUser,
            configuration: { ...dbUser?.configuration, ...arrangData },
          }),
        );
        dispatch(setLoading(false));
        reactToastifyNotification("info", "Updated successfully");
        setSteps((pre) => pre + 1);
      } catch (error) {
        dispatch(setLoading(false));
        reactToastifyNotification("error", error?.message);
      }
    }
  };

  const nextStep = async () => {
    if (steps >= 4) {
      if (steps === 4) {
        updateUserData();
      }
      return;
    } else {
      if (user) {
        updateUserData();
      }
    }
  };
  const prevStep = () => {
    if (steps <= 1) {
      return;
    } else {
      setSteps((pre) => pre - 1);
    }
  };

  const renderUI = () => {
    switch (steps) {
      case 1:
        return (
          <StepOne
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
            setUserProfile={setUserProfile}
            setSteps={setSteps}
          />
        );
      case 2:
        return (
          <StepTwo
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
            alredyExist={checkGoals}
          />
        );
      case 3:
        return (
          <StepThree
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
            removeInput={removeInput}
          />
        );
      case 4:
        return (
          <StepFour
            updateUserProfile={updateUserProfile}
            checkGoals={checkGoals}
          />
        );

      default:
        return (
          <StepOne
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
            setUserProfile={setUserProfile}
            setSteps={setSteps}
          />
        );
    }
  };

  return (
    <AContainer
      headerIcon={
        <FontAwesomeIcon icon={faUser} color="#7dbd3b" fontSize={20} />
      }
      headerTitle="User onboarding"
      showSidebar={false}
      headerFullWidth={true}
      headTagInfo={{
        title: `User onboarding`,
        description: `user onboarding `,
      }}
    >
      <div className={styles.userProfileContainer}>
        <ProgessBar steps={steps} />

        {renderUI()}

        {steps === 1 ? null : (
          <ChangeSteps nextStep={nextStep} prevStep={prevStep} steps={steps} />
        )}
      </div>
    </AContainer>
  );
};

export default UserProfile;
