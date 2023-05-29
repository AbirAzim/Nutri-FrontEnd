import React from "react";
import styles from "./landingFooter.module.scss";
import Image from "next/image";
import Link from "next/link";

const LandingFooter = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__download}>
        <div className={styles.footer__download__left}>
          <div className={styles.footer__download__left__logo}>
            <Image
              src={"/images/logo.png"}
              alt="Picture will load soon"
              height={"45px"}
              width={"180px"}
            />
          </div>
          <div className={styles.footer__download__left__socialtray}>
            <ul>
              <li>
                <Image
                  src={"/icons/fire.svg"}
                  alt=""
                  height={"20px"}
                  width={"20px"}
                />
              </li>
              <li>
                <Image
                  src={"/icons/fire.svg"}
                  alt=""
                  height={"20px"}
                  width={"20px"}
                />
              </li>
              <li>
                <Image
                  src={"/icons/fire.svg"}
                  alt=""
                  height={"20px"}
                  width={"20px"}
                />
              </li>
              <li>
                <Image
                  src={"/icons/fire.svg"}
                  alt=""
                  height={"20px"}
                  width={"20px"}
                />
              </li>
              <li>
                <Image
                  src={"/icons/fire.svg"}
                  alt=""
                  height={"20px"}
                  width={"20px"}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__download__center}>
          <div className={styles.footer__download__center__card}>
            <h2>Download our App now!</h2>
            <div className={styles.footer__download__center__buttons}>
              <div className={styles.footer__download__center__buttons__left}>
                <span>
                  <div className={styles.btn}>
                    <Link href={"#"}>
                      <a>
                        <Image
                          src={"/images/app-store@2x.png"}
                          alt="banner Icon"
                          height={"66px"}
                          width={"178px"}
                        />
                      </a>
                    </Link>
                  </div>
                </span>
              </div>
              <div className={styles.footer__download__center__buttons__right}>
                <span>
                  <div className={styles.btn}>
                    <Link href={"#"}>
                      <a>
                        <Image
                          src={"/images/app-store@2x.png"}
                          alt="banner Icon"
                          height={"66px"}
                          width={"178px"}
                        />
                      </a>
                    </Link>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer__download__right}>
          <ul>
            <li>About Us</li>
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className={styles.footer__bottom}>
        <p>Copywrite © 2021 Blending 101</p>
      </div>
    </div>
  );
};

export default LandingFooter;
