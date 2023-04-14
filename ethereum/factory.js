import web3 from "./web3.js";
import CampaignFactory from "./build/CampaignFactory.json" assert { type: "json" };

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface, process.env.address)
);

instance.options.address = process.env.address;

export default instance;
