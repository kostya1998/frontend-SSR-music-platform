import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { useActions } from "@/hooks/useActions";
import useTypedSelector from "@/hooks/useTypedSelector";
import TrackProgress from "./TrackProgress";
import { Grid, IconButton,Box } from "@mui/material";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import styles from "../styles/Player.module.scss";

let audio: any;

const Player = () => {

  const { pauseTrack, setActive, playTrack, setCurrentTime, setDuration, setVolume } = useActions();

  const { active, currentTime, duration, playing, volume } = useTypedSelector((state) => state.player);

  const { tracks } = useTypedSelector((state) => state.track);


  useEffect(() => { audio ? setAudio() : audio = new Audio() }, [active]);

  useEffect(() => { playing ? audio.play() : audio.pause() }, [playing]);


  const setAudio = () => {
    switch (true) {
      case active!==null && audio.src !== "http://localhost:5000/" + active.audio:
    
          audio.src =  "http://localhost:5000/" + active.audio;
          audio.volume =  volume / 100;
          audio.onloadedmetadata = () => { setDuration(Math.ceil(audio.duration))};
          audio.ontimeupdate = () => { 
            setCurrentTime(Math.ceil(audio.currentTime));
             if (audio.currentTime === audio.duration) {
                nextTrack();
            }
          };
          audio.oncanplaythrough = () => {
            audio.play();
            playTrack();
          }
            break;
      default:
            break;
      }
  };
  
 
  const nextTrack = () => {
      if (tracks.length === 1) {
          audio.currentTime = 0;
          setCurrentTime(0);
      } else {
          const nextIndex = tracks.findIndex(track => track === active);
          const next = nextIndex >= tracks.length - 1 ? 0 : nextIndex + 1;
          setActive(tracks[next]);
      }
  };

  const prevTrack = () => {
      if (tracks.length === 1) {
          audio.currentTime = 0;
          setCurrentTime(0);
      } else {
          const prevIndex = tracks.findIndex(track => track === active);
          const prev = prevIndex > 0 ? prevIndex - 1 : tracks.length - 1;
          setActive(tracks[prev]);
      }
  };
 
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
      audio.volume = Number(e.target.value) / 100;
      setVolume(Number(e.target.value));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
      audio.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
  };
  
  const normalizeTime = (time:number):string => {
      const timeMinutes = Math.floor(time / 60);
      const timeSeconds = Math.ceil(time % 60);
      return`${timeMinutes}:${timeSeconds < 10 ? '0' : ''}${timeSeconds}`;
  };

  if (!active) {
    return null;
  }

  return (
   
    <Box sx={{ display: "flex" }}>
      <div className={styles.player}>
      <IconButton  onClick={prevTrack}>
        <SkipPreviousIcon />
      </IconButton>
      { playing ?
      <IconButton onClick={pauseTrack}>
         <Pause />
      </IconButton>
      :
      <IconButton onClick={playTrack}>
         <PlayArrow />
      </IconButton>
      }
      <IconButton onClick={nextTrack}>
        <SkipNextIcon />
      </IconButton>

      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div style={{ color: "white" }}>{active?.name}</div>
        <div style={{ fontSize: 13, color: "darkgray" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        stringLeft={normalizeTime(currentTime)}
        stringRight={normalizeTime(duration)}
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress 
      stringLeft={String(volume)}
      stringRight={'100'}
      left={volume} right={100} onChange={changeVolume} />
    </div>
    </Box>
  );
};
export default Player;
