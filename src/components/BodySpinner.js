import styles from "./bodySpinner.module.scss";
import Spinner from "./Spinner";
import ReactDOM from "react-dom";

export default function BodySpinner() {
  return ReactDOM.createPortal(
    <>
      <div className={styles.shield}></div>
      <Spinner className={styles["body-spinner"]} />
    </>,
    document.getElementById("portal")
  );
}
