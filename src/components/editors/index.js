import React from "react";

import "./editor.scss";
import { useEventState } from "../../hooks";

import Notes from "./notes";

const EditorWrapper = (props) => {
  const { eventState, eventActions } = useEventState();
  const {
    isEditorOpen: { open, openClass },
    editorType: type,
  } = eventState;
  const { closeEditor } = eventActions;

  console.log("type: ", type);

  const title =
    type === "notes"
      ? "Notes"
      : type === "dots"
      ? "Dots"
      : type === "links"
      ? "Add Links"
      : type === "comments"
      ? "Comments"
      : "";

  return (
    <>
      {open && (
        <div className={`editor-wrapper ${openClass ? "open" : ""}`}>
          <div className="editor-header">
            <div className="editor-close-btn-container">
              <button
                className="btn btn-close fa fa-expand"
                onClick={closeEditor}
              ></button>
              <button
                className="btn btn-close fa fa-times"
                onClick={closeEditor}
              ></button>
            </div>
            {title && <h2>{title}</h2>}
          </div>
          <Notes />
        </div>
      )}
    </>
  );
};

export default EditorWrapper;
