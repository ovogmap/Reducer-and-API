import Axios from "axios";
import { useReducer, useEffect } from "react";

const INITIAL_STATE = {
  isLoadin: null,
  isError: null,
  todos: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SUCCESS":
      return {
        todos: action.todos,
        error: null,
        isLoading: false,
      };
    case "ERROR":
      return {
        todos: null,
        isError: action.error,
        isLoading: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchData = async () => {
    dispatch({ type: "START_LOADING" });
    try {
      const response = await callback();
      dispatch({ type: "SUCCESS", todos: response.data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, deps);

  return [state, fetchData];
}

export default useAsync;
