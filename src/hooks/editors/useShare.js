import { useReducer } from "react";

import { generateID, validateEmail } from "../../utilities/common";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  UPDATE_INVITE_FIELD: "update_invite_field",
  UPDATE_INVITE_LIST: "update_invite_list",
  UPDATE_MESSAGE: "update_message",
  RESET_FIELDS: "reset_fields",
};

const initialState = {
  isLoading: false,
  inviteList: [],
  inviteEmail: "",
  inviteAccessType: "",
  message: {},
};

function shareReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    case ACTION_TYPES.UPDATE_INVITE_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTION_TYPES.UPDATE_INVITE_LIST:
      return {
        ...state,
        inviteList: action.payload,
      };
    case ACTION_TYPES.UPDATE_MESSAGE:
      return {
        ...state,
        message: {
          [action.payload.type]: action.payload.value,
        },
      };
    case ACTION_TYPES.RESET_FIELDS:
      return {
        ...state,
        inviteEmail: "",
        inviteAccessType: "",
      };
    default:
      throw new Error(
        `Unknown action type received.
                      Valid action types are:
                          * UPDATE_STATE
                          * UPDATE_INVITE_LIST
                          * UPDATE_INVITE_FIELD
                          * UPDATE_MESSAGE
                          * RESET_FIELDS
                  `
      );
  }
}

function useShare() {
  const [state, dispatch] = useReducer(shareReducer, initialState);

  const { inviteList, inviteEmail, inviteAccessType } = state;

  const updateInviteField = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: ACTION_TYPES.UPDATE_INVITE_FIELD,
      payload: { name, value },
    });
    dispatch({
      type: ACTION_TYPES.UPDATE_MESSAGE,
      payload: { type: "invalidEmail", value: false },
    });
  };

  const updateInviteList = () => {
    const validEmail = validateEmail(inviteEmail);

    if (validEmail) {
      const id = generateID();
      const newInvite = {
        id,
        email: inviteEmail,
        accessType: inviteAccessType,
      };

      const updatedList = [...inviteList, newInvite];

      dispatch({ type: ACTION_TYPES.UPDATE_INVITE_LIST, payload: updatedList });
      setTimeout(() => {
        dispatch({ type: ACTION_TYPES.RESET_FIELDS });
      }, 100);
    } else {
      dispatch({
        type: ACTION_TYPES.UPDATE_MESSAGE,
        payload: { type: "invalidEmail", value: true },
      });
    }
  };

  const removeInviteList = (id) => {
    const updatedList = inviteList.filter((list) => list.id !== id);
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.UPDATE_INVITE_LIST, payload: updatedList });
    }, 100);
  };

  const value = {
    shareState: {
      ...state,
    },
    shareActions: {
      updateInviteField,
      updateInviteList,
      removeInviteList,
    },
  };

  return value;
}

export default useShare;
