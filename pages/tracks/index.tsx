import Layout from "@/components/Layout";
import TrackList from "@/components/TrackList";
import type { NextPage } from "next";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import useTypedSelector from "../../hooks/useTypedSelector";
import { useEffect, useRef,useState } from "react";
import { NextThunkDispatch } from "../../Store";
import { fetchTracks,searchFetchTracks,albumFetchTracks } from "../../Store/action-creators/track";
import { useDispatch } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

interface QueryParams {
  id: string;
  name: string;
}

const Index: NextPage = () => {

  const router = useRouter();

  const { id,name} = router.query as QueryParams;

  const { error, tracks } = useTypedSelector((state) => state.track);

  const dispatch = useDispatch<NextThunkDispatch>();

  const isMounted = useRef(false);

  const  [query,setQuery] = useState<string>('')

  const  [album,setAlbum] = useState(false)
  
  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value)
    dispatch(searchFetchTracks(e.target.value))
  }
  
  useEffect(() => {
    if (isMounted.current) {
      if(id){
        dispatch(albumFetchTracks(id));
        setAlbum(true)
      }else{
        dispatch(fetchTracks());
        setAlbum(false)
      }
     } else {
       isMounted.current = true;
  }
 },[id]);

  if (error) {
    return (
      <Layout>
        <h1>{error}</h1>
      </Layout>
    );
  }else if (album) {
    return (
    <Layout title={`${name} - музыкальная платформа`}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 ,backgroundColor:'#191919'}}>
          <Box p={3}>
            <Grid container justifyContent="space-between" style={{color:'white'}}>
              <h1>{name}</h1>
              <Button onClick={() => router.push("/tracks/")}>
                <h3>to Tracks</h3>
              </Button>
            </Grid>
          </Box>
          <TrackList isAlbum={id} tracks={tracks} />
        </Card>
      </Grid>
    </Layout>)
   }else{
    return (
    <Layout title={'Список трэков  - музыкальная платформа'}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 ,backgroundColor:'#191919'}}>
          <Box p={3}>
            <Grid container justifyContent="space-between" style={{color:'white'}}>
              <h1>AllTracks</h1>
              <Button onClick={() => router.push("/tracks/create")}>
                <h3>Add</h3>
              </Button>
            </Grid>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon  />
            </SearchIconWrapper>
            <StyledInputBase
              value={query}
              onChange={search}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <TrackList isAlbum={id} tracks={tracks} />
        </Card>
      </Grid>
    </Layout>
  )
  }
};
export default Index;

//================= S T Y L E S =====================================

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color:'white',
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
     width: '20ch',
    },
  },
}));
//=====================================================================
