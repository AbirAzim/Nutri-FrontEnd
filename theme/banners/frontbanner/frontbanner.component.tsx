import Link from "next/link";
import React from "react";
import ButtonComponent from "../../button/buttonA/button.component";
import styles from "./frontbanner.module.scss";

function Frontbanner() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.contentCard}>
        <h2>Your taste buds and health will never be the same!</h2>
        <p>
          Our blending formula and tools will empower you to combine plant based
          foods like chef and pharmacist. Blending CulinaryRX ensures
          exceptional culinary and health outcomes.
        </p>
        <div>
          <Link href="/login">
            <a>
              <ButtonComponent
                type={"primary"}
                value={"Get Started"}
                style={{ height: "100%" }}
                fullWidth
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Frontbanner;
