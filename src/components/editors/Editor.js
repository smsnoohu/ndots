import React from "react";

const Editor = (props) => {
  const { body, footer } = props;

  return (
    <>
      <div className="editor-body">{body}</div>
      <div className="editor-footer">{footer}</div>
    </>
  );
};

export default Editor;
