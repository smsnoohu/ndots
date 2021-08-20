import React from "react";

import Editor from "../Editor";

const Notes = (props) => {
  const returnBody = () => (
    <>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
      <p>This is Body</p>
    </>
  );

  const returnFooter = () => <p>This is Footer</p>;

  return <Editor body={returnBody()} footer={returnFooter()} />;
};

export default Notes;
