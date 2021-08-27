import React from "react";

import "./editor.scss";
import { useEventState } from "../../hooks";

import { Comments, Files, DotInfo, Links } from "./navComponents";
import { Button } from "../";

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
      ? "Links"
      : type === "comments"
      ? "Comments"
      : "";

  console.log("openopenopen: ", open);

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
              <Button
                king="close"
                icon={isEditorExpand ? "compress" : "expand"}
                onClick={expandCollapse}
              />
              <Button kind="close" icon="times" onClick={closeEditor} />
            </div>
            {title && <h2>{title}</h2>}
          </div>
          {type === "files" && <Files />}
          {type === "dotInfo" && <DotInfo />}
          {type === "comments" && <Comments />}
          {type === "links" && <Links />}
        </div>
      )}
    </>
  );
};

export default EditorWrapper;
