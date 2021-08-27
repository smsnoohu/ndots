import { useReducer, useEffect } from "react";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  ADD_LINK_LIST: "add_link_list",
  UPDATE_LINK_LIST: "update_link_list",
  ENABLE_TO_LINK: "enable_to_link",
  SET_DELETE_NODE: "set_delete_node",
};

const initialState = {
  isLoading: false,
  linkList: [
    {
      id: "link_1",
      value: "",
      isFind: false,
      isSelected: false,
      isAdded: false,
    },
  ],
  selectedLinks: [],
  deleteNode: "",
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
    default:
      throw new Error(
        `Unknown action type received.
                      Valid action types are:
                          * UPDATE_STATE
                          * ADD_LINK_LIST
                          * UPDATE_LINK_LIST
                          * ENABLE_TO_LINK
                          * SET_DELETE_NODE
                  `
      );
  }
}

function useLinks() {
  const [state, dispatch] = useReducer(linkReducer, initialState);

  const { linkList, deleteNode } = state;

  const updateLinkList = () => {
    const listLength = linkList.length;
    const list = {
      id: `link_` + parseInt(listLength + 1),
      value: "",
      isFind: false,
      isSelected: false,
      isAdded: false,
    };
    const updatedList = [...linkList, list];
    dispatch({ type: ACTION_TYPES.UPDATE_LINK_LIST, payload: updatedList });
  };

  const enableToLink = (id) => {
    const updatedList = linkList.map((link) =>
      link.id === id ? { ...link, isFind: true } : link
    );
    dispatch({ type: ACTION_TYPES.UPDATE_LINK_LIST, payload: updatedList });
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
    };
    deleteList();
  }, [deleteNode]);

  const value = {
    linkState: { ...state },
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
