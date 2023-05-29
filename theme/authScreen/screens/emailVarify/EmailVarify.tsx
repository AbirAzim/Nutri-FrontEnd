/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import ButtonComponent from "../../../button/buttonA/button.component";
import styles from "./EmailVarify.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setUser,
  setDbUser,
  setProvider,
} from "../../../../redux/slices/userSlice";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import CREATE_NEW_USER from "./../../../../gqlLib/user/mutations/createNewUser";
import { useMutation } from "@apollo/client";
import InputComponent from "../../../input/input.component";
import HeadTagInfo from "../../../headTagInfo";

const EmailVerify = () => {
  const [code, setCode] = useState("");

  const { nonConfirmedUser } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const history = useRouter();
  const [createNewUser] = useMutation(CREATE_NEW_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code) {
      dispatch(setLoading(true));

      try {
        await Auth.confirmSignUp(nonConfirmedUser, code);
        const { data } = await createNewUser({
          variables: {
            data: { email: nonConfirmedUser, provider: "email" },
          },
        });
        dispatch(setLoading(false));
        reactToastifyNotification("info", "Sign up successfully");
        dispatch(setUser(nonConfirmedUser));
        dispatch(setDbUser(data?.createNewUser));
        dispatch(setProvider("email"));
        history.push("/user/profile");
      } catch (error) {
        dispatch(setLoading(false));
        reactToastifyNotification("error", error?.message);
      }
    } else {
      reactToastifyNotification("warning", "Please enter code");
    }
  };

  const resendSignUp = async () => {
    dispatch(setLoading(true));
    try {
      const code = await Auth.resendSignUp(nonConfirmedUser);
      dispatch(setLoading(false));
      reactToastifyNotification(
        "info",
        "A new verification code has been send to you email.",
      );
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", error?.message);
    }
  };

  return (
    <>
      <HeadTagInfo title={`Email verify`} description={`email verify`} />
      <div className={styles.mainDiv}>
        <div className={styles.varifyEmailContainer}>
          <img src="/images/logo.png" alt="logo will soon load" />

          <h2>Verify Email</h2>
          <p>
            A Verification code is sent to your mail. Please paste it below.
          </p>
          <form onSubmit={handleSubmit}>
            <InputComponent
              type="text"
              style={{ margin: "4px auto 15px auto" }}
              value={code}
              placeholder="Verify your account"
              fullWidth={true}
              onChange={(e) => setCode(e?.target?.value)}
            />

            <div className={styles.buttonContainer}>
              <ButtonComponent
                type="primary"
                style={{ height: "60px", fontSize: "18px" }}
                value="Verify"
                fullWidth={false}
                submit={true}
              />
            </div>
            <div className={styles.link}>
              <p onClick={resendSignUp}>Resend code</p>
              <Link href="/signup" passHref>
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
