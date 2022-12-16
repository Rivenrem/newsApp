import styles from "./selector.module.scss";

export default function Selector({
  labelText,
  navigate,
  value,
  arrayOfValues,
}) {
  return (
    <>
      <label>{labelText}</label>
      <select
        className={styles.select}
        onChange={(event) => {
          navigate(event);
        }}
        value={value}
      >
        {arrayOfValues.map((value, key) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
