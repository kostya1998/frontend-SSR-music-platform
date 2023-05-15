import Layout from "@/components/Layout";
import { ITrack } from "@/types/track";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useInput } from "@/hooks/useInput";
import {server} from '@/API/server'


interface TrackPageProps {
  serverTrack: ITrack | null;
}




export default function TrackPage({
  pageProps,
}: {
  pageProps: TrackPageProps;
}) {
  const [track, setTrack] = useState<ITrack | null>(pageProps.serverTrack);
  const username = useInput('');

  const text = useInput('');

  const router = useRouter();
  if (!track) {
    return <div>Ошибка загрузки трека</div>;
  }

  const addComment = async () => {
    try {
      const response = await axios.post(
        `${server}/tracks/comments`,
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        }
      );
      setTrack({ ...track, comments: [...track.comments, response.data] });



      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout
      title={`${track.name}/${track.artist}`}
      keywords={"музыка, артисты" + track.name + "," + track.artist}
    >
      <Button
        variant="outlined"
        style={{ fontSize: 17 }}
        onClick={() => router.push("/tracks")}
      >
        К списку
      </Button>
    <div style={{ margin: "20px 0", padding:20, backgroundColor:'white', borderRadius:20}}>
      <Grid container >
        <img
          src={server +'/'+ track.picture}
          style={{ width: 200, height: 200 }}
        />
        <div style={{ marginLeft: "30px" }}>
          <h1>{track?.name}</h1>
          <h2>исполнители: {track.artist}</h2>
          <h3>прослушиваний: {track.listens}</h3>
        </div>
      </Grid>
      <h2>Текст</h2>
      <p>{track.text}</p>
      <Grid container>
        <TextField
          label="Ваше имя"
          {...username}
          fullWidth
          style={{ paddingBottom: 20 }}
        />
        <TextField
          label="Ваш комментарий"
          {...text}
          fullWidth
          multiline
          rows={4}
          style={{ paddingBottom: 20 }}
        />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comment, index) => (
          <div key={index}>
            <h5>@{comment.username}</h5>
            <div>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<TrackPageProps> = async ({
  params,
}) => {
  const id = params?.id;

  if (!id) {
    return {
      props: {
        serverTrack: null,
      },
    };
  }
  try {
    const response = await axios.get(`${server}/tracks/${id}`);
    const serverTrack = response.data;

    return {
      props: {
        serverTrack,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        serverTrack: null,
      },
    };
  }
};
