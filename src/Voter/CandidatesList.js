import React from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CandidateCard from './CandidateCard';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function CandidatesList({cards}) {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
    {/* End hero unit */}
    <Grid container spacing={4}>
        {cards && cards.map((card, i) => (
        <CandidateCard {...card} key={i}/>
        ))}
    </Grid>
    </Container>
  )
}
