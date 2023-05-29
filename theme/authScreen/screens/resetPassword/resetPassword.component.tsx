import React, { useState } from "react";
import styles from "./resetPassword.module.scss";
import Image from "next/image";
import HighlightOffOutlinedIcon from "../../../../public/icons/highlight_off_black_36dp.svg";
import Link from "next/link";
import InputField from "../../../input/registerInput/RegisterInput";
import ButtonComponent from "../../../button/buttonA/button.component";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Auth } from "aws-amplify";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const history = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ oldPassword, newPassword }) => {
    dispatch(setLoading(true));
    try {
      const user = await Auth.currentAuthenticatedUser();
      const data = await Auth.changePassword(user, oldPassword, newPassword);

      dispatch(setLoading(false));
      if (data === "SUCCESS") {
        reactToastifyNotification("info", "Password change successfully");
        history.back();
      }
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", error?.message);
    }
  };

  return (
    <>
      <div
        className={styles.inputMainDiv}
        style={{ backgroundImage: `url("/images/login-bg.png")` }}
      >
        <div className={styles.inputContentDiv}>
          <div className={styles.logo}>
            <div>
              <Image
                src="/images/logo.png"
                alt="logo will soon load"
                layout={"fill"}
                // height={400}
                // width={400}
                objectFit={"contain"}
                quality={100}
              />
            </div>
            <div className={styles.cross}>
              <HighlightOffOutlinedIcon />
            </div>
          </div>
          <h2>Reset Password</h2>
          <p className={styles.subHeading}>
            Please enter revious password and new password bellow.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="text"
              style={{ margin: "10px auto" }}
              placeholder="Previous password"
              name="oldPassword"
              register={register}
              required={{ required: "Enter Previous password" }}
              error={{
                isError: errors?.oldPassword ? true : false,
                //@ts-ignore
                message: errors?.oldPassword?.message,
              }}
            />

            <InputField
              type="text"
              style={{ margin: "10px auto" }}
              placeholder="New password"
              register={register}
              name="newPassword"
              required={{
                required: "Enter new password",
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                  message:
                    "Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character (#?!@$%^&*-)",
                },
              }}
              error={{
                isError: errors?.newPassword ? true : false,
                //@ts-ignore
                message: errors?.newPassword?.message,
              }}
            />

            <div className={styles.buttonDiv}>
              <ButtonComponent
                type="primary"
                style={{ height: "100%" }}
                value="Reset Password"
                fullWidth={true}
                submit={true}
              />
            </div>
          </form>
        </div>
      </div>
      <div
        className={styles.imgMainDiv}
        style={{ backgroundImage: `url("/images/reset-bg.png")` }}
      >
        <div className={styles.imgContentDiv}>
          <div className={styles.contentCard}>
            <h2>Remember Password</h2>
            <p>
              Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
              scelerisque leo.
            </p>
            <div className={styles.buttonRightDiv}>
              <Link href="/login">
                <a>
                  <ButtonComponent
                    type="text"
                    style={{ height: "100%" }}
                    value="Login"
                    fullWidth={true}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
