/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import styles from "./socialTray.module.scss";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useMutation } from "@apollo/client";
import CREATE_NEW_USER from "../../../../gqlLib/user/mutations/createNewUser";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setDbUser,
  setProvider,
  setUser,
} from "../../../../redux/slices/userSlice";
import { useRouter } from "next/router";
import notification from "../../../../components/utility/reactToastifyNotification";

type SocialLoginType = (
  provider: "Amazon" | "Google" | "Facebook" | "Apple" | "Cognito",
) => void;

const SocialTray = () => {
  const [createNewUser] = useMutation(CREATE_NEW_USER);
  const dispatch = useAppDispatch();
  const history = useRouter();
  const { user } = useAppSelector((state) => state?.user);

  const updateUser = async () => {
    try {
      const res = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const {
        signInUserSession: {
          idToken: {
            payload: { email, given_name, identities },
          },
        },
      } = res;
      const { data } = await createNewUser({
        variables: {
          data: {
            email: email,
            provider: identities?.[0]?.providerName?.toLowerCase(),
          },
        },
      });

      dispatch(setUser(email));
      dispatch(setDbUser(data?.createNewUser));
      dispatch(setProvider(identities?.[0]?.providerName?.toLowerCase()));
      // console.log(data);
      // if (!data?.createNewUser?.isCreated) history.push("/user/profile/");
      // else history.push("/");
    } catch (error) {
      //notification("error", error?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      updateUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSocialSighup: SocialLoginType = async (provider) => {
    try {
      await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider[provider],
      });
    } catch (error) {
      notification("error", error?.message);
      console.log(error);
    }
  };

  return (
    <>
      {/* <button onClick={hub}>get user</button> */}
      <ul className={styles.socialWrap}>
        <li className={styles.listElem}>
          <img
            src={"/images/google.png"}
            alt="Icon"
            onClick={() => handleSocialSighup("Google")}
          />
        </li>
        <li className={styles.listElem}>
          <img
            src={"/images/fb.png"}
            alt="Icon"
            onClick={() => handleSocialSighup("Facebook")}
          />
        </li>
        <li className={styles.listElem}>
          <img src={"/images/twitter.png"} alt="Icon" />
        </li>
        <li className={styles.listElem}>
          <img
            src={"/images/apple.png"}
            alt="Icon"
            onClick={() => handleSocialSighup("Apple")}
          />
        </li>
      </ul>
    </>
  );
};

export default SocialTray;
