import { TrackAction, TrackActionTypes } from "@/types/track";
import axios from "axios";
import { Dispatch } from "redux";

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/tracks");
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "произошла ошибка при загрузке данных",
      });
    }
  };
};

export const searchFetchTracks = (query:string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/tracks/search?query=" + query);
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "произошла ошибка при загрузке данных",
      });
    }
  };
};
export const albumFetchTracks = (id:string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/albums/"+id);
      const album = response.data

      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: album.tracks });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "произошла ошибка при загрузке альбома",
      });
    }
  };
};
