import { useReducer, useRef, useEffect } from "react";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  TOGGLE_NOTIFICATIONS_WRAPPER: "toggle_notifications_wrapper",
  MARK_ALL_READ: "mark_all_read",
  CLOSE_NOTIFICATIONS_WRAPPER: "close_notifications_wrapper",
  SET_NEWS_READED: "set_news_readed",
  COUNT_NUMBER_OF_UNREAD_NOTIFICATIONS: "set_number_of_unread_notifications",
};

const dummyNotificaions = [
  {
    id: "notification_1",
    message: "Ahamed invited to Thesis as collaborator.",
    isRead: false,
  },
  {
    id: "notification_2",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isRead: false,
  },
  {
    id: "notification_3",
    message: "Lorem Ipsum has been the industry's standard.",
    isRead: false,
  },
  {
    id: "notification_4",
    message: "It has survived not only five centuries.",
    isRead: false,
  },
  {
    id: "notification_5",
    message: "Contrary to popular belief, Lorem Ipsum is not simply.",
    isRead: false,
  },
  {
    id: "notification_6",
    message:
      "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.",
    isRead: false,
  },
  {
    id: "notification_7",
    message: "Lorem Ipsum comes from sections 1.10.32 and 1.10.33.",
    isRead: false,
  },
  {
    id: "notification_8",
    message:
      "It is a long established fact that a reader will be distracted by the readable content.",
    isRead: false,
  },
  {
    id: "notification_9",
    message: "There are many variations of passages of Lorem Ipsum available.",
    isRead: false,
  },
  {
    id: "notification_10",
    message:
      "If you are going to use a passage of Lorem Ipsum, you need to be sure.",
    isRead: false,
  },
];

const initialState = {
  isLoading: false,
  isNotificationsWrapperOpen: false,
  notifications: dummyNotificaions,
  isAllReaded: false,
  noOfUnreadNotificaions: 0,
};

function notificationsReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    case ACTION_TYPES.TOGGLE_NOTIFICATIONS_WRAPPER:
      return {
        ...state,
        isNotificationsWrapperOpen: !state.isNotificationsWrapperOpen,
      };
    case ACTION_TYPES.MARK_ALL_READ:
      return {
        ...state,
        notifications: action.payload,
        isAllReaded: true,
      };
    case ACTION_TYPES.CLOSE_NOTIFICATIONS_WRAPPER:
      return {
        ...state,
        isNotificationsWrapperOpen: false,
      };
    case ACTION_TYPES.SET_NEWS_READED:
      return {
        ...state,
        notifications: action.payload,
      };
    case ACTION_TYPES.COUNT_NUMBER_OF_UNREAD_NOTIFICATIONS:
      return {
        ...state,
        noOfUnreadNotificaions: action.payload,
      };
    default:
      throw new Error(
        `Unknown action type received.
                      Valid action types are:
                          * UPDATE_STATE
                          * TOGGLE_NOTIFICATIONS_WRAPPER
                          * MARK_ALL_READ
                          * CLOSE_NOTIFICATIONS_WRAPPER
                          * SET_NEWS_READED
                          * COUNT_NUMBER_OF_UNREAD_NOTIFICATIONS
                  `
      );
  }
}

function useNotifications() {
  const [state, dispatch] = useReducer(notificationsReducer, initialState);

  const { notifications, noOfUnreadNotificaions } = state;

  const notificationsWrapper = useRef(null);

  const toggleNotificationsWrapper = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_NOTIFICATIONS_WRAPPER });
  };

  const closeNotificationsWrapper = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_NOTIFICATIONS_WRAPPER });
  };

  const setNewsAsReaded = (id) => {
    const newState = notifications.map((news) =>
      news.id === id ? { ...news, isRead: true } : news
    );
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.SET_NEWS_READED, payload: newState });
    }, 0);
  };

  const markAllRead = () => {
    const newState = notifications.map((news) => ({ ...news, isRead: true }));
    console.log("newState: ", newState);
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.MARK_ALL_READ, payload: newState });
    }, 0);
  };

  useEffect(() => {
    const setNoOfUnreadNotifications = () => {
      const noOfUnreadNotifications = notifications.filter(
        (news) => !news.isRead
      ).length;
      dispatch({
        type: ACTION_TYPES.COUNT_NUMBER_OF_UNREAD_NOTIFICATIONS,
        payload: noOfUnreadNotifications,
      });
    };
    notifications.length && setNoOfUnreadNotifications();
  }, [notifications]);

  const handleOutsideClick = (event) => {
    if (
      notificationsWrapper.current &&
      !notificationsWrapper.current.contains(event.target)
    ) {
      closeNotificationsWrapper();
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
    notificaionsState: {
      ...state,
      notificationsWrapper,
    },
    notificaionsActions: {
      toggleNotificationsWrapper,
      setNewsAsReaded,
      markAllRead,
    },
  };

  return value;
}

export default useNotifications;
