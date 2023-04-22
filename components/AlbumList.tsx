import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Delete } from "@mui/icons-material";

import IconButton from "@mui/material/IconButton";
import { IAlbum } from "@/types/album";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { fetchAlbums } from "../Store/action-creators/album";
import { useDispatch } from "react-redux";

interface AlbumListProps {
  albums: IAlbum[];
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
  const router = useRouter();

  const { id } = router.query;

  const trackId = String(id);

  const [hoveredIndex, setHoveredIndex] = useState<null | string>(null);

  const dispatch = useDispatch<NextThunkDispatch>();

  const handleMouseEnter = (index: string) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  
  const handleClick = async (albumId: string) => {
    try {
      const resp = await axios.put(`http://localhost:5000/tracks/${trackId}/${albumId}`);
      router.push("/tracks");
    } catch (e) {
      console.log(e);
    }
  };

  const setAlbum = (id: string, name: string) => {
    router.push({
      pathname: "/tracks",
      query: { id: id, name: name },
    });
  };

  const deleteAlbum = async (
    id: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    try {
      const response = await axios.delete("http://localhost:5000/albums/" + id);
       await dispatch(fetchAlbums())
    } catch (error) {
      console.log("ошибка");
    }
  };


  if (!id) {
    return (
      <ImageList cols={3}>
        {albums.map((album) => (
          <ImageListItem
            onClick={() => setAlbum(album._id, album.name)}
            key={album._id}
            style={{ margin: 10 }}
          >
            <img
              src={"http://localhost:5000/" + album.picture}
              alt={album.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={album.name}
              subtitle={album.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${album.name}`}
                  onClick={(event) => deleteAlbum(album._id, event)}
                >
                  <Delete />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  } else {
    return (
      <ImageList cols={3}>
        {albums.map((album) => (
          <ImageListItem
            onClick={() => handleClick(album._id)}
            key={album._id}
            style={{ margin: 10 }}
          >
            <img
              src={"http://localhost:5000/" + album.picture}
              alt={album.name}
              loading="lazy"
              style={{
                filter:
                  hoveredIndex === album._id
                    ? "brightness(1.5)"
                    : "brightness(1)",
              }}
              onMouseEnter={() => handleMouseEnter(album._id)}
              onMouseLeave={handleMouseLeave}
            />
            <ImageListItemBar
              title={hoveredIndex === album._id ? "choose" : album.name}
              subtitle={hoveredIndex === album._id ? "" : album.author}
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }
};
export default AlbumList;
