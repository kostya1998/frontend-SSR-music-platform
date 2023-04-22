import { PlayerAction, PlayerActionTypes, PlayerState } from "@/types/player";

const initialState: PlayerState = {
  active: null,
  volume: 50,
  duration: 0,
  currentTime: 0,
  playing: false,
};

export const playerReducer = (
  state = initialState,
  action: PlayerAction
): PlayerState => {
  switch (action.type) {
    case PlayerActionTypes.PLAY:
      return { ...state, playing: true };
    case PlayerActionTypes.PAUSE:
      return { ...state, playing: false };
    case PlayerActionTypes.SET_ACTIVE:
      return { ...state, active: action.payload, duration: 0, currentTime: 0 };
    case PlayerActionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case PlayerActionTypes.SET_DURATION:
      return { ...state, duration: action.payload };
    case PlayerActionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    default:
      return state;
  }
};
