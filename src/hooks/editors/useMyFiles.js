import { useReducer } from "react";

const ACTION_TYPES = {
  UPDATE_STATE: "update_state",
  UPDATE_CHECKBOX: "update_checkbox",
  SORT_COLUMN: "sort_column",
  FIND_FILE: "find_file",
};

const dummyTableData = [
  {
    id: "t1",
    name: "All Thesis 1",
    owner: "Me",
    dotCount: "22",
    lastOpened: "12:15",
    isChecked: false,
  },
  {
    id: "t2",
    name: "All Thesis 2",
    owner: "Me",
    dotCount: "43",
    lastOpened: "12:15",
    isChecked: false,
  },
  {
    id: "t3",
    name: "All Thesis 3",
    owner: "Me",
    dotCount: "44",
    lastOpened: "12:15",
    isChecked: false,
  },
  {
    id: "t4",
    name: "All Thesis 4",
    owner: "Me",
    dotCount: "12",
    lastOpened: "12:15",
    isChecked: false,
  },
  {
    id: "t5",
    name: "All Thesis 5",
    owner: "Me",
    dotCount: "50",
    lastOpened: "12:15",
    isChecked: false,
  },
];

const initialState = {
  isLoading: false,
  tableData: dummyTableData,
  editOwner: {},
  sortingOrder: "",
  sortedColumn: "",
  fileName: "",
};

function fileReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_STATE:
      return {
        ...state,
        [action.payload.type]: [action.payload.value],
      };
    case ACTION_TYPES.UPDATE_CHECKBOX:
      return {
        ...state,
        tableData: action.payload,
      };
    case ACTION_TYPES.SORT_COLUMN:
      return {
        ...state,
        tableData: action.payload.sortedData,
        sortedColumn: action.payload.column,
        sortingOrder: action.payload.order,
      };
    case ACTION_TYPES.FIND_FILE:
      return {
        ...state,
        fileName: action.payload.value,
        tableData: action.payload.data,
      };
    default:
      throw new Error(
        `Unknown action type received.
                    Valid action types are:
                        * UPDATE_STATE
                        * UPDATE_CHECKBOX
                        * SORT_COLUMN
                        * FIND_FILE
                `
      );
  }
}

function useMyFiles() {
  const [state, dispatch] = useReducer(fileReducer, initialState);
  const { tableData, sortedColumn, sortingOrder } = state;

  const updateCheckbox = (id) => {
    const newState = tableData.map((data) =>
      data.id === id ? { ...data, isChecked: !data.isChecked } : data
    );
    dispatch({ type: ACTION_TYPES.UPDATE_CHECKBOX, payload: newState });
  };

  function compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  const sortColumn = (column) => {
    const order =
      sortedColumn === column && sortingOrder === "asc" ? "desc" : "asc";

    const sortedData = tableData.sort(compareValues(column, order));

    dispatch({
      type: ACTION_TYPES.SORT_COLUMN,
      payload: { column, order, sortedData },
    });
  };

  const findFile = (e) => {
    const { value } = e.target;
    const filteredData = tableData.filter(
      (data) => data.name.toLowerCase().indexOf(value) > -1
    );
    // console.log("filteredData: ", filteredData);
    dispatch({
      type: ACTION_TYPES.FIND_FILE,
      payload: { value, data: filteredData },
    });
  };

  const value = {
    fileState: { ...state },
    fileActions: {
      updateCheckbox,
      sortColumn,
      findFile,
    },
  };

  return value;
}

export default useMyFiles;
