import { AlbumAction, AlbumActionTypes } from "@/types/album";
import axios from "axios";
import { Dispatch } from "redux";

export const fetchAlbums = () => {
  return async (dispatch: Dispatch<AlbumAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/albums");
      dispatch({ type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data });
    } catch (e) {
      dispatch({
        type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
        payload: "произошла ошибка при загрузке данных",
      });
    }
  };
};
