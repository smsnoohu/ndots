import React from "react";
const Textarea = ({
  id,
  className,
  name,
  value,
  onChange,
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
      onChange={onChange}
      disabled={disabled}
      maxLength={maxlength}
      placeholder={placeholder}
      defaultValue={value}
      autoComplete="nope"
    ></textarea>
  );
};
export default Textarea;
