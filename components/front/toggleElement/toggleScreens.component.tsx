import React, { useState } from "react";
import TogglerComponent from "../../../theme/toggler/toggler.component";
import styles from "./toggleScreens.module.scss";
import Image from "next/image";
import ButtonComponent from "../../../theme/button/buttonA/button.component";
import { contentList } from "./togglerData";

const ToggleScreens = () => {
  const [toggler, setToggler] = useState("The Way");
  let childrenList = ["The Way", "The How", "The Why", "The Will"];
  let listData = contentList;

  const contentRendering = () => {
    for (let index = 0; index < childrenList.length; index++) {
      if (toggler === childrenList[index]) {
        let content = listData[index];
        return content;
      }
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.toggler}>
        <h2>What is Blending101 CulinaryRX?</h2>
        <TogglerComponent
          childs={childrenList}
          childColor="#fff"
          tags={["Part 1", "Part 2", "Part 3", "Part 4"]}
          tagColor="#fff"
          icons={[
            "/icons/tab1.svg",
            "/icons/tab2.svg",
            "/icons/tab3.svg",
            "/icons/tab4.svg",
          ]}
          value={toggler}
          setValue={setToggler}
          style={undefined}
          lineCss={undefined}
        />
      </div>
      <div className={styles.The__page}>
        <div className={styles.card}>
          <div className={styles.card__top}>
            <div className={styles.Image}>
              <Image
                src={contentRendering().TopHeadingImagePath}
                alt={contentRendering().TopAltImageText}
                layout={"fill"}
                // height={400}
                // width={400}
                objectFit={"contain"}
                quality={100}
                objectPosition={"top center"}
              />
            </div>
            <div className={styles.TextCard}>
              <div className={styles.container}>
                <h2>{contentRendering().HeadingTop}</h2>
                <p>{contentRendering().TopHeadingContent}</p>
                <ul className={styles.list__with__ticks__top}>
                  {contentRendering().TopElementList.map((listElem, index) => {
                    return <li key={index}>{listElem}</li>;
                  })}
                </ul>
                <div className={styles.buttonDiv}>
                  <ButtonComponent
                    type="primary"
                    fullWidth
                    value="Learn More"
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.card__below}>
            <div className={styles.TextCard}>
              <div className={styles.container}>
                <h2>{contentRendering().HeadingBottom}</h2>
                <p>{contentRendering().BottomHeadingContent}</p>
                <ul className={styles.list__with__ticks__below}>
                  {contentRendering().BottomElementList.map(
                    (listElem, index) => {
                      return <li key={index}>{listElem}</li>;
                    }
                  )}
                </ul>
                <div className={styles.buttonDiv}>
                  <ButtonComponent
                    type="primary"
                    fullWidth
                    value="Learn More"
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.Image}>
              <Image
                src={contentRendering().BottomHeadingImagePath}
                alt={contentRendering().BottomAltImageText}
                layout={"fill"}
                // height={400}
                // width={400}
                objectFit={"contain"}
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleScreens;
