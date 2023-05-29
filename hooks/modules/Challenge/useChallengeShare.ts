import { useMutation } from "@apollo/client";
import axios from "axios";
import html2canvas from "html2canvas";
import { useCallback, useRef, useState } from "react";
import { SHARE_CHALLENGE } from "../../../graphql/Challenge";
import { dataURLtoFile } from "../../../helpers/File";
import { useAppSelector } from "../../../redux/hooks";

const useChallengeShare = (challenge) => {
  const [link, setLink] = useState("");
  const challengeProgress = useRef<HTMLDivElement>(null);

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [shareChallenge] = useMutation(SHARE_CHALLENGE);

  const shareChallengeHandler = useCallback(() => {
    const id = challenge?.challengeInfo?.challengeId;

    shareChallenge({
      variables: {
        userId,
        challengeId: id,
      },
    }).then((res) => {
      setLink(
        `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/challenge?id=${id}&token=${res.data?.shareGlobalChallenge}`,
      );

      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/challenge/shared?id=${id}&token=${res.data?.shareGlobalChallenge}`,
      );

      html2canvas(challengeProgress.current).then((canvas) => {
        const data = canvas.toDataURL("image/jpg");
        const file = dataURLtoFile(data, "challenge.png");

        // STORING THE DIALER IMAGE
        const formdata = new FormData();
        formdata.append("image", file, `${id}.jpg`);

        axios.post(
          "https://om7h45qezg.execute-api.us-east-1.amazonaws.com/prod//file-processing/images/single",
          formdata,
        );

        const link = document.createElement("a");
        if (typeof link.download === "string") {
          link.href = data;
          link.download = "image.jpg";

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(data);
        }
      });
    });
  }, [challenge?.challengeInfo?.challengeId, shareChallenge, userId]);

  return {
    url: link,
    progress: challengeProgress.current,
    onShare: shareChallengeHandler,
  };
};

export default useChallengeShare;
