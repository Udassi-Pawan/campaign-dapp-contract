import path from "path";
import solc from "solc";
import fs from "fs-extra";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const buildPath = path.resolve(__dirname, "build");
const campaignPath = path.resolve(__dirname, "contracts", "campaign.sol");

fs.removeSync(buildPath);

const source = fs.readFileSync(campaignPath, "utf8");

const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
