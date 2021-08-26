import React from "react";
const Radio = ({
  id,
  className,
  name,
  dataName,
  value,
  handleChange,
  disabled,
  checked,
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
        onChange={handleChange}
        disabled={disabled}
        checked={checked}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};
export default Radio;
