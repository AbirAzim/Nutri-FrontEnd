import Link from "next/link";
import React, { useState } from "react";
import ButtonComponent from "../../../button/buttonA/button.component";
import InputField from "../../../input/registerInput/RegisterInput";
import SocialTray from "../../authComponents/socialTray/socialTray.component";
import styles from "./Login.module.scss";
import Image from "next/image";
import HighlightOffOutlinedIcon from "../../../../public/icons/highlight_off_black_36dp.svg";
import { Auth } from "aws-amplify";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  setDbUser,
  setProvider,
  setUser,
} from "../../../../redux/slices/userSlice";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import CREATE_NEW_USER from "../../../../gqlLib/user/mutations/createNewUser";
import { useForm } from "react-hook-form";
import CircularRotatingLoader from "../../../loader/circularRotatingLoader.component";
import notification from "../../../../components/utility/reactToastifyNotification";

const LoginScreen = () => {
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
      if (!data?.createNewUser?.isCreated) router.push("/user/profile/");
      else router.push("/");
    } catch (error) {
      setIsLoading(false);
      notification("error", error?.message);
    }
  };

  return (
    <>
      <div className={styles.inputMainDiv} style={{}}>
        <div className={styles.inputContentDiv}>
          <div className={styles.logo}>
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
            <div className={styles.cross}>
              <HighlightOffOutlinedIcon />
            </div>
          </div>
          <h2>Login</h2>
          {/* <button onClick={logOut}>Log out</button> */}
          <div className={styles.quickLogin}>
            <span>Quick and easy social login</span>
            <SocialTray />
            <div className={styles.seperator} />
          </div>
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
                required: "Email required",
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
                required: "password required",
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
              {/* <Link href="/reset_password">
                <a style={{ marginRight: "16px" }}>Change Password?</a>
              </Link> */}
              <Link href="/forget_password">
                <a>Forget Password?</a>
              </Link>
            </div>
            <div className={styles.buttonDiv}>
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
            </div>
          </form>
          <div className={styles.lineSocialDiv}>
            <div className={styles.seperator} />
            <SocialTray />
          </div>
        </div>
      </div>
      <div
        className={styles.imgMainDiv}
        style={{ backgroundImage: `url("/images/new-user-bg.png")` }}
      >
        <div className={styles.imgContentDiv}>
          <div className={styles.contentCard}>
            <h2>New User</h2>
            <p>
              Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
              scelerisque leo.
            </p>
            <div className={styles.buttonRightDiv}>
              <Link href="/signup">
                <a>
                  <ButtonComponent
                    type="text"
                    style={{ height: "100%" }}
                    value="Sign Up"
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

export default LoginScreen;
