import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import ModeCard from './ModeCard';
import ViewTabs from './Tabs';
import ManagerView from "./ManagerView";
import VoterView from "./VoterView";
import Voter from './Voter/Voter';
import {Grid} from '@material-ui/core';
import voteIcon from './assets/vote2.png';
import cpanelIcon from './assets/cpanel.png';
import Bar from "./Bar";
import Headline from "./Headline";

const modes = [
  {
    title: "Interfata de votare",
    imgSrc: voteIcon,
    slug: "vote"
  },
  {
    title: "Administrare",
    imgSrc: cpanelIcon,
    slug: "manage"
  },
];

const App = () => (
  <Router>
    <Bar />
    <Headline />
    <Switch>
      <Route path="/vote">
        <Voter />
      </Route>
      <Route path="/manage">
        <ManagerView />
      </Route>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  </Router>
);

const Landing = () => (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
      <Grid
        container
        spacing={8}
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        {modes.map((item) => (
          <Grid item>
            <Link to={`/${item.slug}`}>
              <ModeCard {...item} />
            </Link>
          </Grid>
        ))}
      </Grid>
      {/* <ViewTabs /> */}
    </div>
)

export default App;
