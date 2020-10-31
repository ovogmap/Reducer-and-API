import axios from "axios";
import React, { useEffect, useReducer } from "react";

const INITIAL_STATE = {
  isLoadin: null,
  isError: null,
  users: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "REQUEST":
      return {
        users: action.users,
        error: null,
        isLoading: false,
      };
    case "ERROR":
      return {
        users: null,
        isError: action.error,
        isLoading: null,
      };
    default:
      return state;
  }
}

export default function Apiapp() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { isLoading, isError, users } = state;

  const fetchUser = async () => {
    dispatch({ type: "START_LOADING" });
    try {
      const user = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(user);
      const users = user.data;
      dispatch({ type: "REQUEST", users });
    } catch (error) {
      dispatch({ type: "ERROR", error });
    }
  };

  return (
    <>
      <h1>reducer로 하는 API관리 연습</h1>
      <button onClick={fetchUser}>호출</button>
      {isLoading && <div>로딩중...</div>}
      {isError && <div>에러가 발생했습니다.</div>}
      {users && (
        <div>
          {users.map((item) => {
            return (
              <p key={item.id}>
                {item.id}
                {item.name}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
}
