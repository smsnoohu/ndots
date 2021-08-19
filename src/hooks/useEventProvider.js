import React, { useReducer } from "react";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
};

const initialState = {
  isLoading: false,
};

const EventContext = React.createContext();

function eventReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    default:
      throw new Error(
        `Unknown action type received.
                    Valid action types are:
                        * UPDATE_STATE
                `
      );
  }
}

function EventProvider(props) {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  const toggle = () => {
    console.log("state: ", state);
  };

  const value = {
    eventState: { ...state },
    eventActions: {
      toggle,
    },
  };

  return (
    <EventContext.Provider value={value}>
      {props.children}
    </EventContext.Provider>
  );
}

export function useEventState() {
  const context = React.createContext(EventContext);
  if (!context) {
    throw new Error(`useEventState must be use within the EventProvider`);
  }
  return context;
}

export default EventProvider;
