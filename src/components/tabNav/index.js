import React from "react";

import "./tabNav.scss";

const TabNav = (props) => {
  const { tabOption, activeTab, tabAction, children } = props;
  return (
    <>
      <ul className="tab-nav">
        {tabOption &&
          tabOption.map((tab) => (
            <li key={tab.id}>
              <a
                href="/#"
                title={tab.name}
                id={tab.id}
                className={`${tab.id === activeTab ? "active" : ""}`}
                onClick={tabAction}
              >
                {tab.name}
              </a>
            </li>
          ))}
      </ul>
      <div className="tab-content">{children}</div>
    </>
  );
};

export default TabNav;
