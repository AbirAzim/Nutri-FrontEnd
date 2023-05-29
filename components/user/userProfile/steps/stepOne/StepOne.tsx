import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EDIT_CONFIGRATION_BY_ID from "../../../../../gqlLib/user/mutations/editCofigrationById";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { setDbUser } from "../../../../../redux/slices/userSlice";
import { setLoading } from "../../../../../redux/slices/utilitySlice";
import ButtonComponent from "../../../../../theme/button/button.component";
import Combobox from "../../../../../theme/dropDown/combobox/Combobox.component";
import InputComponent from "../../../../../theme/input/registerInput/RegisterInput";
import RadioButton from "../../../../../theme/radioButton/RadioButton.component";
import SectionWithIcon from "../../sectionWithIcon/SectionWithIcon";
import styles from "./StapOne.module.scss";
import reactToastifyNotification from "../../../../../components/utility/reactToastifyNotification";

const pregnantOrLactating = [
  { label: "Not Pregnant or Lactation", value: "Not Pregnant or Lactation" },
  { label: "Pregnant - 1st Trimester", value: "Pregnant - 1st Trimester" },
  {
    label: "Pregnant - 2nd Trimester (Less than 20 Weeks)",
    value: "Pregnant - 2nd Trimester (Less than 20 Weeks)",
  },
  {
    label: "Pregnant - 2nd Trimester (More than 20 Weeks)",
    value: "Pregnant - 2nd Trimester (More than 20 Weeks)",
  },
  { label: "Pregnant - 3nd Trimester", value: "Pregnant - 3nd Trimester" },
  { label: "0-6 months", value: "0-6 months" },
  { label: "Over 7 months", value: "Over 7 months" },
];

const gender = [
  {
    icon: "/images/mars-1.png",
    label: "Male",
  },
  {
    icon: "/images/femenine.png",
    label: "Female",
  },
  {
    icon: "/images/mars-2.png",
    label: "Others",
  },
];
const activity = [
  {
    icon: "/images/ski-lift-regular.png",
    label: "Low",
  },
  {
    icon: "/images/walking-regular-1.png",
    label: "Moderate",
  },
  {
    icon: "/images/running-regular.png",
    label: "High",
  },
  {
    icon: "/icons/activity-extreme.svg",
    label: "Extreme",
  },
];

type StepOneProps = {
  userProfile: any;
  updateUserProfile: Function;
  setUserProfile: Function;
  setSteps: Function;
};

