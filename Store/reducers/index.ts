import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, AnyAction } from "redux";
import { playerReducer } from "./playerReducer";
import { trackReducer } from "./trackReducer";
import { albumReducer } from "./albumReducer";

const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
  album: albumReducer
});

export const reducer = (state: any | RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
