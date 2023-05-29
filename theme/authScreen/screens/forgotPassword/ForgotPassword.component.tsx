import Link from "next/link";
import React, { useState } from "react";
import ButtonComponent from "../../../button/buttonA/button.component";
import InputField from "../../../input/registerInput/RegisterInput";
import styles from "./ForgotPassword.module.scss";
import Image from "next/image";
import HighlightOffOutlinedIcon from "../../../../public/icons/highlight_off_black_36dp.svg";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import { useAppDispatch } from "../../../../redux/hooks";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const [sendcode, setSendCode] = useState(false);

  const dispatch = useAppDispatch();
  const history = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, code, newPassword }) => {
    dispatch(setLoading(true));
    try {
      if (sendcode) {
        const data = await Auth.forgotPasswordSubmit(email, code, newPassword);

        dispatch(setLoading(false));
        if (data === "SUCCESS") {
          reactToastifyNotification("info", "New password set successfully");
          setSendCode(false);
          history.push("/login");
        }
      } else {
        await Auth.forgotPassword(email);
        dispatch(setLoading(false));
        reactToastifyNotification(
          "info",
          "A confirmation code has been sent to your email",
        );
        setSendCode(true);
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
        style={{
          backgroundImage: `url("/images/login-bg.png")`,
        }}
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
          <h2>Forgot Password</h2>
          <p className={styles.subHeading}>Please enter your email bellow</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="email"
              style={{ margin: "10px auto" }}
              placeholder="Enter eamil"
              name="email"
              register={register}
              required={{
                required: "Email your email",
                pattern: {
                  value:
                    /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                  message: "Enter valid email",
                },
              }}
              error={{
                isError: errors?.email ? true : false,
                //@ts-ignore
                message: errors?.email?.message,
              }}
            />

            {sendcode ? (
              <>
                <InputField
                  type="text"
                  style={{ margin: "10px auto" }}
                  placeholder="confirmation code"
                  name="code"
                  register={register}
                  required={{ required: "Enter confirmation code" }}
                  error={{
                    isError: errors?.code ? true : false,
                    //@ts-ignore
                    message: errors?.code?.message,
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
              </>
            ) : null}
            <div className={styles.buttonDiv}>
              <ButtonComponent
                type="primary"
                style={{ height: "100%", fontSize: "18px" }}
                value="Send"
                fullWidth={true}
              />
            </div>
          </form>
        </div>
        <br />
      </div>
      <div
        className={styles.imgMainDiv}
        style={{ backgroundImage: `url("/images/forget-bg.png")` }}
      >
        <div className={styles.imgContentDiv}>
          <div className={styles.contentCard}>
            <h2>Remember Password</h2>
            <p>
              afasf afiga sdkfgasdfa g;fsfkjas fjahsjfh gjhagj
              hjafhjhsdafaffafdasf
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

export default ForgotPassword;
