import FileUpload from "@/components/FileUpload";
import Layout from "@/components/Layout";
import StepWrapper from "@/components/StepWrapper";
import { useInput } from "@/hooks/useInput";
import { Grid, Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { server } from "@/API/server";

let initPicture: any | null;
let initAudio: any | null;

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [picture, setPicture] = useState(initPicture);

  const [audio, setAudio] = useState(initAudio);

  const name = useInput("");

  const artist = useInput("");

  const text = useInput("");

  const router = useRouter();

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      axios
        .post(`${server}/tracks`, formData)
        .then((resp) => router.push("/tracks"))
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
        return name.value === "";
      case 1:
        return !picture;
      case 2:
        return !audio;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <Layout>
      <StepWrapper activeStep={activeStep}>
        <div
          style={{
            paddingTop: 30,
            paddingLeft: 50,
            color: "rgb(43, 161, 152)",
          }}
        >
          {activeStep == 0 && (
            <Grid container direction="column" style={{ padding: 20 }}>
              <h1>Step1</h1>
              <TextField
                {...name}
                style={{ marginTop: 10 }}
                label={"track name..."}
              />
              <TextField
                {...artist}
                style={{ marginTop: 10 }}
                label={"artist..."}
              />
              <TextField
                {...text}
                style={{ marginTop: 10 }}
                label={"text..."}
                multiline
                rows={3}
              />
            </Grid>
          )}
          {activeStep == 1 && (
            <>
              <h1>Step 2</h1>
              <FileUpload setFile={setPicture} accept={"image/*"}>
                {picture ? (
                  <h2>OK</h2>
                ) : (
                  <Button>
                    <h2>Upload the Image</h2>
                  </Button>
                )}
              </FileUpload>
            </>
          )}
          {activeStep == 2 && (
            <>
              <h1>Step 3</h1>
              <FileUpload setFile={setAudio} accept={"audio/*"}>
                {audio ? (
                  <h2>OK</h2>
                ) : (
                  <Button>
                    <h2> Upload Audio</h2>
                  </Button>
                )}
              </FileUpload>
            </>
          )}
        </div>
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button
          sx={{ color: "white" }}
          disabled={backDissabled()}
          onClick={back}
        >
          Back
        </Button>
        <Button
          sx={{ color: "white" }}
          disabled={nextDissabled()}
          onClick={next}
        >
          Next
        </Button>
      </Grid>
    </Layout>
  );
};
export default Create;
