import { useState } from "react";
import styles from "./themeToggle.module.scss";

export default function ThemeToggle({ defaultValue, toggle }) {
  const [toggleValue, setToggleValue] = useState(defaultValue);
  return (
    <div className={styles["toggle"]}>
      <input
        type="checkbox"
        className={styles["toggle__checkbox"]}
        id="checkbox"
        onClick={() => {
          setToggleValue(!toggleValue);
          toggle(toggleValue);
        }}
      ></input>
      <label htmlFor="checkbox" className={styles["toggle__label"]}>
        <div
          className={
            defaultValue
              ? styles["toggle__ball"]
              : styles["toggle__ball"] + " " + styles["toggle__ball--dark"]
          }
        ></div>
      </label>
    </div>
  );
}
