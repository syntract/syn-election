import React from 'react';
import Chart from './Chart';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Buttons from './Buttons';
import web3 from "../web3";
import election from "../election";
import Spinner from "../Spinner";


const LOADING_MSG =
  "Ongoing.";

const data = [
  {
    name: "1",
    Votes: 4,
  },
  {
    name: "2",
    Votes: 14,
  },
  {
    name: "3",
    Votes: 9,
  },
  {
    name: "8",
    Votes: 7,
  },
];

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
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
  footer: {
    backgroundColor: "#eee",
    padding: theme.spacing(6),
  },
}));


export default function Manager() {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [loadingRestart, setLoadingRestart] = React.useState(false);
  const [loadingResults, setLoadingResults] = React.useState(false);
  const [votingOver, setVotingOver] = React.useState(false);
  const [results, setResults] = React.useState(null);

    const stopElection = async () => {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      await election.methods.stopElection().send({ from: accounts[0] });
      setVotingOver(true);
      setLoading(false);
    };

    const restartElection = async () => {
      setLoadingRestart(true);
      const accounts = await web3.eth.getAccounts();
      await election.methods.debugRestartElection().send({ from: accounts[0] });
      setVotingOver(false);
      setLoadingRestart(false);
    };

    const getResults = async () => {
        setLoadingResults(true);
      const accounts = await web3.eth.getAccounts();
      const result = await election.methods
        .getResults()
        .call({ from: accounts[0] });
      console.log(result);
      setResults(result.map((item) => ({
          name: web3.utils.hexToAscii(item.name),
          Votes: item.voteCount,
        })))
        setLoadingResults(false);
    };

  return (
    <React.Fragment>
      <CssBaseline />
      <Buttons
        onStop={async () => {
          await stopElection();
          await getResults();
        }}
        onRestart={restartElection}
      />
      {loading && <Spinner />}
      {loading && <span>{LOADING_MSG}</span>}
      {results && <Chart data={results} />}
    </React.Fragment>
  );
}