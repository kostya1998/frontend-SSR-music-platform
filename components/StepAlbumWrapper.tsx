import { Card, Grid, Step, StepLabel, Stepper,Container } from "@mui/material";
import { ReactNode } from "react";

interface StepAlbumWrapperProps {
  activeStep: number;
  children: ReactNode;
}
const steps: String[] = [
  "Album information",
  "Upload Image",
];
const StepAlbumWrapper: React.FC<StepAlbumWrapperProps> = ({ activeStep, children }) => {
  return (
      <Container >
      <Stepper activeStep={activeStep} >
        {steps.map((step, index) => (
            <Step sx={{backgroundColor:'darkgray',borderRadius:5}} key={index} completed={activeStep > index} >
            <StepLabel  >{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70 ", height: 270 }}
      >
        <Card style={{ width: 600, marginTop: 30,backgroundColor: 'darkgray' }}>{children}</Card>
      </Grid>
    </Container>
  );
};
export default StepAlbumWrapper;