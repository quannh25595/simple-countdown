import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography, styled } from "@mui/material";

interface FormProps {
  onSubmit: (trainingSeconds: number, restSeconds: number) => void;
}

const StyledButton = styled(Button)({
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  padding: 0,
});

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [trainingSeconds, setTrainingSeconds] = useState("");
  const [restSeconds, setRestSeconds] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const lastTrainingTime = localStorage.getItem("lastTrainingTime");
    const lastRestTime = localStorage.getItem("lastRestTime");

    if (lastTrainingTime && lastRestTime) {
      setTrainingSeconds(lastTrainingTime);
      setRestSeconds(lastRestTime);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trainingTime = parseInt(trainingSeconds, 10);
    const restTime = parseInt(restSeconds, 10);

    if (trainingTime >= 0 && restTime >= 0) {
      localStorage.setItem("lastTrainingTime", trainingSeconds);
      localStorage.setItem("lastRestTime", restSeconds);
      onSubmit(trainingTime, restTime);
    } else {
      setError(true);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ padding: "20px" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <TextField
                type="number"
                label="Thời gian tập luyện"
                fullWidth
                value={trainingSeconds}
                onChange={(e) => setTrainingSeconds(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                label="Thời gian nghỉ ngơi"
                fullWidth
                value={restSeconds}
                onChange={(e) => setRestSeconds(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {error && (
                <Typography variant="body2" color="error">
                  Training time and rest time cannot be negative.
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <StyledButton variant="contained" type="submit">
                Băt đầu
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Form;
