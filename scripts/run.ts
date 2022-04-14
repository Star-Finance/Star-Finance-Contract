import {deployments, ethers, getNamedAccounts} from 'hardhat';


const {execute, read} = deployments;

async function main() {

    const {owner} = await getNamedAccounts();
    await execute("StarNFT", {from: owner}, "mint", owner);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
