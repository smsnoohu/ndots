import React from "react";

import EditorInner from "../../EditorInner";
import { Label, Inputbox, Textarea, Button } from "../../../";

const Comments = (props) => {
  // const { noteState, noteActions } = useNotes();

  // const { title } = noteState;
  // const { updateField } = noteActions;
  const returnBody = () => (
    <>
      <fieldset>
        <Label htmlFor="title" value="Title" />
        <Inputbox
          name="title"
          id="title"
          // value={title}
          // onChange={updateField}
          placeholder="Enter your dot title"
        />
      </fieldset>
      <fieldset className="pt-20">
        <Label htmlFor="comments" value="Comments" />
        <Textarea
          name="comments"
          id="comments"
          // value={title}
          // onChange={updateField}
          placeholder="Comments..."
        />
      </fieldset>
    </>
  );

  const returnFooter = () => (
    <>
      <Button king="secondary">Cancel</Button>
      <Button className="primary">Submit</Button>
    </>
  );

  return <EditorInner body={returnBody()} footer={returnFooter()} />;
};

export default Comments;
