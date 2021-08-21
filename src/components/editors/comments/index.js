import React from "react";

import Editor from "../Editor";
import { useNotes } from "../../../hooks";

const Comments = (props) => {
  const { noteState, noteActions } = useNotes();

  const { title } = noteState;
  const { updateField } = noteActions;
  const returnBody = () => (
    <>
      <fieldset>
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          className="form-control"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={updateField}
          placeholder="Enter your dot title"
        />
      </fieldset>
      <fieldset className="pt-20">
        <label htmlFor="comments" className="form-label">
          Comments
        </label>
        <textarea
          className="form-control"
          name="comments"
          id="comments"
          value={title}
          onChange={updateField}
          placeholder="Comments..."
          cols=""
          row=""
        />
      </fieldset>
    </>
  );

  const returnFooter = () => (
    <>
      <button className="btn btn-secondary">Cancel</button>
      <button className="btn btn-primary">Submit</button>
    </>
  );

  return <Editor body={returnBody()} footer={returnFooter()} />;
};

export default Comments;
