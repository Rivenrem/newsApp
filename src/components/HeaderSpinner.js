import styles from "./headerSpinner.module.scss";
import Spinner from "./Spinner";

export default function HeaderSpinner() {
  return <Spinner className={styles["header-spinner"]} />;
}
