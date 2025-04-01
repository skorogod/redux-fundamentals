import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import { sayHiOnDispatch, includeMeaningOfLife } from './exampleAddons/enhancers'
import { print1, print2, print3 } from './exampleAddons/middleware'
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

let preloadedState;
const persistedTodosString = localStorage.getItem("todos");

if (persistedTodosString) {
  preloadedState = {
    todos: JSON.parse(persistedTodosString),
  }
};

const composeEnhancer = composeWithDevTools(
  applyMiddleware(thunk)
)

const middlewareEnhancer = applyMiddleware(print1, print2, print3)


//const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife)
const store = createStore(rootReducer, composeEnhancer)
export default store;
