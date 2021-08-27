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

  const onClickOutside = (event) => {
    if (
      editorWrapperRef.current &&
      !editorWrapperRef.current.contains(event.target)
    ) {
      closeEditor();
    }
  };

  // below is the same as componentDidMount and componentDidUnmount
  useEffect(() => {
    document.addEventListener("click", onClickOutside, false);
    return () => {
      document.removeEventListener("click", onClickOutside, false);
    };
  }, []);
  return (
    <aside ref={editorWrapperRef}>
      <nav className="sidebar">
        <ul>
          <li>
            <a
              href="#"
              className={`fa fa-folder ${type === "files" ? "active" : ""}`}
              aria-label="Manage files"
              title="Manage files"
              onClick={(e) => toggleEditor(e, "files", "123")}
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
              className={`fa fa-dot-circle ${
                type === "dotInfo" ? "active" : ""
              }`}
              aria-label="Docuemnt Info"
              title="Docuemnt Info"
              onClick={(e) => toggleEditor(e, "dotInfo", "123")}
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
