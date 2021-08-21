import React, { useRef, useEffect } from "react";

import { useEventState } from "../../hooks";

import EditorWrapper from "../editors";

import "./sidebar.scss";

const Sidebar = () => {
  const editorWrapperRef = useRef(null);
  const { eventState, eventActions } = useEventState();
  const {
    isEditorOpen: { open },
    editorType: type,
  } = eventState;
  const { toggleEditor, closeEditor } = eventActions;

  const handleClickOutside = (event) => {
    if (
      editorWrapperRef.current &&
      !editorWrapperRef.current.contains(event.target)
    ) {
      closeEditor();
    }
  };

  // below is the same as componentDidMount and componentDidUnmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
  return (
    <aside ref={editorWrapperRef}>
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
              onClick={(e) => toggleEditor(e, "dots", "123")}
            ></a>
          </li>
          <li>
            <a
              href="#"
              className={`fa fa-bars ${type === "explore" ? "active" : ""}`}
              aria-label="Explore"
              title="Explore"
              onClick={(e) => toggleEditor(e, "explore", "123")}
            ></a>
          </li>
          <li>
            <a
              href="#"
              className={`fa fa-file-alt ${type === "notes" ? "active" : ""}`}
              aria-label="Notes"
              title="Notes"
              onClick={(e) => toggleEditor(e, "notes", "123")}
            ></a>
          </li>
          <li>
            <a
              href="#"
              className={`fa fa-link ${type === "links" ? "active" : ""}`}
              aria-label="Links"
              title="Link"
              onClick={(e) => toggleEditor(e, "links", "123")}
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
              onClick={(e) => toggleEditor(e, "comments", "123")}
            ></a>
          </li>
        </ul>
      </nav>
      <EditorWrapper type="notes" />
    </aside>
  );
};

export default Sidebar;
