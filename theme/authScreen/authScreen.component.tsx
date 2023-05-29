import React, { useEffect } from "react";
import styles from "./authScreen.module.scss";
import LoginScreen from "./screens/loginScreen/Login.component";
import SignupScreen from "./screens/signupScreen/SignupScreen.component";
import ForgotPassword from "./screens/forgotPassword/ForgotPassword.component";
import Footer from "./authComponents/socialTray/footer/footer.component";
import Reset_password from "./screens/resetPassword/resetPassword.component";
import ErrorPage from "../../components/pages/404Page";
import HeadTagInfo from "../headTagInfo";

interface authScreen {
  type: "login" | "signup" | "password_reset" | "forget_password" | "";
}

const AuthScreen = ({ type = "" }: authScreen) => {
  // login screen
  if (type === "login") {
    return (
      <HeadTagWrapper type={type}>
        <div className={styles.mainScreen}>
          <div className={styles.mainDiv}>
            <LoginScreen />
          </div>
          <Footer />
        </div>
      </HeadTagWrapper>
    );
  }

  // signup screen
  else if (type === "signup") {
    return (
      <HeadTagWrapper type={type}>
        <div className={styles.mainScreen}>
          <div
            className={styles.mainDiv + " " + styles.mainDivSignup}
            style={{}}
          >
            <SignupScreen />
          </div>
          <Footer />
        </div>
      </HeadTagWrapper>
    );
  }

  // forgot password Screen
  else if (type === "forget_password") {
    return (
      <HeadTagWrapper type={type}>
        <div className={styles.mainScreen}>
          <div className={styles.mainDiv}>
            <ForgotPassword />
          </div>
          <Footer />
        </div>
      </HeadTagWrapper>
    );
  } else if (type === "password_reset") {
    return (
      <HeadTagWrapper type={type}>
        <div className={styles.mainScreen}>
          <div className={styles.mainDiv}>
            <Reset_password />
          </div>
          <Footer />
        </div>
      </HeadTagWrapper>
    );
  } else {
    return <ErrorPage errorMessage={`${type} page not found`} />;
  }
};

const HeadTagWrapper: React.FC<{
  type: "login" | "signup" | "password_reset" | "forget_password" | "";
}> = ({ children, type }) => {
  return (
    <>
      <HeadTagInfo title={`${type}`?.toUpperCase()} description={`${type}`} />
      {children}
    </>
  );
};
export default AuthScreen;
