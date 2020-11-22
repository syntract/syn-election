import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
	Button,
	Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmationModal from "./ConfirmationModal";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardButton: {
    "& button": {
      width: "100%",
      backgroundColor: "#1e62af",
    },
  },
}));

export default function CandidateCard({card}) {
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item key={card} xs={12} sm={6} md={6}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  Partid Politic
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={8}>
                <Typography gutterBottom variant="h6" component="p">
                  Ion Ionescu
                </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.cardButton}>
          <Button size="large" color="primary" variant="contained" onClick={() => setOpen(true)}>
            View
          </Button>
        </CardActions>
      </Card>
			<ConfirmationModal open={open} handleClose={() => setOpen(false)}/>
    </Grid>
  );
}

