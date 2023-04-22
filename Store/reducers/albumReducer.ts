import { AlbumAction, AlbumActionTypes, AlbumState } from "@/types/album";

const initialState: AlbumState = {
  albums: [],
  error: "",
};

export const albumReducer = (
  state = initialState,
  action: AlbumAction
): AlbumState => {
  switch (action.type) {
    case AlbumActionTypes.FETCH_ALBUMS:
      return { ...state, albums: action.payload, error: "" };
    case AlbumActionTypes.FETCH_ALBUMS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
