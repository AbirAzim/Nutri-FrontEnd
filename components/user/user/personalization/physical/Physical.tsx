/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import EDIT_CONFIGRATION_BY_ID from "../../../../../gqlLib/user/mutations/editCofigrationById";
import EDIT_USER_BY_ID from "../../../../../gqlLib/user/mutations/editUserById";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  setDbUser,
  setIsNewUseImage,
} from "../../../../../redux/slices/userSlice";
import { setLoading } from "../../../../../redux/slices/utilitySlice";
import ButtonComponent from "../../../../../theme/button/button.component";
import Combobox from "../../../../../theme/dropDown/combobox/Combobox.component";
import InputComponent from "../../../../../theme/input/registerInput/RegisterInput";
import RadioButton from "../../../../../theme/radioButton/RadioButton.component";
import imageUploadS3 from "../../../../utility/imageUploadS3";
import notification from "../../../../utility/reactToastifyNotification";
import DailyIntake from "./dailyIntake/DailyIntake";
import styles from "./Physical.module.scss";
import SectionGenderAndActivity from "./sectionGenderAndActivity/SectionGender&Activity";

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
    icon: "/icons/activity-low.svg",
    label: "Low",
  },
  {
    icon: "/icons/activity-moderate.svg",
    label: "Moderate",
  },
  {
    icon: "/icons/activity-high.svg",
    label: "High",
  },
  {
    icon: "/icons/activity-extreme.svg",
    label: "Extreme",
  },
];

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

type PhysicalProps = {
  userProfile: any;
  updateUserProfile: Function;
  setUserData: Function;
  userData: any;
};

