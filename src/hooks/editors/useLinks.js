import { useReducer, useEffect, useRef } from "react";

import { generateID } from "../../utilities/common";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  ADD_LINK_LIST: "add_link_list",
  UPDATE_LINK_LIST: "update_link_list",
  ENABLE_TO_LINK: "enable_to_link",
  SET_DELETE_NODE: "set_delete_node",
  SET_AUTOCOMPLETE: "set_autocomplete",
  TOGGLE_AUTOCOMPLETE: "toggle_autocomplete",
};

const dummyDots = [
  {
    id: "d1",
    name: "Physics",
    description:
      "Physics Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  },
  {
    id: "d2",
    name: "Maths",
    description:
      "Maths Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  },
  {
    id: "d3",
    name: "Tamil",
    description:
      "Tamil Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  },
  {
    id: "d4",
    name: "English",
    description:
      "English Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  },
  {
    id: "d5",
    name: "Biology",
    description:
      "Biology Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  },
  {
    id: "d6",
    name: "Singapore",
    description:
      "Singapore Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  },
  {
    id: "d7",
    name: "India",
    description:
      "India Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  },
  {
    id: "d8",
    name: "Srilanka",
    description:
      "Srilanka Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  },
  {
    id: "d9",
    name: "America",
    description:
      "America Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  },
  {
    id: "d10",
    name: "Chemistry",
    description:
      "Chemistry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  },
];

const initialState = {
  isLoading: false,
  linkList: [
    {
      id: "link_1",
      value: "",
      description: "",
      isFind: false,
      isSelected: false,
      isAdded: false,
    },
  ],
  selectedLinks: [],
  deleteNode: "",
  dots: dummyDots,
  isAutocompleteShow: {},
  autoComplete: [],
};

function linkReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    case ACTION_TYPES.ADD_LINK_LIST:
      return {
        ...state,
        linkList: action.payload,
      };
    case ACTION_TYPES.UPDATE_LINK_LIST:
      return {
        ...state,
        linkList: action.payload,
      };
    case ACTION_TYPES.ENABLE_TO_LINK:
      return {
        ...state,
        selectedLinks: action.payload,
      };
    case ACTION_TYPES.SET_DELETE_NODE:
      return {
        ...state,
        deleteNode: action.payload,
      };
    case ACTION_TYPES.SET_AUTOCOMPLETE:
      return {
        ...state,
        autoComplete: action.payload,
      };
    case ACTION_TYPES.TOGGLE_AUTOCOMPLETE:
      return {
        ...state,
        isAutocompleteShow: {
          [action.payload.id]: action.payload.value,
        },
      };
    default:
      throw new Error(
        `Unknown action type received.
                      Valid action types are:
                          * UPDATE_STATE
                          * ADD_LINK_LIST
                          * UPDATE_LINK_LIST
                          * ENABLE_TO_LINK
                          * SET_DELETE_NODE
                          * SET_AUTOCOMPLETE
                          * TOGGLE_AUTOCOMPLETE
                  `
      );
  }
}

function useLinks() {
  const [state, dispatch] = useReducer(linkReducer, initialState);

  const { linkList, selectedLinks, deleteNode } = state;

  const autoCompleteWrapper = useRef(null);

  const updateLinkList = () => {
    const id = generateID();
    const list = {
      id: `link_` + id,
      value: "",
      description: "",
      isFind: false,
      isSelected: false,
      isAdded: false,
    };
    const updatedList = [...linkList, list];
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.UPDATE_LINK_LIST, payload: updatedList });
    }, 100);
  };

  const enableToLink = (id, data) => {
    const updatedList = linkList.map((link) =>
      link.id === id
        ? {
            ...link,
            isFind: true,
            value: data.name,
            description: data.description,
          }
        : link
    );
    dispatch({ type: ACTION_TYPES.UPDATE_LINK_LIST, payload: updatedList });
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.TOGGLE_AUTOCOMPLETE, payload: {} });
    }, 100);
  };

  const updateValue = (e) => {
    const { id, value } = e.target;
    const updatedList = linkList.map((link) =>
      link.id === id
        ? { ...link, isSelected: false, isFind: false, value }
        : link
    );
    const seletedList = updatedList.filter((list) => list.isSelected);
    const selectedID = seletedList.map((list) => list.id);
    dispatch({ type: ACTION_TYPES.ENABLE_TO_LINK, payload: selectedID });
    dispatch({ type: ACTION_TYPES.UPDATE_LINK_LIST, payload: updatedList });

    const filteredValue = value.trim()
      ? dummyDots.filter((dot) =>
          dot.name.trim().toLowerCase().includes(value.trim().toLowerCase())
        )
      : "";
    // console.log("filteredValue: ", filteredValue);
    if (filteredValue && filteredValue.length) {
      dispatch({
        type: ACTION_TYPES.TOGGLE_AUTOCOMPLETE,
        payload: { id, value: true },
      });
    } else {
      dispatch({
        type: ACTION_TYPES.TOGGLE_AUTOCOMPLETE,
        payload: id,
        value: false,
      });
    }
    dispatch({ type: ACTION_TYPES.SET_AUTOCOMPLETE, payload: filteredValue });
  };

  const updateCheckbox = (id) => {
    const updatedList = linkList.map((link) =>
      link.id === id ? { ...link, isSelected: !link.isSelected } : link
    );
    const seletedList = updatedList.filter((list) => list.isSelected);
    const selectedID = seletedList.map((list) => list.id);
    dispatch({ type: ACTION_TYPES.ENABLE_TO_LINK, payload: selectedID });
    dispatch({ type: ACTION_TYPES.UPDATE_LINK_LIST, payload: updatedList });
  };

  const setDeleteNode = (id) => {
    dispatch({ type: ACTION_TYPES.SET_DELETE_NODE, payload: id });
  };

  useEffect(() => {
    const deleteList = () => {
      const updatedList = linkList.filter((link) => link.id !== deleteNode);
      dispatch({ type: ACTION_TYPES.UPDATE_LINK_LIST, payload: updatedList });

      const selectedID = selectedLinks.filter((link) => link != deleteNode);
      dispatch({ type: ACTION_TYPES.ENABLE_TO_LINK, payload: selectedID });
    };
    deleteList();
  }, [deleteNode]);

  //   Close Autocomplete when click outside
  const onClickOutside = (event) => {
    if (
      autoCompleteWrapper.current &&
      !autoCompleteWrapper.current.contains(event.target)
    ) {
      dispatch({ type: ACTION_TYPES.TOGGLE_AUTOCOMPLETE, payload: {} });
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutside, false);
    return () => {
      document.removeEventListener("click", onClickOutside, false);
    };
  }, []);

  const value = {
    linkState: { ...state, autoCompleteWrapper },
    linkActions: {
      updateLinkList,
      enableToLink,
      updateValue,
      updateCheckbox,
      setDeleteNode,
    },
  };

  return value;
}

export default useLinks;
