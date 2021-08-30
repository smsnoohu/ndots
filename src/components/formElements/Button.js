import React from "react";

const Button = ({
  type,
  id,
  className,
  kind,
  name,
  value,
  children,
  onClick,
  disabled,
  target,
  iconPlace,
  icon,
  iconType,
  style,
  title,
}) => {
  return (
    <button
      type={type ? type : "button"}
      style={style}
      className={`btn${kind ? " btn-" + kind : ""}${
        className ? " " + className : ""
      }${!value && !children && icon ? " fa fa-" + icon : ""}${
        !value && !children && iconType ? " " + iconType : ""
      }`}
      name={name}
      id={id}
      onClick={onClick}
      data-target={target}
      disabled={disabled}
      aria-label={title ? title : value}
      title={title ? title : value}
    >
      {(value || children) && icon && iconPlace !== "right" && (
        <em
          className={`fa${iconType ? " " + iconType : ""} fa-${icon} icon-left`}
        ></em>
      )}
      {!children && value && value}
      {children && children}
      {(value || children) && icon && iconPlace === "right" && (
        <em
          className={`fa${
            iconType ? " " + iconType : ""
          } fa-${icon} icon-right`}
        ></em>
      )}
    </button>
  );
};

export default Button;
