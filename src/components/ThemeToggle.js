import styles from "./themeToggle.module.scss";

export default function ThemeToggle({ lightTheme, setLightTheme }) {
  return (
    <div className={styles["toggle"]}>
      <input
        type="checkbox"
        className={styles["toggle__checkbox"]}
        id="checkbox"
        onClick={() => {
          setLightTheme(!lightTheme);
        }}
      ></input>
      <label htmlFor="checkbox" className={styles["toggle__label"]}>
        <div
          className={
            lightTheme
              ? styles["toggle__ball"]
              : styles["toggle__ball"] + " " + styles["toggle__ball--dark"]
          }
        ></div>
      </label>
    </div>
  );
}
