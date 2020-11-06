import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider); //.enable()
} else {
  //we are on the server OR the user is not runnnig metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/7308788a7bb04861a35f30a4a3dbb734"
  );
  web3 = new Web3(provider);
}

export default web3;
