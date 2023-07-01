import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Button, styled } from "@mui/material";

interface CountdownProps {
  trainingSeconds: number;
  restSeconds: number;
  onCancel: () => void;
}

const StyledButton = styled(Button)({
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  padding: 0,
});

const Countdown: React.FC<CountdownProps> = ({
  trainingSeconds,
  restSeconds,
  onCancel,
}) => {
  const [time, setTime] = useState(trainingSeconds);
  const [isTraining, setIsTraining] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>  | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setIsTraining((prevIsTraining) => {
            const nextIsTraining = !prevIsTraining;
            setTime(nextIsTraining ? trainingSeconds : restSeconds);
            if (nextIsTraining) {
              setCycleCount((prevCount) => prevCount + 1);
              playSound();
            }
            return nextIsTraining;
          });
          return prevTime;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [trainingSeconds, restSeconds]);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/1082/1082-preview.mp3"
    );
  }, []);

  const handleCancel = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onCancel();
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: isTraining ? "#ffe0b2" : "#c8e6c9",
  };

  return (
    <Grid container style={containerStyle}>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <div style={{textAlign: 'center'}}>
          <Typography variant="h5">
            {isTraining ? "Tập luyện" : "Nghỉ ngơi"}
          </Typography>
          <Typography variant="h1" align="center">
            {time}
          </Typography>
          <Typography variant="h6" align="center">
            Chu trình: {cycleCount}
          </Typography>
          <StyledButton variant="outlined" onClick={handleCancel}>
            Dừng
          </StyledButton>
        </div>
      </Grid>
    </Grid>
  );
};

export default Countdown;
