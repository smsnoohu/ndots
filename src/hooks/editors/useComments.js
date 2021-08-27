import { useReducer, useRef, useEffect } from "react";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  SET_COMMENT_DATA: "set_comment_data",
  UPDATE_COMMENT_FIELD: "update_comment_field",
};

const dummyComments = [
  {
    id: "c1",
    userID: "abc",
    userName: "Jack",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    time: "12:30 pm PST",
  },
  {
    id: "c2",
    userID: "abc",
    userName: "Jack",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    time: "12:30 pm PST",
  },
  {
    id: "c3",
    userID: "smsnoohu",
    userName: "Noohu",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    time: "12:30 pm PST",
  },
  {
    id: "c4",
    userID: "smsnoohu",
    userName: "Noohu",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    time: "12:30 pm PST",
  },
  {
    id: "c5",
    userID: "sms",
    userName: "Mohamed",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    time: "12:30 pm PST",
  },
];

const initialState = {
  isLoading: false,
  commentsData: dummyComments,
  comment: "",
};

function commentReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    case ACTION_TYPES.SET_COMMENT_DATA:
      return {
        ...state,
        commentsData: action.payload,
      };
    case ACTION_TYPES.UPDATE_COMMENT_FIELD:
      return {
        ...state,
        comment: action.payload,
      };
    default:
      throw new Error(
        `Unknown action type received.
                      Valid action types are:
                          * UPDATE_STATE
                          * SET_COMMENT_DATA
                          * UPDATE_COMMENT_FIELD
                  `
      );
  }
}

function useComments() {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  const { commentsData, comment } = state;

  const loggedInUserID = `smsnoohu`;
  const loggedInUserName = `Noohu`;
  const latestMessageContainer = useRef(null);

  const commentField = (e) => {
    const { value } = e.target;
    dispatch({ type: ACTION_TYPES.UPDATE_COMMENT_FIELD, payload: value });
  };

  const updateCommentData = () => {
    const commentsLenth = commentsData.length;
    const today = new Date();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const commentObj = {
      id: `c` + parseInt(commentsLenth + 1),
      userID: loggedInUserID,
      userName: loggedInUserName,
      comment,
      time,
    };
    const updtedComment = [...commentsData, commentObj];
    dispatch({ type: ACTION_TYPES.SET_COMMENT_DATA, payload: updtedComment });
    dispatch({ type: ACTION_TYPES.UPDATE_COMMENT_FIELD, payload: "" });
  };

  useEffect(() => {
    latestMessageContainer && latestMessageContainer.current.focus();
  }, [commentsData]);

  const value = {
    commentState: {
      ...state,
      loggedInUserID,
      loggedInUserName,
      latestMessageContainer,
    },
    commentActions: {
      commentField,
      updateCommentData,
    },
  };

  return value;
}

export default useComments;
