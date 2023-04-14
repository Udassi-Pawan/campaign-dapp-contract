import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && window?.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://eth-sepolia.g.alchemy.com/v2/Tm6Y7auIDTHbGjr45UXfP04foFV4tgqd"
  );
  web3 = new Web3(provider);
}

export default web3;
