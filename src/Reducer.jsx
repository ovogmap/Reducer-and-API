import React, { useReducer } from 'react';

const INITIAL_STATE = {
  input : '',
  number : 0
}

function reducer(state, action) {
  switch(action.type){
    case 'PLUS':
      return {
        ...state,
        number: state.number + action.num
      }
    case 'MINUS':
      return {
        ...state,
        number: state.number - action.num
      }
    case 'ONCHANGE':
      return {
        ...state,
        input: action.value
      }
    default:
      return state
  }
}
export default function MyReducer() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const { number, input } = state

  const onChange = (e) => {
    const { value } = e.target;
    dispatch({type: 'ONCHANGE', value})
  }
  const plus = () => {
    if(input === ''){
      const num = 1
      dispatch({type: 'PLUS', num})
    } else {
      const num = Number(input)
      dispatch({type: 'PLUS', num})
    }
  }
  const minus = () => {
    if(input === ''){
      const num = 1
      dispatch({type: 'MINUS', num})
    } else {
      const num = Number(input)
      dispatch({type: 'MINUS', num})
    }
  }
  return (
    <div>
      <h1>Reducer</h1>
      <p>{number}</p>
      <input type="number" value={input} onChange={onChange} />
      <div>
        <button onClick={plus}>증가</button>
        <button onClick={minus}>감소</button>
      </div>
    </div>
  )
}