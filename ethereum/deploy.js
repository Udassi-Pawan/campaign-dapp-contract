import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import compiledFactory from "./build/CampaignFactory.json" assert { type: "json" };

import dotenv from "dotenv";
dotenv.config();

const provider = new HDWalletProvider(process.env.wallet, process.env.key);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("contract deployed to ", result.options.address);
  provider.engine.stop();
};

deploy();

// 0x57f3c90a0E1BD1E2bb6784041ae7384201A0C686
