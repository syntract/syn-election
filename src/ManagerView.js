import React from "react";
import web3 from "./web3";
import election from "./election";
import Avatar from "avataaars";
import { Button, Spinner, Form, FormGroup } from "react-bootstrap";

export default class ManagerView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      manager: "",
      proposals: [],
      stringValues: [],
      proposalNames: [],
      results: [],
      selection: null,
      loading: false,
      votingOver: null,
      errorResults: false,
      errorStop: false,
      errorRestart: false,
    };
  }

  async componentDidMount() {
    const manager = await election.methods.owner().call();

    const proposalNames = await election.methods.getProposals().call();
    // let votingOver = await election.methods.stopVote().call()
    // console.log(votingOver);

    const stringValues = proposalNames.map((item) =>
      web3.utils.hexToAscii(item).replace(/\0/g, "")
    );
    this.setState({ manager, proposalNames, stringValues });
  }

  onClickHandle = (i) => {
    console.log(i);
    this.setState({ selection: i });
  };

  onSubmitHandle = async () => {
    this.setState({ loading: true });
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const res = await election.methods
      .vote(this.state.selection)
      .send({ from: accounts[0] });
    console.log(res);
    this.setState({ loading: false });
  };

  stopElection = () => {
    this.setState({ loading: true });
    election.methods
      .stopElection()
      .call()
      .then((result) => {
        this.setState({
          votingOver: true,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          errorStop: true,
        });
      });
  };

  restartElection = () => {
    this.setState({ loadingRestart: true });
    election.methods
      .debugRestartElection()
      .call()
      .then((result) => {
        this.setState({
          votingOver: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingRestart: false,
          errorRestart: true,
        });
      });
  };

  getResults = () => {
    this.setState({ loadingResults: true });
    election.methods
      .getResults()
      .call()
      .then((result) => {
        this.setState({
          results: result.map((item) => {
            item.name = web3.utils.hexToAscii(item.name);
            item.voteCount = item.voteCount;
          }),
          loadingResults: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingResults: false,
          errorResults: true,
        });
      });
  };

  actionButtons = () => (
    <Form>
      <div>
        <Button
          variant="primary"
          size="lg"
          id="stopVoting"
          disabled={this.state.votingOver}
          onClick={this.getResults}
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{ display: this.state.loadingResults ? "block" : "none" }}
          />
          Afisare rezultate
        </Button>
        <p
          id={this.state.errorResults ? "getResultsSpanShow" : "getResultsSpan"}
        >
          Functie destinata doar managerului!
        </p>
      </div>
      <div>
        <Button
          variant="info"
          size="lg"
          id="stopVoting"
          onClick={this.restartElection}
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{ display: this.state.loadingRestart ? "block" : "none" }}
          />
          Reporneste votarea
        </Button>
        <p
          id={this.state.errorRestart ? "restartSpanShow" : "restartSpan"}
        >
          Functie destinata doar managerului!
        </p>
      </div>
      <div>
        <Button
          variant="danger"
          size="lg"
          id="stopVoting"
          disabled={this.state.votingOver}
          onClick={this.stopElection}
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{ display: this.state.loading ? "block" : "none" }}
          />
          Incheie votarea
        </Button>
        <p
          id={this.state.errorStop ? "stopSpanShow" : "stopSpan"}
        >
          Functie destinata doar managerului!
        </p>
      </div>
    </Form>
  );

  render() {
    return (
      <div className="parent">
        <div className="title">
          <h1>Sesiune de votare demo</h1>

          <h4>
            Managerul Contractului: <span>{this.state.manager}</span>
          </h4>
          <br/>
          <h1>{`Votare ${this.state.votingOver ? 'incheiata' : 'in desfasurare'}!`}</h1>
        </div>
        <div className="action-content">
          {this.actionButtons()}
          {this.state.winner && (
            <>
              <h3 style={{ margin: "40px" }}>Votare incheiata</h3>
              <div className="winner">
                <Avatar
                  avatarStyle="Circle"
                  topType="Turban"
                  accessoriesType="Blank"
                  hatColor="Default"
                  facialHairType="Blank"
                  clotheType="BlazerShirt"
                  eyeType="Default"
                  eyebrowType="Default"
                  mouthType="Default"
                  skinColor="Default"
                />
                <div className="data">
                  <p>{this.state.winner}</p>
                  <br />
                  <span>Candidat Castigator</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
