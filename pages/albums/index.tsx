import Layout from "@/components/Layout";
import AlbumList from "@/components/AlbumList";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import useTypedSelector from "../../hooks/useTypedSelector";
import { useEffect, useRef } from "react";
import { NextThunkDispatch } from "../../Store";
import { fetchAlbums } from "../../Store/action-creators/album";
import { useDispatch } from "react-redux";

export default function Index() {

  const router = useRouter();

  const { error, albums } = useTypedSelector((state) => state.album);

  const dispatch = useDispatch<NextThunkDispatch>();

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(fetchAlbums());
    } else {
      isMounted.current = true;
    }
  }, []);
  if (error) {
    return (
      <Layout>
        <h1>{error}</h1>
      </Layout>
    );
    }
  return (
    <div style={{backgroundColor:'#3c4043'}}>

    <Layout title={'Список Альбомов  - музыкальная платформа'}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900,padding:50,backgroundColor:'#191919' }}>
          <Box p={3}>
            <Grid container justifyContent="space-between" style={{color:"white"}}>
              <h1>Albums</h1>
              <Button onClick={() => router.push("/albums/create")}>
                <h2>Create</h2>
              </Button>
            </Grid>
          </Box>
          <AlbumList albums={albums}/>
        </Card>
      </Grid>
    </Layout>
    </div>
  );
}

