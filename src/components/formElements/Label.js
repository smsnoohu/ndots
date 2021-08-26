import React from "react";
const Label = ({ htmlFor, className, value }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`form-label${className ? " " + className : ""}`}
    >
      {value}
    </label>
  );
};
export default Label;
