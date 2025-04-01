import { client } from "../../api/client"

const initialState = [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
]

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function todosReducer(state=initialState, action) {
  switch (action.type) {
    case "todos/todosLoaded": {
      return action.payload
    }
    case 'todos/todoAdded': {
      return [
        ...state, action.payload
      ]
    }
    case "todos/todoToggled": {
      return state.map(todo => {
        if (todo.id !== action.payload.id) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed
        }
      })
    }
    case "todos/todoDeleted": {
      return state.filter(todo => todo.id !== action.payload)
    }
    case "todos/colorSelected": {
      return state.map(todo => {
        console.log(action.payload)
        if (todo.id === action.payload.todoId) {
          return {...todo, color: action.payload.color}
        }
        return todo;
      })
    }
    case "todos/markAllCompleted": {
      return state.map(todo => ({
        ...todo, completed: true
      }))
    }
    case "todos/clearCompleted": {
      return state.filter(todo => !todo.completed)
    }
    default:
      return state
  }
}

export async function fetchTodos(dispatch, getState) {
  const response = await client.get("/fakeApi/todos")
  dispatch({type: 'todos/todosLoaded', payload: response.todos})
}

export const saveNewTodo = text => async (dispatch, getState) => {
  const initialTodo = {text}
  const response = await client.post('/fakeApi/todos', {
    todo: initialTodo
  })
  dispatch({type: "todos/todoAdded", payload: response.todo})
}