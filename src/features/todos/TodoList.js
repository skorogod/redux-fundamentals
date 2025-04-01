import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import TodoListItem from './TodoListItem';


const selectTodos = state => state.todos
                                    .filter(todo => (!state.filters.colors.length || state.filters.colors.includes(todo.color)) && 
                                                    (!state.filters.status || state.filters.status === "all" || (state.filters.status === "active" && !todo.completed) || (state.filters.status === "completed" && todo.completed))
                                    ).map(todo => todo.id);

const TodoList = () => {
  const todos = useSelector(selectTodos, shallowEqual)

  const renderedListItems = todos.map(todoId => {
    return <TodoListItem key={todoId} id={todoId}/>
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList;