import React from "react";

import { ChromePicker } from "react-color";

import Editor from "../Editor";
import { useNotes } from "../../../hooks";

const Notes = (props) => {
  const { noteState, noteActions } = useNotes();

  const { isColorPickerOpen, pickedColor, title } = noteState;
  const {
    toggleColorPicker,
    closeColorPicker,
    handleColorPicker,
    updateField,
  } = noteActions;
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
        <label htmlFor="title" className="form-label label-block">
          Actions
        </label>
        <div className="btn-group editor-btn-group">
          <button className="btn fa fa-star" aria-label="Star"></button>
          <button className="btn fa fa-clone" aria-label="Clone"></button>
          <button
            className="btn fa fa2 fa-add-image"
            aria-label="Add Image"
          ></button>
          <button
            className="btn fa fa2 fa-remove-image"
            aria-label="Remove Image"
          ></button>
          <button className="btn fa fa-trash" aria-label="Delete"></button>
          <button
            className="btn fa fa-square-full"
            aria-label="Color Picker"
            style={{ color: pickedColor, backgroundColor: pickedColor }}
            onClick={toggleColorPicker}
          ></button>
          {isColorPickerOpen ? (
            <div className="popover">
              <div className="cover" onClick={closeColorPicker} />
              <ChromePicker color={pickedColor} onChange={handleColorPicker} />
            </div>
          ) : null}
        </div>
      </fieldset>
      <fieldset className="pt-20">
        <label htmlFor="link" className="form-label">
          Link
        </label>
        <input
          className="form-control"
          type="url"
          name="link"
          id="link"
          value={title}
          onChange={updateField}
          placeholder="http://"
        />
      </fieldset>
      <fieldset className="pt-20">
        <label htmlFor="notes" className="form-label">
          Notes
        </label>
        <textarea
          className="form-control"
          name="notes"
          id="notes"
          value={title}
          onChange={updateField}
          placeholder="Notes..."
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

export default Notes;
