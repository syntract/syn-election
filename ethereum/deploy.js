const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledSynElection = require('./build/SynElection.json');

const provider = new HDWalletProvider(
  'cherry polar attitude upon grid bag mercy snack soft cat wolf voice',
  'https://rinkeby.infura.io/v3/7308788a7bb04861a35f30a4a3dbb734'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attepmting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(compiledSynElection.interface))
     .deploy({data: compiledSynElection.bytecode, arguments: ["Alex"] })
     .send({gas: '1000000', from: accounts[0]});

  console.log('Contract deployed to', result.options.address);

};
deploy();
