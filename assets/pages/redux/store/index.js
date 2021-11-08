import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk"
import combineReducers from "../reducer";
const configStore = createStore(combineReducers, {}, applyMiddleware(ReduxThunk))
export { configStore }