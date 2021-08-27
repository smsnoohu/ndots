import React from "react";

import { ChromePicker } from "react-color";

import EditorInner from "../../EditorInner";
import { useDotInfo } from "../../../../hooks";
import { Label, Inputbox, Textarea, Checkbox, Button } from "../../../";
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
        <Label htmlFor="dotName" value="Dot Name" />
        <Inputbox
          name="dotName"
          id="dotName"
          value={dotName}
          onChange={updateField}
          placeholder="Maximum 3 words"
        />
      </fieldset>
      <fieldset className="pt-20">
        <Label className="label-block" value="Actions" />
        <div className="btn-group editor-btn-group">
          <div className="bootkmark-wrapper" ref={bookmarkWrapper}>
            <Button icon="star" title="Star" onClick={toggleBookmark} />
            {isBookmarkOpen && (
              <div className="bookmark-container">
                <h4>Select Tag</h4>
                <div className="input-group">
                  <Inputbox
                    name="bookmark"
                    value={bookmark}
                    onChange={updateField}
                    autoComplete="off"
                  />
                  <Button
                    kind="primary"
                    className="btn-sm"
                    icon="plus"
                    onClick={addBookmarkList}
                    disabled={!bookmark}
                  />
                </div>
                <ul className="bookmark-list">
                  {bookmarkList &&
                    bookmarkList.length &&
                    bookmarkList.map((item) => (
                      <li key={item.id}>
                        <Checkbox
                          name={item.id}
                          id={item.id}
                          checked={item.isSelected}
                          onChange={updateBookmark}
                          label={item.name}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
          <Button icon="clone" title="Clone" />
          <Button className="fa2" icon="add-image" title="Add Image" />
          <Button className="fa2" icon="remove-image" title="Remove Image" />
          <Button icon="trash" title="Delete" />
          <div ref={colorPickerWrapper}>
            <Button
              icon="square-full"
              title="Color Picker"
              style={{ color: pickedColor, backgroundColor: pickedColor }}
              onClick={toggleColorPicker}
            />
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
        <Label htmlFor="link" value="Link" />
        <Inputbox
          type="url"
          name="link"
          id="link"
          value={link}
          onChange={updateField}
          placeholder="http://"
        />
      </fieldset>
      <fieldset className="pt-20 additional-info">
        <Label htmlFor="info" value="Additional Information" />
        <Textarea
          name="info"
          id="info"
          value={additionalInfo}
          onChange={updateField}
          placeholder="Additional Info..."
        />
      </fieldset>
      <Button
        kind="secondary"
        className="suggesions-btn"
        onClick={toggleSuggestion}
        value="Suggestions"
      />
      {isSuggestionOpen && renderSuggestions()}
    </div>
  );
  return <EditorInner body={returnBody()} />;
};

export default DotInfo;
