import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import web3 from "../web3";
import election from "../election";
import Spinner from '../Spinner';


const ERROR_MSG = "Votul nu a putut fi inregistrat.";
const SUCCESS_MSG = "Votul a fost inregistrat cu succes!";
const LOADING_MSG =
  "Votul este in curs de inregistrare. Procesul poate dura pana la cateva minute.";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    "& .MuiButton-containedPrimary": {
      backgroundColor: "#1e62af",
    },
    "& .MuiButton-textPrimary": {
      color: "#1e62af",
    },
  },
}))(MuiDialogActions);

export default function ConfirmationModal({ open, handleClose, name, selection }) {

     
    const [loading, setLoading] = React.useState(false);  
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

const onSubmitHandle = async () => {
  setLoading(true);

  const accounts = await web3.eth.getAccounts();

  try {
    const res = await election.methods
      .vote(selection)
      .send({ from: accounts[0] });
    console.log(res);
    setSuccess(true);
  } catch (e) {
    console.log(e);
    setError(true)
    console.log("----");
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Confirmare selectie
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h6" component="p" align="center">
              Selectia dumneavoastra este
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <Typography
                gutterBottom
                variant="h5"
                component="h3"
                align="center"
              >
                Partid Politic
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Typography gutterBottom variant="h6" component="p">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h7" component="p">
              Pentru a confirma selectia dumneavoastra, apasati butonul
              "Votati".
            </Typography>
            <Typography gutterBottom variant="h7" component="p">
              Pentru a modifica selectia, apasati butonul "Revenire".
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary" size="large">
          Revenire
        </Button>
        <Button
          autoFocus
          onClick={onSubmitHandle}
          color="primary"
          variant="contained"
          size="large"
        >
          Votati
        </Button>
      </DialogActions>
      {loading && <Spinner />}
      {loading && <span>{LOADING_MSG}</span>}
      {!loading && (success || error) && (
        <span className={error ? "error-msg" : "success-msg"}>
          {error ? ERROR_MSG : SUCCESS_MSG}
        </span>
      )}
    </Dialog>
  );
}
