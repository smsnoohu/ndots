import React from "react";

import { useEventState } from "../../hooks";

import EditorWrapper from "../editors";
import { Settings } from "../";

import "./sidebar.scss";

const Sidebar = () => {
  const { eventState, eventActions } = useEventState();
  const {
    isEditorOpen: { open },
    editorType: type,
    editorWrapperRef,
    breakPoint,
    viewPort,
    isSidebarOpen,
    videoMenuRef,
    isVideoMenuOpen,
  } = eventState;
  const { toggleEditor, toggleVideoMenu } = eventActions;

  if (!viewPort) return null;
  const { xs, sm, md, lg, xl } = viewPort;

  return (
    <>
      {(!xs || (xs && isSidebarOpen)) && (
        <>
          <aside ref={editorWrapperRef}>
            <nav className="sidebar">
              <ul>
                <li>
                  <a
                    href="#"
                    className={`fa fa-dot-circle ${
                      type === "dotInfo" ? "active" : ""
                    }`}
                    aria-label="Document Info"
                    title="Document Info"
                    onClick={(e) => toggleEditor(e, "dotInfo", "123")}
                  >
                    <span>Document Info</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`fa fa-folder ${
                      type === "files" ? "active" : ""
                    }`}
                    aria-label="Manage files"
                    title="Manage files"
                    onClick={(e) => toggleEditor(e, "files", "123")}
                  >
                    <span>Manage files</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`fa fa-link ${type === "links" ? "active" : ""}`}
                    aria-label="Links"
                    title="Links"
                    onClick={(e) => toggleEditor(e, "links", "123")}
                  >
                    <span>Links</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`fa fa-share-alt ${
                      type === "shareToPrivate" ? "active" : ""
                    }`}
                    aria-label="Share"
                    title="Share"
                    onClick={(e) => toggleEditor(e, "shareToPrivate", "123")}
                  >
                    <span>Share</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`fa fa-comment-alt ${
                      type === "comments" ? "active" : ""
                    }`}
                    aria-label="Comments"
                    title="Comments"
                    onClick={(e) => toggleEditor(e, "comments", "123")}
                  >
                    <span>Comments</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    ref={videoMenuRef}
                    className={`fa fa-video ${
                      type === "video" ? "active" : ""
                    } ${isVideoMenuOpen ? "videoOpen" : ""}`}
                    aria-label="Record"
                    title="Record"
                    onClick={(e) => toggleVideoMenu(e, "video")}
                  >
                    <span>Record</span>
                  </a>
                </li>
              </ul>
            </nav>
            <EditorWrapper />
          </aside>
          <Settings />
        </>
      )}
    </>
  );
};

export default Sidebar;
