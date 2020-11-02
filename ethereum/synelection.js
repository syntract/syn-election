import web3 from './web3';
import SynElection from './build/SynElection.json';

const instance = new web3.eth.Contract(
  JSON.parse(SynElection.interface),
  '0x7AB958980024ea2a9cA19bC9dc79672Cb042D23A'
);

export default instance;
