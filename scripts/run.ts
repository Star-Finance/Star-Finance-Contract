import {deployments, ethers, getNamedAccounts} from 'hardhat';
import {BASE_URI} from "../helpers/constants";


const {execute, read} = deployments;

async function main() {

    const {owner} = await getNamedAccounts();
    // await execute("StarNFT", {from: owner}, "mint", owner);
    // await execute("StarNFT", {from: owner}, "setBaseURI", BASE_URI);

    const url = await read("StarNFT", "tokenURI", 1);
    console.log("url:", url);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
