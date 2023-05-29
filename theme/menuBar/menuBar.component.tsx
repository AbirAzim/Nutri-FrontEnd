import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./menubar.module.scss";

interface menuBarInterface {
  childs: Array<[]>;
  value: any;
  setValue: Function;
  className: string;
}

export default function MenubarComponent({
  containerId,
  childs,
  setValue,
  className,
}: any) {
  childs = childs || [
    "All",
    "Wholefood",
    "Smoothie",
    "Refreshing",
    "Teas & Tonics",
  ];

  const lineRef = useRef<any>();

  const handleClick = (menu: string) => {
    moveLine(menu);
  };

  const moveLine = useCallback(
    (menu: string) => {
      const id = "menubar__child" + menu + containerId;
      const elem = document.getElementById(id);
      setValue && setValue(menu);

      if (!elem) return;
      const elemWidth = elem.offsetWidth + "px";
      const fromLeft = elem.offsetLeft + "px";

      if (!lineRef.current) return;
      const ref = lineRef.current;
      ref.style.width = elemWidth;
      ref.style.left = fromLeft;
    },
    [setValue, containerId],
  );

  useEffect(() => {
    moveLine(childs[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.menu} ${className}`}>
      <div className={styles.menu__inner}>
        {childs &&
          childs?.map((child: any, i: number) => (
            <div
              className={styles.menu__child}
              key={"menubar" + child + i}
              onClick={() => handleClick(child)}
              id={"menubar__child" + child + containerId}
            >
              {child}
            </div>
          ))}
        <div className={styles.line} id="line__rep3" ref={lineRef}></div>
      </div>
    </div>
  );
}