const Physical = ({
  userProfile,
  updateUserProfile,
  setUserData,
  userData,
}: PhysicalProps) => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const router = useRouter();
  const { toggle } = router.query;
  const dispatch = useAppDispatch();
  const [editConfigration] = useMutation(EDIT_CONFIGRATION_BY_ID);
  const [editUserById] = useMutation(EDIT_USER_BY_ID);
  const { configuration } = dbUser;
  const { isNewUseImage } = useAppSelector((state) => state?.user);
  const [measurementType, setMeasurementType] = useState("US");
  const [ageType, setAgeType] = useState("years");
  const [pregnant, setPregnant] = useState("Not Pregnant or Lactation");
  const isMounted = useRef(null);
  const [colorToggle, setColorToggle] = useState(false);
  const [profileActiveTab, setProfileActiveTab] = useState(0);

  console.log(userProfile);

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
    defaultValues: useMemo(
      () => ({
        centimeters: userProfile?.heightInCentimeters
          ? Number(userProfile?.heightInCentimeters)?.toFixed(2)
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
      }),
      [userProfile],
    ),
  });

  useEffect(() => {
    if (userProfile) {
      setValue(
        "centimeters",
        userProfile?.heightInCentimeters
          ? Number(userProfile?.heightInCentimeters)?.toFixed(2)
          : "",
      );
      setValue(
        "feets",
        userProfile?.heightInCentimeters
          ? Number(Math?.trunc(userProfile?.heightInCentimeters / 30.48))
          : "",
      );
      setValue(
        "inches",
        userProfile?.heightInCentimeters
          ? Number(
              ((userProfile?.heightInCentimeters % 30.48) / 2.54)?.toFixed(0),
            ) === 12
            ? ""
            : Number(
                ((userProfile?.heightInCentimeters % 30.48) / 2.54)?.toFixed(0),
              )
          : "",
      );
      setValue(
        "kilograms",
        userProfile?.weightInKilograms
          ? Number(userProfile?.weightInKilograms?.toFixed(2))
          : "",
      );
      setValue("months", handleYearsAndMonths(userProfile)?.months || "");
      setValue(
        "pounds",
        userProfile?.weightInKilograms
          ? Number((userProfile?.weightInKilograms * 2.205)?.toFixed(0))
          : "",
      );
      setValue("years", handleYearsAndMonths(userProfile)?.years || "");
    }
  }, [userProfile]);

  const watchValue = watch();

  useEffect(() => {
    if (userProfile?.age?.years) {
      setAgeType("years");
    }
    if (userProfile?.age?.months) {
      setAgeType("months");
    }

    if (userProfile?.pregnantOrLactating) {
      setPregnant(userProfile?.pregnantOrLactating);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!toggle) return;
    if (toggle) {
      setProfileActiveTab(Number(toggle));
    }
  }, [toggle]);

  useEffect(() => {
    if (!profileActiveTab) return;
    router?.push(`/user/?type=personalization&toggle=${profileActiveTab}`);
  }, [profileActiveTab]);

  const handlePregnantOrLactating = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e?.target;
    setPregnant(value);
    updateUserProfile("pregnantOrLactating", value);
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

  const submitData = async (data) => {
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

    dispatch(setLoading(true));

    try {
      if (isNewUseImage?.length) {
        const res = await imageUploadS3(isNewUseImage);
        const imageURL = res?.[0];

        await editUserById({
          variables: {
            data: {
              editId: dbUser._id,
              editableObject: { ...userData?.about, image: imageURL },
            },
          },
        });

        await editConfigration({
          variables: {
            data: {
              editId: configuration?._id,
              editableObject: {
                ...userData?.personalization,
                weightInKilograms: arrangWeight,
                heightInCentimeters: arrangHight,
                age: arrageAge,
                pregnantOrLactating:
                  userData?.personalization?.gender === "Female"
                    ? pregnant
                    : null,
              },
            },
          },
        });

        setUserData((pre) => {
          return {
            ...pre,
            about: {
              ...pre.about,
              image: imageURL,
            },
            personalization: {
              ...pre?.personalization,
              weightInKilograms: arrangWeight,
              heightInCentimeters: arrangHight,
              age: arrageAge,
              pregnantOrLactating:
                userData?.personalization?.gender === "Female"
                  ? pregnant
                  : null,
            },
          };
        });

        dispatch(
          setDbUser({
            ...dbUser,
            ...userData?.about,
            image: imageURL,
            configuration: {
              ...dbUser?.configuration,
              ...userData?.personalization,
              weightInKilograms: arrangWeight,
              heightInCentimeters: arrangHight,
              age: arrageAge,
              pregnantOrLactating:
                userData?.personalization?.gender === "Female"
                  ? pregnant
                  : null,
            },
          }),
        );
        dispatch(setLoading(false));
        dispatch(setIsNewUseImage(null));
        notification("info", "your profile updated successfully");
      } else {
        await editUserById({
          variables: {
            data: {
              editId: dbUser._id,
              editableObject: { ...userData?.about },
            },
          },
        });

        await editConfigration({
          variables: {
            data: {
              editId: configuration?._id,
              editableObject: {
                ...userData?.personalization,
                weightInKilograms: arrangWeight,
                heightInCentimeters: arrangHight,
                age: arrageAge,
                pregnantOrLactating:
                  userData?.personalization?.gender === "Female"
                    ? pregnant
                    : null,
              },
            },
          },
        });

        setUserData((pre) => {
          return {
            ...pre,
            personalization: {
              ...pre?.personalization,
              weightInKilograms: arrangWeight,
              heightInCentimeters: arrangHight,
              age: arrageAge,
              pregnantOrLactating:
                userData?.personalization?.gender === "Female"
                  ? pregnant
                  : null,
            },
          };
        });

        dispatch(
          setDbUser({
            ...dbUser,
            ...userData?.about,
            configuration: {
              ...dbUser?.configuration,
              ...userData?.personalization,
              weightInKilograms: arrangWeight,
              heightInCentimeters: arrangHight,
              age: arrageAge,
              pregnantOrLactating:
                userData?.personalization?.gender === "Female"
                  ? pregnant
                  : null,
            },
          }),
        );
        dispatch(setLoading(false));
        notification("info", "Updated successfully");
      }
    } catch (error) {
      dispatch(setLoading(false));
      notification("error", error?.message);
    }
  };

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    setColorToggle(false);
  }, [profileActiveTab]);

  return (
    <>
      <div className={styles.physicalContainer}>
        <div className={styles.profile_tab_wraper}>
          <div className={styles.profile_tab}>
            <p
              className={`${
                profileActiveTab === 0 ? styles.active_border : ""
              }`}
              onClick={() => {
                setProfileActiveTab(0);
                router?.push(`/user/?type=personalization&toggle=0`);
              }}
            >
              Profile
            </p>
            <p
              className={`${
                profileActiveTab === 1 ? styles.active_border : ""
              }`}
              onClick={() => {
                setProfileActiveTab(1);
                router?.push(`/user/?type=personalization&toggle=1`);
              }}
            >
              Daily Intake
            </p>
          </div>
        </div>
        {profileActiveTab === 0 ? (
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
                This information is used to customize daily recommended
                nutrition targets
              </p>
            </div>

            <div className={styles.contentContainer}>
              <div className={styles.contentContainer__elementDiv}>
                <div className={styles.contentContainer__elementDiv__heading}>
                  <p className={styles?.label}>Your Gender</p>
                </div>
                <div className={styles.contentContainer__elementDiv__objects}>
                  <SectionGenderAndActivity
                    body={gender}
                    fieldName="gender"
                    updateUserProfile={updateUserProfile}
                    userProfile={userProfile}
                  />
                </div>
                <div className={styles.contentContainer__elementDiv__heading}>
                  <p className={styles?.label}>Your age</p>
                </div>
                <div className={styles.contentContainer__elementDiv__objects}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    {ageType === "years" ? (
                      <InputComponent
                        width="25%"
                        style={{ marginRight: "1rem" }}
                        placeholder="Age in years"
                        type="number"
                        name="years"
                        min={1}
                        max={120}
                        handleChange={changeInputValue}
                        register={register}
                        required={{
                          required: "Please enter years",
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
                        width="25%"
                        style={{ marginRight: "1rem" }}
                        placeholder="Age in months"
                        type="number"
                        name="months"
                        max={1440}
                        min={1}
                        handleChange={changeInputValue}
                        register={register}
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

                    <div style={{ paddingTop: "14px", display: "flex" }}>
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
                  </div>
                </div>

                <div className={styles.contentContainer__elementDiv__heading}>
                  <p className={styles?.label}>Your weight ?</p>
                </div>
                <div className={styles.contentContainer__elementDiv__objects}>
                  {measurementType === "US" ? (
                    <InputComponent
                      width="25%"
                      placeholder={"Pounds"}
                      type="number"
                      name="pounds"
                      min={1}
                      max={400}
                      handleChange={changeInputValue}
                      register={register}
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
                      width="25%"
                      placeholder="Kilograms"
                      type="number"
                      name="kilograms"
                      min={1}
                      max={880}
                      handleChange={changeInputValue}
                      register={register}
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

                <div className={styles.contentContainer__elementDiv__heading}>
                  <p className={styles?.label}>Your Height</p>
                </div>
                <div
                  className={`${styles.contentContainer__elementDiv__objects}`}
                  style={{ display: "flex" }}
                >
                  {measurementType === "US" ? (
                    <>
                      <InputComponent
                        width="25%"
                        style={{ marginRight: "16px" }}
                        placeholder="feet"
                        type="number"
                        name="feets"
                        min={1}
                        max={8}
                        handleChange={changeInputValue}
                        register={register}
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
                        width="25%"
                        placeholder="Inches"
                        type="number"
                        name="inches"
                        min={0}
                        max={11}
                        handleChange={changeInputValue}
                        register={register}
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
                    </>
                  ) : null}

                  {measurementType === "Metric" ? (
                    <InputComponent
                      width="25%"
                      placeholder="Centimeters"
                      type="number"
                      min={1}
                      max={272}
                      handleChange={changeInputValue}
                      register={register}
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

                <div className={styles.contentContainer__elementDiv__heading}>
                  <p className={styles?.label}>Your Activity</p>
                </div>
                <div className={styles.contentContainer__elementDiv__objects}>
                  <SectionGenderAndActivity
                    body={activity}
                    fieldName="activity"
                    updateUserProfile={updateUserProfile}
                    userProfile={userProfile}
                  />
                </div>

                {userProfile?.gender === "Female" ? (
                  <>
                    <div
                      className={styles.contentContainer__elementDiv__heading}
                    >
                      <p className={styles?.label}>Pregnant or Lactating?</p>
                    </div>
                    <div
                      className={styles.contentContainer__elementDiv__objects}
                    >
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
                  </>
                ) : null}
              </div>
            </div>
            {/* @ts-ignore */}

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <ButtonComponent
                type="primary"
                value="Update Profile"
                style={{
                  borderRadius: "30px",
                  height: "48px",
                  width: "180px",
                }}
                onClick={handleSubmit(submitData)}
              />
            </div>
          </>
        ) : (
          <DailyIntake
            colorToggle={colorToggle}
            setColorToggle={setColorToggle}
            toggle={toggle}
          />
        )}
      </div>
    </>
  );
};

export default Physical;
