import { ITrack } from "@/types/track";
import { Box, Grid } from "@mui/material";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: ITrack[];
  isAlbum:string | null
}

const TrackList: React.FC<TrackListProps> = ({ tracks,isAlbum }) => {

  return (
    <Grid >
      <Box p={2}>
        {tracks.map((track) => (
          <div key={track._id}>
            <TrackItem
            isAlbum={isAlbum}
              track={track}
            />
          </div>
        ))}
      </Box>
    </Grid>
  );
};
export default TrackList;
