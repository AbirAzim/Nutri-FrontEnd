import Link from "next/link";
import React from "react";
import InputField from "../../../input/registerInput/RegisterInput";
import Image from "next/image";
import styles from "./SignupScreen.module.scss";
import ButtonComponent from "../../../button/buttonA/button.component";
import SocialTray from "../../authComponents/socialTray/socialTray.component";
import HighlightOffOutlinedIcon from "../../../../public/icons/highlight_off_black_36dp.svg";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { setNonConfirmedUser } from "../../../../redux/slices/userSlice";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import { useAppDispatch } from "../../../../redux/hooks";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";

// const emailRegex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// const emailRegex3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const SignupScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const history = useRouter();
  const dispatch = useAppDispatch();

  const password = watch("password");
  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const { email, password } = data;
    try {
      const { user } = await Auth?.signUp({
        username: email,
        password: password,
        attributes: {
          email,
        },
      });
      dispatch(setLoading(false));
      reactToastifyNotification(
        "info",
        "A varification code has been sent to your eamil",
      );
      //@ts-ignore
      dispatch(setNonConfirmedUser(user?.username));
      history?.push("/verify_email");
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", error?.message);
    }
  };

  return (
    <>
      <div
        className={styles.imgMainDiv}
        style={{ backgroundImage: `url("/images/signup.png")` }}
      >
        <div className={styles.imgContentDiv}>
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
          </div>
          <div className={styles.contentCard}>
            <h2>Already have an Account</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              sit a voluptas eligendi adribus placeat minus maiores amet earum.
            </p>
            <div className={styles.buttonRightDiv}>
              <ButtonComponent
                type="text"
                style={{ height: "100%" }}
                value="Login"
                fullWidth={true}
                handleClick={() => history?.push("/login")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Left Screen Up */}
      {/* Right Screen down */}

      <div
        className={styles.inputMainDiv}
        // style={{
        //   backgroundImage: `url("/images/login-bg.png")`,
        //   backgroundColor: "#FAFBF9",
        // }}
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
          <h2>Sign Up</h2>
          <p className={styles.hookline}>Quick and easy social login</p>
          <p className={styles.inputPara}>
            Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
            scelerisque leo.
          </p>
          <div className={styles.lineTrayA}>
            <SocialTray />
            <div className={styles.seperatorLogin} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="email"
              style={{ marginBottom: "10px" }}
              placeholder="Email"
              width="100%"
              register={register}
              name="email"
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
                message: errors?.email?.message,
              }}
            />

            <InputField
              type="password"
              style={{ margin: "10px 0px" }}
              placeholder="Password"
              width="100%"
              register={register}
              name="password"
              required={{
                required: "password requried",
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                  message:
                    "Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character (#?!@$%^&*-)",
                },
              }}
              error={{
                isError: errors?.password ? true : false,
                message: errors?.password?.message,
              }}
            />

            <InputField
              type="password"
              style={{ margin: "10px 0px" }}
              placeholder={"Confirm Password"}
              width="100%"
              register={register}
              name="comfirmPassword"
              required={{
                required: "Comfirm password requried",
                validate: (value) =>
                  value === password || "Password doesn't match",
              }}
              error={{
                isError: errors?.comfirmPassword ? true : false,
                message: errors?.comfirmPassword?.message,
              }}
            />

            <div className={styles.signUpButtonDiv}>
              <ButtonComponent
                type="primary"
                style={{ height: "100%" }}
                value="Sign Up"
                fullWidth={true}
                submit={true}
              />
            </div>
          </form>
          <div className={styles.lineTrayB}>
            <div className={styles.seperatorLogin} />
            <SocialTray />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupScreen;
