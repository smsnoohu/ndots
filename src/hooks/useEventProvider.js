import React, { useReducer } from "react";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  OPEN_EDITOR: "open_editor",
  CLOSE_EDITOR: "close_editor",
  EDITOR_EXPAND: "editor_expand",
  SET_EDITOR_TYPE: "set_editor_type",
  SET_SELECTED_DOT: "set_selected_dot",
};

const initialState = {
  isLoading: false,
  isEditorOpen: {
    open: false,
    openClass: false,
  },
  isEditorExpand: false,
  editorType: "",
  selectedDot: null,
};

const EventContext = React.createContext();

function eventReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    case ACTION_TYPES.OPEN_EDITOR:
      return {
        ...state,
        isEditorOpen: {
          open: true,
          openClass: true,
        },
      };
    case ACTION_TYPES.CLOSE_EDITOR:
      return {
        ...state,
        isEditorOpen: {
          ...state.isEditorExpand,
          [action.payload.key]: false,
        },
      };
    case ACTION_TYPES.EDITOR_EXPAND:
      return {
        ...state,
        isEditorExpand: action.payload,
      };
    case ACTION_TYPES.SET_EDITOR_TYPE:
      return {
        ...state,
        editorType: action.payload,
      };
    case ACTION_TYPES.SET_SELECTED_DOT:
      return {
        ...state,
        selectedDot: action.payload,
      };
    default:
      throw new Error(
        `Unknown action type received.
                    Valid action types are:
                        * UPDATE_STATE
                        * OPEN_EDITOR
                        * CLOSE_EDITOR
                        * EDITOR_EXPAND
                        * SET_EDITOR_TYPE
                        * SET_SELECTED_DOT
                `
      );
  }
}

function EventProvider(props) {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  const openEditor = (e, type = "explore", item) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPES.OPEN_EDITOR });
    dispatch({ type: ACTION_TYPES.SET_EDITOR_TYPE, payload: type });
    dispatch({ type: ACTION_TYPES.SET_SELECTED_DOT, payload: item });
  };

  const closeEditor = () => {
    dispatch({
      type: ACTION_TYPES.CLOSE_EDITOR,
      payload: { key: "openClass" },
    });
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.CLOSE_EDITOR, payload: { key: "open" } });
    }, 600);
    dispatch({ type: ACTION_TYPES.SET_EDITOR_TYPE, payload: "" });
    dispatch({ type: ACTION_TYPES.SET_SELECTED_DOT, payload: "" });
  };

  const value = {
    eventState: { ...state },
    eventActions: {
      openEditor,
      closeEditor,
    },
  };

  return (
    <EventContext.Provider value={value}>
      {props.children}
    </EventContext.Provider>
  );
}

export function useEventState() {
  const context = React.useContext(EventContext);
  if (!context) {
    throw new Error(`useEventState must be use within the EventProvider`);
  }
  return context;
}

export default EventProvider;
