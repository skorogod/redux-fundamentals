import React from "react";
import { useSelector } from "react-redux";
import TodoListItem from './TodoListItem';
import { selectFilteredTodoIds } from "./todosSlice";

const TodoList = () => {
  const todos = useSelector(selectFilteredTodoIds)
  const loadingStatus = useSelector(state => state.todos.status)

  if (loadingStatus === 'loading') {
    return (
      <dib className="todo-list">
        <div className="loader"></div>
      </dib>
    )
  }

  const renderedListItems = todos.map(todoId => {
    return <TodoListItem key={todoId} id={todoId}/>
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList;