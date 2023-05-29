import React, { useState } from "react";
import styles from "./CustomToolTip.module.scss";

type ToolTipProps = {
  children: React.ReactNode;
  content: string;
  delay?: number;
  direction?: "top" | "bottom" | "left" | "right" | "";
  bgColor?: "bgBlack" | "bgPrimary" | "bgSecondary";
  // style?: React.CSSProperties;
};

const Tooltip = ({
  children,
  content,
  delay = 300,
  direction = "",
  bgColor = "bgBlack",
}: ToolTipProps) => {
  let timeout;
  const [active, setActive] = useState(false);

  const [info, setInfo] = useState({
    x: 0,
    y: 0,
    type: "none",
  });

  // const [style, setStyle] = useState({});

  // useEffect(() => {
  //   if (window !== undefined) {
  //     setStyle({
  //       left: info.x + window.scrollX + "px",
  //       top: info.y + window.scrollY + "px",
  //     });
  //   }
  // }, [info]);

  const pastShow = (hoverRect, currentTarget) => {
    // position the tooltip after showing it
    let ttNode = currentTarget;

    if (ttNode != null) {
      let x = 0,
        y = 0;

      const docWidth = document.documentElement.clientWidth,
        docHeight = document.documentElement.clientHeight;

      let rx = hoverRect.clientX + hoverRect.screenX, // most right x
        lx = hoverRect.clientX, // most left x
        ty = hoverRect.clientY, // most top y
        by = hoverRect.clientY + hoverRect.screenY; // most bottom y

      // tool tip rectange
      let ttRect = ttNode.getBoundingClientRect();

      let bRight = rx + ttRect.width <= window.scrollX + docWidth;
      let bLeft = lx - ttRect.width >= 0;

      let bAbove = ty - ttRect.height >= 0;
      let bBellow = by + ttRect.height <= window.scrollY + docHeight;

      let newState = {};

      // the tooltip doesn't fit to the right
      if (bRight) {
        x = rx;

        y = ty + (hoverRect.screenY - ttRect.height);

        if (y < 0) {
          y = ty;
        }
        //@ts-ignore
        newState.type = "right";
      } else if (bBellow) {
        y = by;

        x = lx + (hoverRect.screenX - ttRect.width);

        if (x < 0) {
          x = lx;
        }
        //@ts-ignore
        newState.type = "bottom";
      } else if (bLeft) {
        x = lx - ttRect.width;

        y = ty + (hoverRect.screenY - ttRect.height);

        if (y < 0) {
          y = ty;
        }
        //@ts-ignore
        newState.type = "left";
      } else if (bAbove) {
        y = ty - ttRect.height;

        x = lx + (hoverRect.screenX - ttRect.width);

        if (x < 0) {
          x = lx;
        }
        //@ts-ignore
        newState.type = "top";
      }

      newState = { ...newState, x: x, y: y };

      setInfo((pre) => ({ ...pre, ...newState }));
    }
  };

  const showTip = (e) => {
    const event = e;
    const cTarget = e?.currentTarget;
    timeout = setTimeout(() => {
      if (!direction) {
        pastShow(event, cTarget);
      }
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={styles.Tooltip_Wrapper}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div
          className={`${styles.Tooltip_Tip} ${
            direction ? styles[direction] : styles[info?.type]
          }`}
          // style={style}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
