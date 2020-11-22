import React from 'react';
import web3 from "./web3";
import election from "./election";
import Avatar from "avataaars";
import { Button, Spinner } from "react-bootstrap";

const HEADLINE = "Sesiunea de votare demo";
const ERROR_MSG = "Votul nu a putut fi inregistrat.";
const SUCCESS_MSG = "Votul a fost inregistrat cu succes!";
const LOADING_MSG = "Votul este in curs de inregistrare. Procesul poate dura pana la cateva minute.";

export default class VoterView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      manager: "",
      allProposals: [],
      allProposalsReadable: [],
      selection: null,
      loading: false,
      votingOver: null,
      error: false,
      success: false
    };
  }

  async componentDidMount() {
    const manager = await election.methods.owner().call();
    const allProposals = await election.methods.getProposals().call();
    //const votingOver = await election.methods.stopVote().call();
    const votingOver = false;
    const allProposalsReadable = allProposals.map((item) =>
      web3.utils.hexToAscii(item).replace(/\0/g, "")
    );

    this.setState({ manager, allProposals, allProposalsReadable, votingOver });
  }

  onClickHandle = (i) => {
    this.setState({ selection: i });
  };

  onSubmitHandle = async () => {
    this.setState({ loading: true });

    const accounts = await web3.eth.getAccounts();

    try{
      const res = await election.methods
        .vote(this.state.selection)
        .send({ from: accounts[0] });
        console.log(res)
      this.setState({success: true});
    } catch(e) {
      console.log(e);
      this.setState({ error: true });
      console.log('----')
    } finally {
      this.setState({ loading: false });
    }
  };

  displayOptions = () => {
    return this.state.allProposalsReadable.map((item, i) => (
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
      </div>
    ));
  };

  render() {
    const {votingOver, loading, selection, success, error} = this.state;
    return (
      <div className="parent">
        <div className="title">
          <h1>{HEADLINE}</h1>
          {!votingOver ? (
            <h2>
              Alegeti o optiune de mai jos si apasati butonul{" "}
              <strong>Votati</strong>
            </h2>
          ) : (
            <h2>Sesiunea de votare s-a incheiat</h2>
          )}
        </div>
        <div className="content">{this.displayOptions()}</div>
        {!votingOver && <Button
          variant="primary"
          size="lg"
          disabled={selection === null || loading === true}
          onClick={this.onSubmitHandle}
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{ display: loading ? "block" : "none" }}
          />
          Votati
        </Button>}
        {loading && <span>{LOADING_MSG}</span>}
        {(!loading && (success || error)) && <span className={error ? 'error-msg' : 'success-msg'}>{error ? ERROR_MSG : SUCCESS_MSG}</span>}
      </div>
    );
  }
}