import React from "react";

import { ChromePicker } from "react-color";

import { useEventState, useSettings } from "../../../hooks";
import { Button } from "../../../components";

import "./settings.scss";

const Settings = (props) => {
  const { eventState, eventActions } = useEventState();
  const { shareState, shareActions } = useSettings();
  const { viewPort, isSettingsOpen, settingsWrapperRef } = eventState;
  const { toggleSettings } = eventActions;

  const {
    isColorPickerOpen,
    pickedColor,
    colorPickerWrapper,
    colorPickers,
    activePicker,
    colorPickerPosition,
  } = shareState;
  const { toggleColorPicker, handleColorPicker } = shareActions;

  if (!viewPort) return null;
  const { xs, sm, md, lg, xl } = viewPort;

  return (
    <>
      {!xs && !sm && (
        <div className="setting-wrapper" ref={settingsWrapperRef}>
          <Button
            icon="cog"
            kind="secondary"
            className={`setting-icon ${isSettingsOpen ? "open" : ""}`}
            onClick={toggleSettings}
          />
          {isSettingsOpen && (
            <div className="setting-container">
              <h2>Settings</h2>
              <ul className="settings-list">
                {colorPickers.map((picker) => (
                  <li key={picker.id}>
                    <span>{picker.name}</span>
                    <Button
                      icon="square-full"
                      title={`${picker.name} picker`}
                      id={picker.id}
                      className="settingsColorPicker"
                      style={{
                        color: pickedColor[picker.id],
                        backgroundColor: pickedColor[picker.id],
                      }}
                      onClick={toggleColorPicker}
                    />
                  </li>
                ))}
              </ul>
              {isColorPickerOpen ? (
                <div
                  className="popover"
                  style={colorPickerPosition}
                  ref={colorPickerWrapper}
                >
                  <ChromePicker
                    color={pickedColor[activePicker]}
                    id="test"
                    onChange={handleColorPicker}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Settings;
