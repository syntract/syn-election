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
      winner: null,
      selection: null,
      loading: false,
      votingOver: null,
    };
  }

  async componentDidMount() {
    const manager = await election.methods.manager().call();

    const proposalNames = await election.methods.getProposals().call();
    let winner = await election.methods.winnerName().call();
    // let votingOver = await election.methods.stopVote().call()
    // console.log(votingOver);
    console.log(winner);
    winner = web3.utils.hexToAscii(winner).replace(/\0/g, "");
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

  giveRightToVote = (address) => {
    election.methods
      .giveRightToVote(address)
      .call()
      .then((result) => {})
      .catch((e) => console.log(e));
  };

  stopElection = () => {
    election.methods
      .stopElection()
      .call()
      .then((result) => {})
      .catch((e) => console.log(e));
  };

  getWinner = () => {
    election.methods
      .winnerName()
      .call()
      .then((result) => {
        this.setState({
          winner: web3.utils.hexToAscii(result).replace(/\0/g, ""),
        });
      })
      .catch((e) => console.log(e));
  };

  giveRightToVoteForm = () => (
    <Form>
      <FormGroup>
        <Form.Control
          type="text"
          placeholder="Enter voter's address"
          onChange={(e) => this.setState({ address: e.target.value })}
        />

        <Button
          variant="primary"
          size="md"
          id="giveAccess"
          disabled={this.state.votingOver}
          onClick={this.giveRightToVote}
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{ display: this.state.loading ? "block" : "none" }}
          />
          Acordati drept de vot
        </Button>
      </FormGroup>
    </Form>
  );

  actionButtons = () => (
    <Form>
      <FormGroup>
        <Button
          variant="danger"
          size="lg"
          id="stopVoting"
          disabled={this.state.votingOver}
          onClick={this.getWinner}
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
      </FormGroup>
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
        </div>
        <div className="action-content">
          {this.giveRightToVoteForm()}
          {this.actionButtons()}
          {this.state.winner && (
              <>
                <h3 style={{margin: "40px"}}>Votare incheiata</h3>
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
