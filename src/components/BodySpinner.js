import styles from "./bodySpinner.module.scss";
import Spinner from "./Spinner";

export default function BodySpinner() {
  return (
    <>
      <div className={styles.shield}></div>
      <Spinner className={styles["body-spinner"]} />
    </>
  );
}
