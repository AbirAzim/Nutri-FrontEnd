import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import PanelHeader from "../../../recipe/share/panelHeader/PanelHeader";

interface Props {
  title: string;
  backAddress: string;
}

const TopHeader = ({ title, backAddress }: Props) => {
  const router = useRouter();
  return (
    <PanelHeader
      icon={
        "/icons/information.svg"
        // <FontAwesomeIcon icon={faChartColumn} fontSize="24" />
      }
      title={`About ${title}`}
      rightSide={
        <IconWarper
          iconColor="iconColorWhite"
          defaultBg="secondary"
          hover="bgSecondary"
          style={{ width: "28px", height: "28px" }}
          handleClick={() => router.push(backAddress)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconWarper>
      }
    />
  );
};

export default TopHeader;
