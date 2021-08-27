import React from "react";
const Chcekbox = ({
  id,
  className,
  name,
  value,
  onChange,
  disabled,
  checked,
  label,
  hiddenLabel,
}) => {
  return (
    <div className={`check ${className ? " " + className : ""}`}>
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        checked={checked || ""}
        aria-label={label}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
export default Chcekbox;
