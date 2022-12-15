import styles from "./themeToggle.module.scss";

export default function ThemeToggle({ lightTheme, setLightTheme }) {
  return (
    <div className={styles["toggle"]}>
      <input
        type="checkbox"
        className={styles["toggle-checkbox"]}
        id="checkbox"
        onClick={() => {
          setLightTheme(!lightTheme);
        }}
      ></input>
      <label htmlFor="checkbox" className={styles["toggle-label"]}>
        <div
          className={
            lightTheme
              ? styles["toggle-ball"]
              : styles["toggle-ball"] + " " + styles["toggle-ball--dark"]
          }
        ></div>
      </label>
    </div>
  );
}
