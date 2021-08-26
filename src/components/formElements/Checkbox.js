import React from "react";
const Chcekbox = ({
  id,
  className,
  name,
  value,
  handleChange,
  disabled,
  checked,
  label,
}) => {
  return (
    <div className={`check ${className ? " " + className : ""}`}>
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        checked={checked || ""}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
export default Chcekbox;
