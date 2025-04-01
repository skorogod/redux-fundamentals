import React from "react";
import { useDispatch, useSelector } from "react-redux";

import StatusFilter from "../../shared/ui/statusFilter/StatusFilters";
import RemainingTodos from "../../shared/ui/remainingTodos/RemainingTodos";
import ColorFilters from "../../shared/ui/colorFilter/ColorFilter";

const Footer = () => {
  const  todosRemaining = useSelector(state => {
    const uncompletedTodos = state.todos.filter(todo => !todo.completed);
    return uncompletedTodos.length;
  })

  const dispatch = useDispatch()

  const {status, colors} = useSelector(state => state.filters)

  const onColorChange = (color, changeType) => {
    dispatch({type: "filters/colorFilterChanged", payload: {color, changeType}})
  }

  const onStatusChange = (status) => dispatch({type: "filters/statusFilterChanged", payload: status})

  const handleMarkAllCompleted = () => {
    dispatch({type: "todos/markAllCompleted"})
  }

  const handleClearCompleted = () => {
    dispatch({type: "todos/clearCompleted"})
  }

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button onClick={handleMarkAllCompleted} className="button">Mark All Completed</button>
        <button onClick={handleClearCompleted} className="button">Clear Completed</button>
      </div>
      <RemainingTodos count={todosRemaining}/>
      <StatusFilter value={status} onChange={onStatusChange}/>
      <ColorFilters value={colors} onChange={onColorChange}/>
    </footer>
  )
}

export default Footer;