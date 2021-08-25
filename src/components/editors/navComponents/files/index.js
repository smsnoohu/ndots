import React from "react";

import { useTab } from "../../../../hooks";
import EditorInner from "../../EditorInner";
import { TabNav } from "../../../";
import { MyFiles } from "./tabs";

import { FILES_TAB_ID, FILES_TAB } from "../../../../constants/constants";

const Files = () => {
  const { activeTab, tabOption, tabAction } = useTab(
    FILES_TAB,
    FILES_TAB_ID.FILES_ID
  );
  const returnBody = () => (
    <>
      <div className="file-container-header">
        <div className="input-group pb-10">
          <button className="btn btn-primary fa fa-plus"> New</button>
          <input type="text" name="find" id="find" className="form-control" />
          <button className="btn btn-secondary fa fa-search" />
        </div>
      </div>
      <TabNav tabOption={tabOption} tabAction={tabAction} activeTab={activeTab}>
        {activeTab === FILES_TAB_ID.FILES_ID && <MyFiles />}
      </TabNav>
    </>
  );
  return <EditorInner body={returnBody()} />;
};

export default Files;
