import React from "react";

import "./editor.scss";
import { useEventState } from "../../hooks";

import { Comments, Files, DotInfo, Links, Share, Video } from "./navComponents";
import { Button } from "../";

const EditorWrapper = (props) => {
  const { eventState, eventActions } = useEventState();
  const {
    isEditorOpen: { open, openClass },
    editorType: type,
    isEditorExpand,
    viewPort,
    videoMenuRef,
    videoWrapperPos,
    isVideoMenuOpen,
  } = eventState;
  const { expandCollapse, closeEditor, toggleSidebar } = eventActions;

  if (!viewPort) return null;
  const { xs, sm, md, lg, xl } = viewPort;

  const title =
    type === "files"
      ? "Files"
      : type === "shareToPrivate"
      ? "Share"
      : type === "dotInfo"
      ? "Document Info"
      : type === "links"
      ? "Links"
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
              {!xs && !sm && !md && (
                <Button
                  king="close"
                  icon={isEditorExpand ? "compress" : "expand"}
                  onClick={expandCollapse}
                  className="expand-btn"
                />
              )}
              <Button
                kind="close"
                icon="times"
                onClick={xs ? toggleSidebar : closeEditor}
              />
            </div>
            {title && <h2>{title}</h2>}
          </div>
          {type === "files" && <Files />}
          {type === "dotInfo" && <DotInfo />}
          {type === "comments" && <Comments />}
          {type === "links" && <Links />}
          {type === "shareToPrivate" && <Share />}
        </div>
      )}
      {isVideoMenuOpen && (
        <Video eventState={eventState} eventActions={eventActions} />
      )}
    </>
  );
};

export default EditorWrapper;
