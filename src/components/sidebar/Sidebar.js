import React from "react";

import { useEventState } from "../../hooks";

import EditorWrapper from "../editors";

import "./sidebar.scss";

const Sidebar = () => {
  const { eventState, eventActions } = useEventState();
  const {
    isEditorOpen: { open },
    editorType: type,
  } = eventState;
  const { openEditor } = eventActions;
  return (
    <aside>
      <nav className="sidebar">
        <ul>
          <li>
            <a
              href="#"
              className={`fa fa-file-medical ${
                type === "dots" ? "active" : ""
              }`}
              aria-label="Add New Document"
              title="Add New Document"
              onClick={(e) => openEditor(e, "dots", "123")}
            ></a>
          </li>
          <li>
            <a
              href="#"
              className="fa fa-home"
              aria-label="Home"
              title="Home"
            ></a>
          </li>
          <li>
            <a
              href="#"
              className={`fa fa-file-alt ${type === "notes" ? "active" : ""}`}
              aria-label="Notes"
              title="Notes"
              onClick={(e) => openEditor(e, "notes", "123")}
            ></a>
          </li>
          <li>
            <a
              href="#"
              className={`fa fa-link ${type === "links" ? "active" : ""}`}
              aria-label="Links"
              title="Link"
              onClick={(e) => openEditor(e, "links", "123")}
            ></a>
          </li>
          <li>
            <a
              href="#"
              className={`fa fa-comment-alt ${
                type === "comments" ? "active" : ""
              }`}
              aria-label="Comments"
              title="Comments"
              onClick={(e) => openEditor(e, "comments", "123")}
            ></a>
          </li>
        </ul>
      </nav>
      <EditorWrapper type="notes" />
    </aside>
  );
};

export default Sidebar;
