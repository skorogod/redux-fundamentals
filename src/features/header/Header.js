import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../todos/todosSlice";

const Header = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const handleChange = e => setText(e.target.value);

  const handleKeyDown = async e => {
    const trimmedText = e.target.value.trim();
    if (e.key === 'Enter' && trimmedText) {
      setStatus('loading')
      await dispatch(saveNewTodo(text))
      setText('')
      setStatus("idle")
    }
  }

  let isLoading = status === 'loading';
  let placeholder = isLoading ? '' : 'What needs to be done?'
  let loader = isLoading ? <div className="loader"></div> : null

  return (
    <header>
      <input 
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  )
}

export default Header;