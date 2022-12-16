import styles from "./selector.module.scss";

export default function Selector({
  labelText,
  onChange,
  defaultValue,
  values,
}) {
  return (
    <>
      <label>{labelText}</label>
      <select
        className={styles.select}
        onChange={onChange}
        value={defaultValue}
      >
        {values.map((value, key) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