const StepOne = ({
  userProfile,
  updateUserProfile,
  setUserProfile,
  setSteps,
}: StepOneProps) => {
  const [measurementType, setMeasurementType] = useState("US");
  const [ageType, setAgeType] = useState("years");
  const [pregnant, setPregnant] = useState("Not Pregnant or Lactation");
  const { dbUser, user, provider } = useAppSelector((state) => state?.user);
  const { configuration } = dbUser;
  const [editUserData] = useMutation(EDIT_CONFIGRATION_BY_ID);
  const dispatch = useAppDispatch();

  const handleYearsAndMonths = (userProfile) => {
    let value = {
      years: 0,
      months: 0,
    };
    if (userProfile?.age?.years) {
      value = {
        years: userProfile?.age?.quantity || 0,
        months: userProfile?.age?.quantity
          ? Number(userProfile?.age?.quantity) * 12
          : 0,
      };
    }

    if (userProfile?.age?.months) {
      value = {
        years: userProfile?.age?.quantity
          ? Number(Math?.trunc(userProfile?.age?.quantity / 12))
          : 0,
        months: userProfile?.age?.quantity || 0,
      };
    }
    return value;
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      centimeters: userProfile?.heightInCentimeters
        ? Number(userProfile?.heightInCentimeters).toFixed(2)
        : "",
      feets: userProfile?.heightInCentimeters
        ? Number(Math?.trunc(userProfile?.heightInCentimeters / 30.48))
        : "",
      inches: userProfile?.heightInCentimeters
        ? Number(
            ((userProfile?.heightInCentimeters % 30.48) / 2.54)?.toFixed(0),
          ) === 12
          ? ""
          : Number(
              ((userProfile?.heightInCentimeters % 30.48) / 2.54)?.toFixed(0),
            )
        : "",
      kilograms: userProfile?.weightInKilograms
        ? Number(userProfile?.weightInKilograms?.toFixed(2))
        : "",
      months: handleYearsAndMonths(userProfile)?.months || "",
      pounds: userProfile?.weightInKilograms
        ? Number((userProfile?.weightInKilograms * 2.205)?.toFixed(0))
        : "",
      years: handleYearsAndMonths(userProfile)?.years || "",
    },
  });
  const watchValue = watch();

  const changeInputValue = (e) => {
    const { name } = e?.target;

    if (name === "years") {
      if (watchValue?.months) {
        setValue("months", "");
      }
    }
    if (name === "months") {
      if (watchValue?.years) {
        setValue("years", "");
      }
    }
    if (name === "pounds") {
      if (watchValue?.kilograms) {
        setValue("kilograms", "");
      }
    }
    if (name === "kilograms") {
      if (watchValue?.pounds) {
        setValue("pounds", "");
      }
    }
    if (name === "centimeters") {
      if (watchValue?.feets || watchValue?.inches) {
        setValue("feets", "");
        setValue("inches", "");
      }
    }
    if (name === "feets" || name === "inches") {
      if (watchValue?.centimeters) {
        setValue("centimeters", "");
      }
    }
  };

  const handleAgeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e?.target;
    if (value === "years") {
      setAgeType("years");
    }
    if (value === "months") {
      setAgeType("months");
    }
  };

  const handlePregnantOrLactating = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e?.target;
    setPregnant(value);
    updateUserProfile("pregnantOrLactating", value);
  };

  const onSubmit = async (data) => {
    let arrageAge = {
      quantity:
        ageType === "years" ? Number(data?.years) : Number(data?.months),
      months: ageType === "months" ? true : false,
      years: ageType === "years" ? true : false,
    };

    let arrangWeight =
      measurementType === "US"
        ? Number(data?.pounds / 2.205)
        : Number(data?.kilograms);

    let feet = +data?.feets * 30.48;
    let inches = +data?.inches ? +data?.inches * 2.54 : 0;
    let arrangHight =
      measurementType === "US"
        ? Number(feet + inches)
        : Number(data?.centimeters);

    const arrangData = {
      ...userProfile,
      age: arrageAge,
      weightInKilograms: arrangWeight,
      heightInCentimeters: arrangHight,
      pregnantOrLactating: userProfile?.gender === "Female" ? pregnant : null,
    };

    dispatch(setLoading(true));
    try {
      await editUserData({
        variables: {
          data: { editId: configuration?._id, editableObject: arrangData },
        },
      });
      setUserProfile((pre) => ({
        ...pre,
        ...arrangData,
      }));
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
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.radioButton_wraper}>
          <RadioButton
            value="US"
            handleChange={(e) => setMeasurementType(e?.target?.value)}
            checked={measurementType === "US"}
            label="US"
            name="measurementType"
          />
          <RadioButton
            value="Metric"
            handleChange={(e) => setMeasurementType(e?.target?.value)}
            checked={measurementType === "Metric"}
            label="Metric"
            name="measurementType"
          />
        </div>
        <p className={styles.infoText}>
          This information is used to customize daily recommended nutrition
          targets
        </p>
      </div>
      <div className={styles.stepOneContainer}>
        <SectionWithIcon
          title="Select Your Gender"
          body={gender}
          fieldName="gender"
          updateUserProfile={updateUserProfile}
          userProfile={userProfile}
        />
        <div className={styles.singleSection}>
          <h2>Your age?</h2>
          <div className={styles.contentContainer}>
            <div style={{ paddingBottom: "1rem", display: "flex" }}>
              <RadioButton
                value="years"
                handleChange={handleAgeType}
                checked={ageType === "years"}
                label="Years"
                name="ageInYearsOrMonths"
              />
              <RadioButton
                value="months"
                handleChange={handleAgeType}
                checked={ageType === "months"}
                label="Months"
                name="ageInYearsOrMonths"
              />
            </div>
            {ageType === "years" ? (
              <InputComponent
                placeholder="Age in years"
                type="number"
                name="years"
                min={1}
                max={120}
                register={register}
                handleChange={changeInputValue}
                required={{
                  required: "Please enter age in years",
                  min: {
                    value: 1,
                    message: "Please enter valid years",
                  },
                  max: {
                    value: 120,
                    message: "Max 120 years",
                  },
                }}
                error={{
                  isError: errors?.years ? true : false,
                  message: errors?.years?.message,
                }}
              />
            ) : null}
            {ageType === "months" ? (
              <InputComponent
                width="25%%"
                placeholder="Age in months"
                type="number"
                name="months"
                max={1440}
                min={1}
                register={register}
                handleChange={changeInputValue}
                required={{
                  required: "Please enter age in months",
                  min: {
                    value: 1,
                    message: "Please enter valid months",
                  },
                  max: {
                    value: 1440,
                    message: "Max 1440 months",
                  },
                }}
                error={{
                  isError: errors?.months ? true : false,
                  message: errors?.months?.message,
                }}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.singleSection}>
          <h2>Your weight?</h2>
          <div className={styles.contentContainer}>
            {measurementType === "US" ? (
              <InputComponent
                placeholder={"Pounds"}
                type="number"
                name="pounds"
                min={1}
                max={400}
                register={register}
                handleChange={changeInputValue}
                required={{
                  required: "Please enter weight in pounds",
                  min: {
                    value: 1,
                    message: "Please valid weight",
                  },
                  max: {
                    value: 400,
                    message: "Max 400 pounds",
                  },
                }}
                error={{
                  isError: errors?.pounds ? true : false,
                  message: errors?.pounds?.message,
                }}
              />
            ) : null}

            {measurementType === "Metric" ? (
              <InputComponent
                placeholder="Kilograms"
                type="number"
                name="kilograms"
                min={1}
                max={880}
                register={register}
                handleChange={changeInputValue}
                required={{
                  required: "Please enter weight in kilograms",
                  min: {
                    value: 1,
                    message: "Please valid weight",
                  },
                  max: {
                    value: 880,
                    message: "Max 880 kilograms",
                  },
                }}
                error={{
                  isError: errors?.kilograms ? true : false,
                  message: errors?.kilograms?.message,
                }}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.singleSection}>
          <h2>Your hight?</h2>
          <div className={styles.contentContainer}>
            {measurementType === "US" ? (
              <div style={{ display: "flex" }}>
                <InputComponent
                  width="50%"
                  style={{ marginRight: "16px" }}
                  placeholder="feet"
                  type="number"
                  name="feets"
                  min={1}
                  max={8}
                  register={register}
                  handleChange={changeInputValue}
                  required={{
                    required: "Please enter height in feets",
                    min: {
                      value: 1,
                      message: "Please enter valid height",
                    },
                    max: {
                      value: 8,
                      message: "Max 8 feets",
                    },
                  }}
                  error={{
                    isError: errors?.feets ? true : false,
                    message: errors?.feets?.message,
                  }}
                />
                <InputComponent
                  width="50%"
                  placeholder="Inches"
                  type="number"
                  name="inches"
                  min={0}
                  max={11}
                  register={register}
                  handleChange={changeInputValue}
                  required={{
                    min: {
                      value: 0,
                      message: "Please enter valid inches",
                    },
                    max: {
                      value: 11,
                      message: "Max 11 inches",
                    },
                  }}
                  error={{
                    isError: errors?.inches ? true : false,
                    message: errors?.inches?.message,
                  }}
                />
              </div>
            ) : null}

            {measurementType === "Metric" ? (
              <InputComponent
                placeholder="Centimeters"
                type="number"
                min={1}
                max={272}
                register={register}
                handleChange={changeInputValue}
                name="centimeters"
                required={{
                  required: "Please enter height in centimeters",
                  min: {
                    value: 1,
                    message: "Please enter valid centimeters",
                  },
                  max: {
                    value: 272,
                    message: "Max 272 centimeters",
                  },
                }}
                error={{
                  isError: errors?.centimeters ? true : false,
                  message: errors?.centimeters?.message,
                }}
              />
            ) : null}
          </div>
        </div>
        {userProfile?.gender === "Female" ? (
          <div className={styles.singleSection}>
            <h2>Pregnant or Lactating?</h2>
            <div className={styles.contentContainer}>
              <Combobox
                options={pregnantOrLactating}
                placeholder="Select"
                style={{ width: "100%" }}
                value={pregnant}
                handleChange={handlePregnantOrLactating}
                disabled={
                  //@ts-ignore
                  parseFloat(watchValue?.years) >= 14 ||
                  //@ts-ignore
                  parseFloat(watchValue?.months) >= 168
                    ? false
                    : true
                }
              />
            </div>
          </div>
        ) : null}

        <SectionWithIcon
          title="Your Activity"
          body={activity}
          fieldName="activity"
          updateUserProfile={updateUserProfile}
          userProfile={userProfile}
        />
      </div>
      <div className={styles.buttonContainer}>
        <ButtonComponent
          type="primary"
          value="Next"
          onClick={handleSubmit(onSubmit)}
          style={{
            borderRadius: "40px",
            height: "62px",
            width: "135px",
          }}
        />
      </div>
    </>
  );
};

export default StepOne;
