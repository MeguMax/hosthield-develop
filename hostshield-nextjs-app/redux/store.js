import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const middleware = [thunk];
//FOR REDUX DEBUGGING USE THIS-------
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const makeStore = () => createStore(rootReducer, enhancer);
//-----------------
//FOR REDUX PRODUCTION USE THIS-------
// const makeStore = createStore(rootReducer, compose(applyMiddleware(...middleware)));
//-----------------
export const wrapper = createWrapper(makeStore);
