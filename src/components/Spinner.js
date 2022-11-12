import styles from "./spinner.module.scss";

export default function Spinner({ className } = { className: "" }) {
  return <div className={`${styles.spinner} ${className}`}></div>;
}
