import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { ReactNode } from "react";

interface StepWrapperProps {
  activeStep: number;
  children: ReactNode;
}
const steps: String[] = [
  "Информация о трэке",
  "Загрузить обложку",
  "Загрузить аудио",
];
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70 ", height: 270 }}
      >
        <Card style={{ width: 600, marginTop: 30 }}>{children}</Card>
      </Grid>
    </Container>
  );
};
export default StepWrapper;
