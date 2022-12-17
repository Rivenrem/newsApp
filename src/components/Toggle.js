import { useEffect, useState } from "react";
import styles from "./themeToggle.module.scss";

export default function Toggle({ defaultValue, toggle }) {
  const [toggleValue, setToggleValue] = useState(defaultValue);

  useEffect(() => {
    toggle(toggleValue);
  }, [toggleValue]);

  return (
    <div className={styles["toggle"]}>
      <input
        type="checkbox"
        className={styles["toggle__checkbox"]}
        id="checkbox"
        onClick={() => {
          setToggleValue(!toggleValue);
        }}
      ></input>
      <label htmlFor="checkbox" className={styles["toggle__label"]}>
        <div
          className={
            toggleValue
              ? styles["toggle__ball"]
              : styles["toggle__ball"] + " " + styles["toggle__ball--dark"]
          }
        ></div>
      </label>
    </div>
  );
}
