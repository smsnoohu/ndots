import React from "react";

import "./editor.scss";
import { useEventState } from "../../hooks";

import { Comments, Files, DotInfo } from "./navComponents";

const EditorWrapper = (props) => {
  const { eventState, eventActions } = useEventState();
  const {
    isEditorOpen: { open, openClass },
    editorType: type,
    isEditorExpand,
  } = eventState;
  const { expandCollapse, closeEditor } = eventActions;

  const title =
    type === "files"
      ? "Files"
      : type === "explore"
      ? "Explore"
      : type === "dotInfo"
      ? "Document Info"
      : type === "links"
      ? "Add Links"
      : type === "comments"
      ? "Comments"
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
          {type === "files" && <Files />}
          {type === "dotInfo" && <DotInfo />}
          {type === "comments" && <Comments />}
        </div>
      )}
    </>
  );
};

export default EditorWrapper;
