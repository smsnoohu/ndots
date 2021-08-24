import React, { useState } from "react";

const useTab = (tabs, initialActiveTab = "") => {
  const [tabOption, setTabOption] = useState(tabs);
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const tabAction = (e) => {
    e.preventDefault();
    const { id } = e.target;
    const updatedTabState = tabOption.map((tab) => {
      tab.id === id ? (tab.isActive = true) : (tab.isActive = false);
      return tab;
    });
    setActiveTab(id);
    setTabOption(updatedTabState);
  };

  const value = {
    activeTab,
    tabOption,
    tabAction,
  };

  return value;
};

export default useTab;
