import { useReducer, useRef, useEffect } from "react";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  UPDATE_COLOR: "update_color",
  CLOSE_PICKER: "close_picker",
  UPDATE_COLOR: "update_color",
  SET_COLOR_PICKER_POSITION: "set_color_picker_position",
  SET_ACTIVE_PICKER: "set_action_picker",
};

const colorPickers = [
  {
    id: "backgroundColor",
    name: "Background Color",
  },
  {
    id: "linkColor",
    name: "Link Color",
  },
  {
    id: "linkHoverColor",
    name: "Link Hover Color",
  },
  {
    id: "nodeColor",
    name: "Node Color",
  },
  {
    id: "nodeHoverColor",
    name: "Node Hover Color",
  },
  {
    id: "draglineColor",
    name: "Dragline Color",
  },
];

const initialState = {
  isLoading: false,
  isColorPickerOpen: false,
  pickedColor: {},
  colorPickers,
  colorPickerPosition: {},
  activePicker: "",
};

function settingsReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    case ACTION_TYPES.TOGGLE_PICKER:
      return {
        ...state,
        isColorPickerOpen: true,
      };
    case ACTION_TYPES.CLOSE_PICKER:
      return {
        ...state,
        isColorPickerOpen: false,
      };
    case ACTION_TYPES.UPDATE_COLOR:
      return {
        ...state,
        pickedColor: {
          ...state.pickedColor,
          [state.activePicker]: action.payload,
        },
      };
    case ACTION_TYPES.SET_COLOR_PICKER_POSITION:
      return {
        ...state,
        colorPickerPosition: {
          left: action.payload.left,
          top: action.payload.top,
        },
      };
    case ACTION_TYPES.SET_ACTIVE_PICKER:
      return {
        ...state,
        activePicker: action.payload,
      };
    default:
      throw new Error(
        `Unknown action type received.
                      Valid action types are:
                          * UPDATE_STATE
                          * TOGGLE_PICKER
                          * CLOSE_PICKER
                          * UPDATE_COLOR
                          * SET_COLOR_PICKER_POSITION
                          * SET_ACTIVE_PICKER
                  `
      );
  }
}

function useSettings() {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  const colorPickerWrapper = useRef(null);

  const updatePosition = (e) => {
    const postion = e.currentTarget.getBoundingClientRect();
    dispatch({
      type: ACTION_TYPES.SET_COLOR_PICKER_POSITION,
      payload: { top: postion.top - 85, left: 0 },
    });
  };

  const toggleColorPicker = (e) => {
    updatePosition(e);
    dispatch({ type: ACTION_TYPES.TOGGLE_PICKER });
    dispatch({ type: ACTION_TYPES.SET_ACTIVE_PICKER, payload: e.target.id });
  };

  const closeColorPicker = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_PICKER });
  };

  const handleColorPicker = (color) => {
    dispatch({ type: ACTION_TYPES.UPDATE_COLOR, payload: color.hex });
  };

  const handleOutsideClick = (event) => {
    // Color Picker
    if (
      colorPickerWrapper.current &&
      !colorPickerWrapper.current.contains(event.target) &&
      !event.target.classList.contains("settingsColorPicker")
    ) {
      closeColorPicker();
    }
  };

  useEffect(() => {
    const closeBaloonOnClickOutside = () => {
      document.addEventListener("click", handleOutsideClick, false);
      return () => {
        document.removeEventListener("click", handleOutsideClick, false);
      };
    };

    closeBaloonOnClickOutside();
  }, []);

  const value = {
    shareState: {
      ...state,
      colorPickerWrapper,
    },
    shareActions: {
      toggleColorPicker,
      closeColorPicker,
      handleColorPicker,
    },
  };

  return value;
}

export default useSettings;
