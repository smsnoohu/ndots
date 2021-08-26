import React from "react";
const Textarea = ({
  id,
  className,
  name,
  value,
  handleChange,
  disabled,
  maxlength,
  placeholder,
}) => {
  return (
    <textarea
      cols=""
      rows=""
      className={`form-control${className ? " " + className : ""}`}
      name={name}
      id={id}
      onChange={handleChange}
      disabled={disabled}
      maxLength={maxlength}
      placeholder={placeholder}
      defaultValue={value}
      autoComplete="nope"
    ></textarea>
  );
};
export default Textarea;
