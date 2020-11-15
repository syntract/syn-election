import React from 'react';
import web3 from "./web3";
import election from "./election";
import Avatar from "avataaars";
import { Button, Spinner } from "react-bootstrap";


export default class VoterView extends React.Component {
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
    const manager = await election.methods.owner().call();
    const proposals = await election.methods.proposals(1).call();
    const proposalNames = await election.methods.getProposals().call();
    // let winner = await election.methods.winnerName().call();
    // // let votingOver = await election.methods.stopVote().call()
    // // console.log(votingOver);
    console.log(proposalNames);
    console.log(manager)
    // winner = web3.utils.hexToAscii(winner).replace(/\0/g, "");
    const stringValues = proposalNames.map((item) =>
      web3.utils.hexToAscii(item).replace(/\0/g, "")
    );
    this.setState({ manager, proposals, proposalNames, stringValues });
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

  displayOptions = () => {
    return this.state.stringValues.map((item, i) => (
      <div
        className={this.state.selection === i ? `option activeCard` : "option"}
        key={i}
        onClick={() => this.onClickHandle(i)}
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
          <p>{item}</p>
          <br />
          <span>Candidat #{i}</span>
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

  displayWinner = () => {
    return (
      <div
        className='winner'
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
          <p>{this.state.winner}</p>
          <br />
          <span>Candidat Castigator</span>
        </div>
        {/* <Form.Check
          type="radio"
          name="radio"
          id={String(i)}
          onClick={(e) => this.onClickHandle(e)}
        /> */}
      </div>
    );
  };

  render() {
    return (
      <div className="parent">
        <div className="title">
          <h1>Sesiune de votare demo</h1>
          {!this.state.votingOver ? (
            <h2>
              Alegeti o optiune de mai jos si apasati butonul{" "}
              <strong>Votati</strong>
            </h2>
          ) : (
            <h2>Sesiunea de votare s-a incheiat</h2>
          )}
        </div>
        <div className="content">{!this.state.votingOver ? this.displayOptions() : this.displayWinner()}</div>
        {!this.state.votingOver && <Button
          variant="primary"
          size="lg"
          disabled={this.state.selection === null}
          onClick={this.onSubmitHandle}
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{ display: this.state.loading ? "block" : "none" }}
          />
          Votati
        </Button>}
      </div>
    );
  }
}