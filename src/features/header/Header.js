import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../todos/todosSlice";

const Header = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch()

  const handleChange = e => setText(e.target.value);

  const handleKeyDown = e => {
    const trimmedText = e.target.value.trim();
    if (e.key === 'Enter' && trimmedText) {
      dispatch(saveNewTodo(text))
      setText('')
    }
  }

  return (
    <input 
      type="text" 
      placeholder="What needs to be done?"
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default Header;