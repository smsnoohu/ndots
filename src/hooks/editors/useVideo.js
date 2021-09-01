import { useReducer, useRef, useEffect } from "react";

import { generateID, validateEmail } from "../../utilities/common";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  SET_VIDEO_WRAPPER_POSITION: "set_video_wrapper_position",
  TOGGLE_DRAGGING: "toggle_dragging",
  TOGGLE_VIDEO_WRAPPER: "toggle_video_wrapper",
  SET_STYLES: "set_style",
};

const initialState = {
  isLoading: false,
  videoPosition: {
    diffX: 0,
    diffY: 0,
    isDragging: false,
    styles: {},
  },
  //   isDragging: false,
  isVideoMinimize: false,
};

function videoReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    case ACTION_TYPES.SET_VIDEO_WRAPPER_POSITION:
      return {
        ...state,
        videoPosition: {
          ...state.videoPosition,
          diffX: action.payload.left,
          diffY: action.payload.top,
          isDragging: true,
        },
      };
    case ACTION_TYPES.TOGGLE_DRAGGING:
      return {
        ...state,
        videoPosition: {
          ...state.videoPosition,
          isDragging: false,
        },
      };
    case ACTION_TYPES.TOGGLE_VIDEO_WRAPPER:
      return {
        ...state,
        isVideoMinimize: !state.isVideoMinimize,
      };
    case ACTION_TYPES.SET_STYLES:
      return {
        ...state,
        videoPosition: {
          ...state.videoPosition,
          styles: { left: action.payload.left, top: action.payload.top },
        },
      };
    default:
      throw new Error(
        `Unknown action type received.
                      Valid action types are:
                          * UPDATE_STATE
                          * SET_VIDEO_WRAPPER_POSITION
                          * TOGGLE_DRAGGING
                          * TOGGLE_VIDEO_WRAPPER
                          * SET_STYLES
                  `
      );
  }
}

function useVideo(defaultPosition) {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  const {
    videoPosition: { diffX, diffY, isDragging },
  } = state;

  useEffect(() => {
    const setVideoDefaultPosition = () => {
      const { left, top } = defaultPosition;
      dispatch({ type: ACTION_TYPES.SET_STYLES, payload: { left, top } });
    };
    defaultPosition &&
      defaultPosition.left &&
      defaultPosition.top &&
      setVideoDefaultPosition();
  }, [defaultPosition]);

  const dragStart = (e) => {
    const left = e.screenX - e.currentTarget.getBoundingClientRect().left;
    const top = e.screenY - e.currentTarget.getBoundingClientRect().top;
    dispatch({
      type: ACTION_TYPES.SET_VIDEO_WRAPPER_POSITION,
      payload: { left, top },
    });
  };

  const dragging = (e) => {
    if (isDragging) {
      const top = e.screenY - diffY;
      const left = e.screenX - diffX;
      dispatch({ type: ACTION_TYPES.SET_STYLES, payload: { left, top } });
    }
  };

  const dragEnd = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_DRAGGING, payload: false });
  };

  const value = {
    videoState: {
      ...state,
    },
    videoActions: {
      dragStart,
      dragging,
      dragEnd,
    },
  };

  return value;
}

export default useVideo;
