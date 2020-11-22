import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import stema from "./assets/Stema.png";

const useStyles = makeStyles((theme) => ({
  stema: {
    width:"100px",
    height:"auto",
    padding: "10px"
  },
  appBar: {
    backgroundColor: "#374452"
  }
}));



export default function Bar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar} position="relative">
        <Toolbar>
            <img className={classes.stema} src={stema} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
