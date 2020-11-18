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

  stopElection = async () => {
    this.setState({ loading: true });
    const accounts = await web3.eth.getAccounts();
    await election.methods
      .stopElection()
      .send({ from: accounts[0] })
        this.setState({
          votingOver: true,
        });
  };

  restartElection = async () => {
    this.setState({ loadingRestart: true });
    const accounts = await web3.eth.getAccounts();
    await election.methods
      .debugRestartElection()
      .send({ from: accounts[0] })
        this.setState({
          votingOver: false,
        });
  };

  getResults = async () => {
    this.setState({ loadingResults: true });
    const accounts = await web3.eth.getAccounts();
    const result = await election.methods
      .getResults()
      .call({ from: accounts[0] })
      console.log(result);
        this.setState({
          results: result.map((item) => (
            {
              name: web3.utils.hexToAscii(item.name),
              voteCount: item.voteCount
            }
          )),
          loadingResults: false,
        });

  };

  displayOptions = () => {
    return this.state.results.map((item, i) => (
      <div
        className="option"
        key={i}
      >
        <Avatar
          avatarStyle="Transparent"
          topType="Turban"
          accessoriesType="Blank"
          hatColor="Blue03"
          facialHairType="Blank"
          clotheType="BlazerShirt"
          eyeType="Default"
          eyebrowType="Default"
          mouthType="Default"
          skinColor="Light"
        />
        <div className="data">
          <p>{item.name}</p>
          <br />
          <span>Numar voturi: {item.voteCount}</span>
        </div>
        {/* <Form.Check
          type="radio"
          name="radio"
          id={String(i)}
          onClick={(e) => this.onClickHandle(e)}
        /> */}
      </div>
    ));
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
    console.log(this.state);
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
          {this.state.results && this.displayOptions()}
        </div>
      </div>
    );
  }
}
