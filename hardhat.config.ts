import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import '@typechain/hardhat';
import "@nomiclabs/hardhat-etherscan";

const secret = require("./secret.json");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const config: any = {
    solidity: {
        compilers: [
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100000
                    }
                }
            },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100000
                    }
                },
                evmVersion: 'istanbul'
            },
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 100000,
                    },
                },
                evmVersion: 'istanbul'
            }
        ],
    },
    namedAccounts: {
        owner: 0,
        user1: 1,
        user2: 2,
        user3: 3,
        user4: 4,
        user5: 5
    },
    networks: {
        rinkeby: {
            url: secret.url_rinkeby,
            accounts: [secret.key],
            timeout: 120000
        },
        bsc_test: {
            url: secret.url_bsc_testnet,
            accounts: [secret.key],
            timeout: 120000
        }
    },
    // "apiKey":"AICEVSFV489I64KNVISIJNAAAYKHPBMBC1",  BSC-CHAIN
    etherscan: {
        apiKey: secret.apiKey
    },
}
export default config;

