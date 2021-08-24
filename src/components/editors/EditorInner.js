import React from "react";

const EditorInner = (props) => {
  const { body, footer } = props;

  return (
    <>
      <div className="editor-body">{body}</div>
      {footer && <div className="editor-footer">{footer}</div>}
    </>
  );
};

export default EditorInner;
