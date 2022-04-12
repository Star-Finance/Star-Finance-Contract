import {network} from 'hardhat';

const fs = require('fs');
let basePath = "/Users/kevin/project/StarCoin-Contract/deployments/"
let fullPath: string;

let networkName: string;

async function main() {

    console.log("=== merge abi start at %s ===", new Date().toString());

    networkName = network.name;
    fullPath = basePath + networkName;

    fs.readdir(fullPath, function (err: any, files: []) {

        if (err)
            return console.log('Unable to scan directory: ' + err);

        let abi: any = {};

        files.forEach(function (file: string) {

            let index = file.indexOf(".json");
            if (index < 0)
                return;

            const contractName = file.substring(0, index);

            console.log(".. including abi:", contractName);
            let data = JSON.parse(fs.readFileSync(fullPath + "/" + file, 'UTF-8'));
            abi[contractName] = {
                "address": data["address"],
                "abi": data["abi"]
            }

        });

        fs.writeFileSync('/Users/kevin/project/StarCoin-Contract/scripts/abi/deployments-' +
            networkName + '.json', JSON.stringify(abi));
    });

    console.log("=== merge abi end at %s ===", new Date().toString());
}

main().then(() => {
    console.log("success");
});
