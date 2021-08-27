import React from "react";
const Inputbox = ({
  id,
  className,
  name,
  value,
  onChange,
  disabled,
  maxlength,
  placeholder,
  readOnly,
  type,
}) => {
  return (
    <input
      type={type ? type : "text"}
      className={`form-control${className ? " " + className : ""}`}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      maxLength={maxlength}
      placeholder={placeholder}
      autoComplete="off"
      readOnly={readOnly}
    />
  );
};
export default Inputbox;
