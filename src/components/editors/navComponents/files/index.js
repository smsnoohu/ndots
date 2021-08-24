import React from "react";

import EditorInner from "../../EditorInner";
import { TabNav } from "../../../";

import { FILES_TAB_ID, FILES_TAB } from "../../../../constants/constants";

const Files = () => {
  const returnBody = () => (
    <>
      <TabNav initialActiveTab={FILES_TAB_ID.FILES_ID} tabList={FILES_TAB} />
    </>
  );
  return <EditorInner body={returnBody()} />;
};

export default Files;
