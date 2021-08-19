import React from "react";

import "./sidebar.scss";

const Sidebar = () => {
  return (
    <aside>
      <nav className="sidebar">
        <ul>
          <li>
            <a
              href="#"
              className="fa fa-file-medical"
              aria-label="Add New Document"
              title="Add New Document"
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
              className="fa fa-file-alt"
              aria-label="Notes"
              title="Notes"
            ></a>
          </li>
          <li>
            <a
              href="#"
              className="fa fa-comment-alt"
              aria-label="Comments"
              title="Comments"
            ></a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
