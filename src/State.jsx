import React, { useState } from 'react';

function State() {
  const [number, setNumber] = useState(0)
  const [input, setInput] = useState('')
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value)
  }

  const plus = () => {
    if(input === ''){
      setNumber(v => v + 1)
    } else {
      const num = Number(input)
      setNumber(v => v + num)
    }
  }
  const miners = () => {
    if(input === ''){
      setNumber(v => v - 1)
    } else {
      const num = Number(input)
      setNumber(v => v - num)
    }
  }
  return (
    <div>
      <p>{number}</p>
      <input type="number" value={input} onChange={onChange} />
      <div>
        <button onClick={plus}>증가</button>
        <button onClick={miners}>감소</button>
      </div>
    </div>
  );
}

export default State;
