import React from "react";

import "./editor.scss";
import { useEventState } from "../../hooks";

import Notes from "./notes";
import Comments from "./comments";

const EditorWrapper = (props) => {
  const { eventState, eventActions } = useEventState();
  const {
    isEditorOpen: { open, openClass },
    editorType: type,
    isEditorExpand,
  } = eventState;
  const { expandCollapse, closeEditor, setEditorRef } = eventActions;

  const title =
    type === "notes"
      ? "Notes"
      : type === "dots"
      ? "Dots"
      : type === "links"
      ? "Add Links"
      : type === "comments"
      ? "Comments"
      : type === "explore"
      ? "Explore"
      : "";

  return (
    <>
      {open && (
        <div
          className={`editor-wrapper ${openClass ? "open" : ""} ${
            isEditorExpand ? "expand" : ""
          }`}
        >
          <div className="editor-header">
            <div className="editor-close-btn-container">
              <button
                className={`btn btn-close fa ${
                  isEditorExpand ? "fa-compress" : "fa-expand"
                }`}
                onClick={expandCollapse}
              ></button>
              <button
                className="btn btn-close fa fa-times"
                onClick={closeEditor}
              ></button>
            </div>
            {title && <h2>{title}</h2>}
          </div>
          {type === "notes" && <Notes />}
          {type === "comments" && <Comments />}
        </div>
      )}
    </>
  );
};

export default EditorWrapper;
