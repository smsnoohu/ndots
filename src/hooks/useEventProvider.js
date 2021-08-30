import React, { useReducer, useRef, useEffect } from "react";

import { useBreakpoint } from "./";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  TOGGLE_EDITOR: "toggle_editor",
  OPEN_EDITOR: "open_editor",
  CLOSE_EDITOR: "close_editor",
  EDITOR_EXPAND: "editor_expand",
  SET_EDITOR_TYPE: "set_editor_type",
  SET_SELECTED_DOT: "set_selected_dot",
  TOGGLE_SIDEBAR_OPEN: "toggle_sidebar_open",
  TOGGLE_SEARCH: "toggle_search",
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
  isSidebarOpen: false,
  isSearchOpen: false,
};

const EventContext = React.createContext();

function eventReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    case ACTION_TYPES.TOGGLE_EDITOR:
      return {
        ...state,
        isEditorOpen: {
          open: action.payload.open,
          openClass: action.payload.openClass,
        },
        editorType: action.payload.type,
        selectedDot: action.payload.item,
        isEditorExpand: false,
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
        isEditorExpand: !state.isEditorExpand,
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
    case ACTION_TYPES.TOGGLE_SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    case ACTION_TYPES.TOGGLE_SEARCH:
      return {
        ...state,
        isSearchOpen: !state.isSearchOpen,
      };
    default:
      throw new Error(
        `Unknown action type received.
                    Valid action types are:
                        * UPDATE_STATE
                        * TOGGLE_EDITOR
                        * OPEN_EDITOR
                        * CLOSE_EDITOR
                        * EDITOR_EXPAND
                        * SET_EDITOR_TYPE
                        * SET_SELECTED_DOT
                        * TOGGLE_SIDEBAR_OPEN
                        * TOGGLE_SEARCH
                `
      );
  }
}

function EventProvider(props) {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  const editorWrapperRef = useRef(null);

  const { breakPoint, viewPort } = useBreakpoint();

  const {
    isEditorOpen: { open, openClass },
    editorType,
    isSidebarOpen,
  } = state;

  const toggleEditor = (e, type, item) => {
    e.preventDefault();
    dispatch({
      type: ACTION_TYPES.TOGGLE_EDITOR,
      payload: {
        open: type !== editorType ? true : !open,
        openClass: type !== editorType ? true : !openClass,
        type: type !== editorType ? type : "",
        item: type !== editorType ? item : "",
      },
    });
  };

  const openEditor = (e, type = "shareToPrivate", item) => {
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
    // setTimeout(() => {
    //   dispatch({
    //     type: ACTION_TYPES.CLOSE_EDITOR,
    //     payload: { key: "open" },
    //   });
    // }, 2000);
    dispatch({
      type: ACTION_TYPES.CLOSE_EDITOR,
      payload: { key: "open" },
    });
    dispatch({ type: ACTION_TYPES.SET_EDITOR_TYPE, payload: "" });
    dispatch({ type: ACTION_TYPES.SET_SELECTED_DOT, payload: "" });
  };

  const expandCollapse = () => {
    dispatch({ type: ACTION_TYPES.EDITOR_EXPAND });
  };

  const onClickOutside = (event) => {
    if (
      editorWrapperRef.current &&
      !editorWrapperRef.current.contains(event.target)
    ) {
      closeEditor();
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutside, false);
    return () => {
      document.removeEventListener("click", onClickOutside, false);
    };
  }, []);

  const toggleSidebar = () => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_SIDEBAR_OPEN,
      payload: !isSidebarOpen,
    });
  };

  const closeSidebar = () => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_SIDEBAR_OPEN,
      payload: false,
    });
  };

  const toggleSearch = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_SEARCH });
  };

  const value = {
    breakPoint,
    viewPort,
    eventState: { ...state, editorWrapperRef, breakPoint, viewPort },
    eventActions: {
      toggleEditor,
      openEditor,
      closeEditor,
      expandCollapse,
      toggleSidebar,
      closeSidebar,
      toggleSearch,
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
