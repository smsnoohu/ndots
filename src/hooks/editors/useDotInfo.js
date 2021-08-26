import { useReducer, useRef, useEffect } from "react";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  TOGGLE_PICKER: "toggle_picker",
  CLOSE_PICKER: "close_picker",
  UPDATE_COLOR: "update_color",
  TOGGLE_SUGGESITION: "toggle_suggestion",
  CLOSE_SUGGESITION: "close_suggestion",
  UPDATE_TAGS: "update_tags",
  UPDATE_FIELD: "update_field",
  TOGGLE_BOOKMARK: "toggle_bookmark",
  CLOSE_BOOKMARK: "close_bookmark",
};

const initialBookmarkList = [
  {
    id: "bookmark_1",
    name: "Tamil",
    isSelected: false,
  },
  {
    id: "bookmark_2",
    name: "Maths",
    isSelected: false,
  },
  {
    id: "bookmark_3",
    name: "Physics",
    isSelected: false,
  },
  {
    id: "bookmark_4",
    name: "Chemistry",
    isSelected: false,
  },
  {
    id: "bookmark_5",
    name: "Biology",
    isSelected: false,
  },
  {
    id: "bookmark_6",
    name: "History",
    isSelected: false,
  },
];

const initialState = {
  isLoading: false,
  isColorPickerOpen: false,
  pickedColor: "#fff",
  isSuggestionOpen: false,
  bookmarkList: initialBookmarkList,
  dotInfoFields: {
    dotName: "",
    bookmark: "",
    link: "",
    additionalInfo: "",
  },
  isBookmarkOpen: false,
};

function dotReducer(state, action) {
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
    case ACTION_TYPES.TOGGLE_SUGGESITION:
      return {
        ...state,
        isSuggestionOpen: !state.isSuggestionOpen,
      };
    case ACTION_TYPES.CLOSE_SUGGESITION:
      return {
        ...state,
        isSuggestionOpen: false,
      };
    case ACTION_TYPES.UPDATE_TAGS:
      return {
        ...state,
        bookmarkList: action.payload,
      };
    case ACTION_TYPES.UPDATE_FIELD:
      return {
        ...state,
        dotInfoFields: {
          ...state.dotInfoFields,
          [action.payload.name]: action.payload.value,
        },
      };
    case ACTION_TYPES.TOGGLE_BOOKMARK:
      return {
        ...state,
        isBookmarkOpen: !state.isBookmarkOpen,
      };
    case ACTION_TYPES.CLOSE_BOOKMARK:
      return {
        ...state,
        isBookmarkOpen: false,
      };
    default:
      throw new Error(
        `Unknown action type received.
                    Valid action types are:
                        * UPDATE_STATE
                        * TOGGLE_PICKER
                        * CLOSE_PICKER
                        * UPDATE_COLOR
                        * TOGGLE_SUGGESITION
                        * CLOSE_SUGGESITION
                        * UPDATE_TAGS
                        * UPDATE_FIELD
                        * TOGGLE_BOOKMARK
                `
      );
  }
}

function useDotInfo() {
  const [state, dispatch] = useReducer(dotReducer, initialState);

  const colorPickerWrapper = useRef(null);
  const suggesionsWrapper = useRef(null);
  const bookmarkWrapper = useRef(null);

  const {
    dotInfoFields: { bookmark },
    bookmarkList,
  } = state;

  const toggleColorPicker = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_PICKER });
  };

  const closeColorPicker = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_PICKER });
  };

  const handleColorPicker = (color) => {
    console.log("123", color);
    dispatch({ type: ACTION_TYPES.UPDATE_COLOR, payload: color.hex });
  };

  const toggleSuggestion = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_SUGGESITION });
  };

  const closeSuggestion = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_SUGGESITION });
  };

  const toggleBookmark = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_BOOKMARK });
  };

  const closeBookmark = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_BOOKMARK });
  };

  const handleOutsideClick = (event) => {
    // Color Picker
    if (
      colorPickerWrapper.current &&
      !colorPickerWrapper.current.contains(event.target)
    ) {
      closeColorPicker();
    }

    // Suggestion Wrapper
    if (
      suggesionsWrapper.current &&
      !suggesionsWrapper.current.contains(event.target)
    ) {
      closeSuggestion();
    }

    // Bookmark Wrapper
    if (
      bookmarkWrapper.current &&
      !bookmarkWrapper.current.contains(event.target)
    ) {
      closeBookmark();
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

  const updateBookmark = (e) => {
    const { id } = e.target;
    const newState = bookmarkList.map((item) =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    );
    console.log("newState: ", id, newState);
    dispatch({ type: ACTION_TYPES.UPDATE_TAGS, payload: newState });
  };

  const updateField = (e) => {
    const { name, value } = e.target;
    dispatch({ type: ACTION_TYPES.UPDATE_FIELD, payload: { name, value } });
  };

  const addBookmarkList = () => {
    const index = bookmarkList.length;
    const newState = {
      id: `bookmark_` + index + 1,
      name: bookmark,
      isSelected: true,
    };
    const updatedBookmarkList = [newState, ...bookmarkList];
    dispatch({ type: ACTION_TYPES.UPDATE_TAGS, payload: updatedBookmarkList });
    dispatch({
      type: ACTION_TYPES.UPDATE_FIELD,
      payload: { name: "bookmark", value: "" },
    });
  };

  const value = {
    dotState: {
      ...state,
      colorPickerWrapper,
      suggesionsWrapper,
      bookmarkWrapper,
    },
    dotActions: {
      toggleColorPicker,
      handleColorPicker,
      toggleSuggestion,
      updateBookmark,
      updateField,
      addBookmarkList,
      toggleBookmark,
    },
  };

  return value;
}

export default useDotInfo;
