import axios from "axios";
import React, { useEffect, useReducer } from "react";
import useAsync from "./useAsync";

async function fetchData() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  console.log(response.data.splice(0, 20));
  console.log(response.data.length > 20);
  const result = response.data.splice(0, 15);
  return response;
}

export default function ApiHooks() {
  const [state, refetch] = useAsync(fetchData, [], true);
  const { isLoading, todos, error } = state;

  if (isLoading) return <div>로딩중 입니다..</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!todos) return <button onClick={refetch}>불러오기</button>;
  return (
    <div>
      <h1>reducer로 하는 API관리 연습</h1>
      <ol>
        {todos.map((item) => {
          return (
            <li key={item.id}>
              <p>
                Num: {item.id} Todo: {item.title}
              </p>
            </li>
          );
        })}
      </ol>
      <button onClick={refetch}>불러오기</button>
    </div>
  );
}
