import { createStore, applyMiddleware, AnyAction, Store } from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer, RootState } from "./reducers";

import { Context } from "next-redux-wrapper";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const makeStore = (context?: Context): Store<RootState> =>
  createStore(reducer, composedEnhancer);
 export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
