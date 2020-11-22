import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TimerIcon from "@material-ui/icons/Timer";
import ReplayIcon from "@material-ui/icons/Replay";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  buttons: {
      margin: "50px",
      display: "flex",
      justifyContent: "center"
  }
}));

export default function Buttons({onStop, onRestart}) {
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.button}
        startIcon={<TimerIcon />}
        onClick={onStop}
      >
        STOP Voting
      </Button>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <Button
        variant="outlined"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<ReplayIcon />}
        onClick={onRestart}
      >
        DEBUG: Enable Voting
      </Button>
    </div>
  );
}
