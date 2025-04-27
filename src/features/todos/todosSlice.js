import { client } from "../../api/client"
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { StatusFilters } from "../filters/filtersSlice"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState(
  {
    status: "idle"
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      const todo = action.payload
      state.entities[todo.id] = todo
    },
    todoToggled(state, action) {
      const todoId = action.payload;
      state.entities[todoId].completed = !state.entities[todoId].completed
    },
    todosLoading(state, action) {
      return {
        ...state,
        status: 'loading'
      }
    },
    todoColorSelected: {
      reducer(state, action) {
        const {color, todoId} = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color) {
        return {
          payload: {todoId, color}
        }
      }
    },
    todoDeleted: todosAdapter.removeOne,
    allTodosCompleted(state, action) {
      Object.values(state.entities).forEach(todo => {
        todo.completed = true
      })
    },
    completedTodosCleared(state, action) {
      const completedIds = Object.values(state.entities)
        .filter(todo => todo.completed)
        .map(todo => todo.id)
        todosAdapter.removeMany(state, completedIds)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const newEntities = {}
        action.payload.forEach(todo => {
          newEntities[todo.id] = todo;
        })
        state.entities = newEntities;
        state.status = 'idle'
      })
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
  }
})

export const { 
  allTodosCompleted, todoAdded, 
  completedTodosCleared,
  todoToggled, todosLoading,
  todoDeleted, todoColorSelected
 } = todosSlice.actions

 export const {selectAll: selectTodos, selectById: selectTodoById} = 
  todosAdapter.getSelectors(state => state.todos)

export default todosSlice.reducer

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get("/fakeApi/todos")
  return response.todos;
})

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async text => {
  const initialTodo = { text }
  const response = await client.post('/fakeApi/todos', {todo: initialTodo})
  return response.todo;
})

//Selectors
export const selectTodoEntities = state => state.todos.entities

export const selectTodoIds = createSelector(
  selectTodos,
  todos => todos.map(todo => todo.id)
)

export const selectFilteredTodos = createSelector(
  selectTodos,
  state => state.filters,
  (todos, filters) => {
    const { status, colors } = filters;
    const showAllCompletions = status === StatusFilters.All;

    if (showAllCompletions && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;

    return todos.filter(todo => {
      const statusMatches = showAllCompletions || todo.Completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches;
    })

  }
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  filteredTodos => filteredTodos.map(todo => todo.id)
)

