import React from "react";

import { Button } from "../../../../components";
import { useVideo } from "../../../../hooks";
import "./video.scss";

const Video = (props) => {
  const { eventState, eventActions } = props;
  const { videoWrapperPos, isVideoExpand } = eventState;
  const { toggleVideoMenu, toggleVideoExpand } = eventActions;
  const { videoState, videoActions } = useVideo(videoWrapperPos);
  const {
    videoPosition: { styles },
  } = videoState;
  const { dragStart, dragging, dragEnd } = videoActions;
  return (
    <div
      className="video-wrapper"
      style={styles}
      onMouseDown={dragStart}
      onMouseMove={dragging}
      onMouseUp={dragEnd}
    >
      <div className="video-header">
        <h2 data-remove="true">Record</h2>
        <Button
          icon={`${isVideoExpand ? "window-minimize" : "window-maximize"}`}
          onClick={toggleVideoExpand}
        />
        <Button icon="times" onClick={(e) => toggleVideoMenu(e, "video")} />
      </div>
      {isVideoExpand && <div className="video-container"></div>}
      <div className="video-footer">
        <div className="video-controls">
          <Button icon="stop-circle" />
          <Button icon="microphone-alt" />
          <Button icon="video" />
        </div>
      </div>
    </div>
  );
};

export default Video;
