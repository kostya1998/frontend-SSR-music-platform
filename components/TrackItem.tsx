import { ITrack } from "@/types/track";
import {  Pause, PlayArrow } from "@mui/icons-material";
import { Card, Grid, IconButton, Button } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/TrackItem.module.scss";
import useTypedSelector from "./../hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchTracks } from "../Store/action-creators/track";
import { useDispatch } from "react-redux";
import { NextThunkDispatch } from "../Store";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


interface TrackItemProps {
  track: ITrack;
  isAlbum: string | null;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, isAlbum }) => {
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();

  const { setActive, pauseTrack, playTrack } = useActions();

  const { playing, active } = useTypedSelector((state) => state.player);

  const dispatch = useDispatch<NextThunkDispatch>();

  useEffect(() => {
    if (active?._id === track._id) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [active]);

  const addTrack = (id: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    router.push({
      pathname: "/albums",
      query: { id: id },
    });
  };

  const removeTrack = async (
    trackId: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    try {
      await axios.put(`http://localhost:5000/albums/${isAlbum}/${trackId}`);
      router.push("/albums");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTrack = async (
    id: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();

    const result = window.confirm(`Вы уверены, что хотите выполнить это действие?`);
if (result) {
  try {
    await axios.delete("http://localhost:5000/tracks/" + id);
    await dispatch(fetchTracks());
  } catch (error) {
    console.log("ошибка");
  }
}
  };

  return (
    <Card
      className={
        isActive
          ? `${styles.track} ${styles.ActiveTrue}`
          : `${styles.track} ${styles.ActiveFalse}`
      }
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <div>
        {isActive ? (
          playing ? (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                pauseTrack();
              }}
            >
              <Pause />
            </IconButton>
          ) : (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                playTrack();
              }}
            >
              <PlayArrow />
            </IconButton>
          )
        ) : (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              setActive(track);
            }}
          >
            <PlayArrow />
          </IconButton>
        )}
      </div>
      <img
        className={styles.Img}
        src={"http://localhost:5000/" + track.picture}
      />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      {isAlbum ? (
        <Button onClick={(event) => removeTrack(track._id, event)}>
          remove from album 
        </Button>
      ) : (
        <>
          <Button onClick={(event) => addTrack(track._id, event)}>
            add to Album 
          </Button>
          <IconButton
            onClick={(event) => deleteTrack(track._id, event)}
            className={styles.delete}
          >
            <DeleteForeverIcon />
          </IconButton>
        </>
      )}
    </Card>
  );
};

export default TrackItem;
