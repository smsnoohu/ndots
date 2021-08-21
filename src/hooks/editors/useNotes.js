import { useReducer } from "react";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  TOGGLE_PICKER: "toggle_picker",
  CLOSE_PICKER: "close_picker",
  UPDATE_COLOR: "update_color",
};

const initialState = {
  isLoading: false,
  isColorPickerOpen: false,
  pickedColor: "#fff",
};

function noteReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    case ACTION_TYPES.TOGGLE_PICKER:
      return {
        ...state,
        isColorPickerOpen: !state.isColorPickerOpen,
      };
    case ACTION_TYPES.CLOSE_PICKER:
      return {
        ...state,
        isColorPickerOpen: false,
      };
    case ACTION_TYPES.UPDATE_COLOR:
      return {
        ...state,
        pickedColor: action.payload,
      };
    default:
      throw new Error(
        `Unknown action type received.
                    Valid action types are:
                        * UPDATE_STATE
                        * TOGGLE_PICKER
                        * CLOSE_PICKER
                        * UPDATE_COLOR
                `
      );
  }
}

function useNotes() {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  const toggleColorPicker = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_PICKER });
  };

  const closeColorPicker = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_PICKER });
  };

  const handleColorPicker = (color) => {
    dispatch({ type: ACTION_TYPES.UPDATE_COLOR, payload: color.hex });
  };

  const value = {
    noteState: { ...state },
    noteActions: {
      toggleColorPicker,
      closeColorPicker,
      handleColorPicker,
    },
  };

  return value;
}

export default useNotes;
