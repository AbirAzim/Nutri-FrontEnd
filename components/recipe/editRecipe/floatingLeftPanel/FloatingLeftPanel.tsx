import React, { useState } from "react";
import TrayTag from "../../../sidetray/TrayTag";
import TrayWrapper from "../../../sidetray/TrayWrapper";
import { faBasketShopping as faBasketShoppingRegular } from "@fortawesome/pro-regular-svg-icons";
import { faBasketShopping as faBasketShoppingSolid } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface Props {
    children: React.ReactNode
}

const FloatingLeftPanel = ({children}:Props) =>{
    const [openTray, setOpenTray] = useState(false);

    return(
        <TrayWrapper
            isolated={true}
            showPanle="left"
            showTagByDefaut={true}
            openTray={openTray}
            panleTag={(hover) => (
              <TrayTag
                hover={hover}
                icon={
                  <FontAwesomeIcon
                    icon={
                      hover ? faBasketShoppingRegular : faBasketShoppingSolid
                    }
                  />
                }
                placeMent="left"
                handleTagClick={() => setOpenTray((prev) => !prev)}
              />
            )}
          >
            {children}
          </TrayWrapper>
    )
}

export default FloatingLeftPanel;