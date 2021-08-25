import React from "react";

import { ChromePicker } from "react-color";

import EditorInner from "../../EditorInner";
import { useDotInfo } from "../../../../hooks";
import "./dotInfo.scss";
import suggetionImg from "../../../../assets/images/logo.png";

const DotInfo = (props) => {
  const { dotState, dotActions } = useDotInfo();

  const {
    isColorPickerOpen,
    pickedColor,
    isSuggestionOpen,
    colorPickerWrapper,
    suggesionsWrapper,
    bookmarkWrapper,
    isBookmarkOpen,
    bookmarkList,
    dotInfoFields: { dotName, bookmark, link, additionalInfo },
  } = dotState;
  const {
    toggleColorPicker,
    handleColorPicker,
    updateField,
    toggleSuggestion,
    addBookmarkList,
    updateBookmark,
    toggleBookmark,
  } = dotActions;

  const renderSuggestions = () => (
    <div className="suggestion-container">
      <ul className="suggestion-list">
        <li>
          <img src={suggetionImg} alt="Physics" />
          <h4>Physics</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt​
          </p>
        </li>
        <li>
          <img src={suggetionImg} alt="Physics" />
          <h4>Physics</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt​
          </p>
        </li>
        <li>
          <img src={suggetionImg} alt="Physics" />
          <h4>Physics</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt​
          </p>
        </li>
        <li>
          <img src={suggetionImg} alt="Physics" />
          <h4>Physics</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt​
          </p>
        </li>
        <li>
          <img src={suggetionImg} alt="Physics" />
          <h4>Physics</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt​
          </p>
        </li>
      </ul>
    </div>
  );
  const returnBody = () => (
    <div className="dot-info-container" ref={suggesionsWrapper}>
      <fieldset>
        <label htmlFor="dotName" className="form-label">
          Dot Name
        </label>
        <input
          className="form-control"
          type="text"
          name="dotName"
          id="dotName"
          value={dotName}
          onChange={updateField}
          placeholder="Maximum 3 words"
        />
      </fieldset>
      <fieldset className="pt-20">
        <label className="form-label label-block">Actions</label>
        <div className="btn-group editor-btn-group">
          <div className="bootkmark-wrapper" ref={bookmarkWrapper}>
            <button
              className="btn fa fa-star"
              aria-label="Star"
              onClick={toggleBookmark}
            ></button>
            {isBookmarkOpen && (
              <div className="bookmark-container">
                <h4>Select Tag</h4>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="bookmark"
                    value={bookmark}
                    onChange={updateField}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm fa fa-plus"
                    onClick={addBookmarkList}
                    disabled={!bookmark}
                  />
                </div>
                <ul className="bookmark-list">
                  {bookmarkList &&
                    bookmarkList.length &&
                    bookmarkList.map((item) => (
                      <li className="custom-check" key={item.id}>
                        <input
                          type="checkbox"
                          name={item.id}
                          id={item.id}
                          checked={item.isSelected}
                          onChange={updateBookmark}
                        />
                        <label htmlFor={item.id}>{item.name}</label>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
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
          <div ref={colorPickerWrapper}>
            <button
              className="btn fa fa-square-full"
              aria-label="Color Picker"
              style={{ color: pickedColor, backgroundColor: pickedColor }}
              onClick={toggleColorPicker}
            ></button>
            {isColorPickerOpen ? (
              <div className="popover">
                <ChromePicker
                  color={pickedColor}
                  onChange={handleColorPicker}
                />
              </div>
            ) : null}
          </div>
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
          value={link}
          onChange={updateField}
          placeholder="http://"
        />
      </fieldset>
      <fieldset className="pt-20 additional-info">
        <label htmlFor="info" className="form-label">
          Additional Information
        </label>
        <textarea
          className="form-control"
          name="info"
          id="info"
          value={additionalInfo}
          onChange={updateField}
          placeholder="Additional Info..."
          cols=""
          row=""
        />
      </fieldset>
      <button
        className="btn btn-secondary suggesions-btn"
        onClick={toggleSuggestion}
      >
        Suggestions
      </button>
      {isSuggestionOpen && renderSuggestions()}
    </div>
  );
  return <EditorInner body={returnBody()} />;
};

export default DotInfo;
