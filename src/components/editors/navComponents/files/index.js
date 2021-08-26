import React from "react";

import { useTab, useMyFiles } from "../../../../hooks";
import EditorInner from "../../EditorInner";
import { TabNav, Button, Inputbox } from "../../../";
import { MyFiles } from "./tabs";

import { FILES_TAB_ID, FILES_TAB } from "../../../../constants/constants";

const Files = () => {
  const { activeTab, tabOption, tabAction } = useTab(
    FILES_TAB,
    FILES_TAB_ID.FILES_ID
  );
  const { fileState, fileActions } = useMyFiles();
  const { fileName } = fileState;
  const { findFile } = fileActions;
  const returnBody = () => (
    <>
      <div className="file-container-header">
        <div className="input-group pb-10">
          <Button kind="primary" icon="plus" value="New" />
          <Inputbox
            name="find"
            id="find"
            placeholder="Find file"
            value={fileName}
            handleChange={findFile}
          />
          <Button kind="secondary" icon="search" />
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
