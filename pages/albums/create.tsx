import FileUpload from "@/components/FileUpload";
import Layout from "@/components/Layout";
import StepAlbumWrapper from "@/components/StepAlbumWrapper";
import { useInput } from "@/hooks/useInput";
import { Grid, Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import {server} from '@/API/server'

let initPicture: any | null;

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [picture, setPicture] = useState(initPicture);

  const name = useInput("");

  const author = useInput("");

  const router = useRouter();

  const next = () => {
    if (activeStep !== 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", author.value);
      formData.append("picture", picture);
      axios
        .post(`${server}/albums`, formData)
        .then((resp) => router.push("/albums"))
        .catch((e) => console.log(e));
    }
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  const backDissabled = (): boolean => {
    switch (activeStep) {
      case 0:
        return true;
      default:
        return false;
    }
  };

  const nextDissabled = (): boolean => {
    switch (activeStep) {
      case 0:
        return name.value === "" || author.value === "";
      case 1:
        return !picture;
      case 2:
        return true;
      default:
        return false;
    }
  };

  return (
    <Layout>
      <StepAlbumWrapper activeStep={activeStep} >
        <div style={{ paddingLeft: 20,backgroundColor:'darkgray', }}>
          {activeStep == 0 && (
            <Grid container direction="column" style={{ padding: 20,color:'#3c4043' }}>
              <h1>Step1</h1>
              <TextField
                {...name}
                style={{ marginTop: 10 }}
                label={"album name..."}
              />
              <TextField
                {...author}
                style={{ marginTop: 10 }}
                label={"author..."}
              />
            </Grid>
          )}
          {activeStep == 1 && (
            <>
              <h1>Step 2</h1>
              <FileUpload setFile={setPicture} accept={"image/*"}>
                <Button>Загрузить изображение</Button>
              </FileUpload>
              {picture ? (
                <p>Изображение загружено</p>
              ) : (
                <p>Загрузите изображение</p>
              )}
            </>
          )}
        </div>
      </StepAlbumWrapper>
      <Grid container justifyContent="space-between" style={{color:'darkgray'}}>
        <Button disabled={backDissabled()} onClick={back}>
        Back
        </Button>
        <Button disabled={nextDissabled()} onClick={next}>
          Next
        </Button>
      </Grid>
    </Layout>
  );
};
export default Create;
