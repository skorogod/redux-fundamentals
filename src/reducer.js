import { combineReducers } from "redux";

import todosReduccer from "./features/todos/todosSlice";
import filtersReducer from "./features/filters/filtersSlice";

const rootReducer = combineReducers({
  todos: todosReduccer,
  filters: filtersReducer
})

export default rootReducer;
