import { useMutation } from "@apollo/client";
import { Auth } from "aws-amplify";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import notification from "../../components/utility/reactToastifyNotification";
import CREATE_NEW_USER from "../../gqlLib/user/mutations/createNewUser";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, setDbUser, setProvider } from "../../redux/slices/userSlice";
import styles from "../../styles/pages/auth.module.scss";
import SocialTray from "../../theme/authScreen/authComponents/socialTray/socialTray.component";
import LoginScreen from "../../theme/authScreen/screens/loginScreen/Login.component";
import ButtonComponent from "../../theme/button/buttonA/button.component";
import InputField from "../../theme/input/registerInput/RegisterInput";
import CircularRotatingLoader from "../../theme/loader/circularRotatingLoader.component";
import HighlightOffOutlinedIcon from "../../public/icons/highlight_off_black_36dp.svg";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createNewUser] = useMutation(CREATE_NEW_USER);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (input) => {
    setIsLoading(true);
    try {
      const cognitoData = await Auth.signIn(input?.email, input?.password);
      console.log(cognitoData);
      const {
        attributes: { email },
      } = cognitoData;
      const { data } = await createNewUser({
        variables: {
          data: { email: email, provider: "email" },
        },
      });

      dispatch(setUser(email));
      dispatch(setDbUser(data?.createNewUser));
      dispatch(setProvider("email"));
      console.log(data);
      // if (!data?.createNewUser?.isCreated) router.push("/user/profile/");
      // else router.push("/");
    } catch (error) {
      setIsLoading(false);
      notification("error", error?.message);
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__content}>
        <div className={styles.login__form}>
          <div className={styles.login__logo}>
            <Link href="/">
              <a href="">
                <Image
                  src="/images/logo.png"
                  alt="logo will soon load"
                  layout={"fill"}
                  objectFit={"contain"}
                  quality={100}
                />
              </a>
            </Link>
            {/* <div className={styles.cross}>
              <HighlightOffOutlinedIcon />
            </div> */}
          </div>
          <h2>Login</h2>
          {/* <div className={styles.quickLogin}>
            <span>Quick and easy social login</span>
            <SocialTray />
            <div className={styles.seperator} />
          </div> */}
          <p>Enter email and password</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="email"
              style={{ marginBottom: "20px" }}
              placeholder="Email"
              register={register}
              name="email"
              defaultValue=""
              required={{
                required: "Email requried",
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

            <InputField
              type="password"
              placeholder="Password"
              register={register}
              name="password"
              defaultValue=""
              required={{
                required: "password requried",
              }}
              error={{
                isError: errors?.password ? true : false,
                //@ts-ignore
                message: errors?.password?.message,
              }}
            />

            <div className={styles.forgetPassword}>
              <div>
                <input type="checkbox" />
                <label>Keep me looged</label>
              </div>
              <Link href="/forget_password">
                <a>Forget Password?</a>
              </Link>
            </div>

            {/* <div className={styles.buttonDiv}> */}
            <ButtonComponent
              type="primary"
              style={{ height: "100%" }}
              value={
                !isLoading ? (
                  "Login"
                ) : (
                  <div className={styles.loggingInBtn}>
                    <span>
                      <CircularRotatingLoader />
                    </span>
                    Logging In
                  </div>
                )
              }
              fullWidth={true}
              submit={true}
              disabled={isLoading}
            />
            {/* </div> */}
          </form>
          <div className={styles.lineSocialDiv}>
            <div className={styles.seperator} />
            <SocialTray />
          </div>
        </div>
      </div>
      <div className={styles.auth__footer}>
        <p>Copywrite © 2021 Blending 101</p>
      </div>
    </div>
  );
};

export default Login;
