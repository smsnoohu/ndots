import React from "react";
const Radio = ({
  id,
  className,
  name,
  dataName,
  value,
  onChange,
  disabled,
  checked,
  label,
}) => {
  return (
    <div className="radio">
      <input
        type="radio"
        className={className ? className : ""}
        name={name}
        data-name={dataName}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        checked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
export default Radio;
