import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import books from "./Books/reducer";

export default createStore(
  combineReducers({
    books
  }),
  {},
  applyMiddleware(logger, thunk, promise)
);
