import {DeployFunction} from 'hardhat-deploy/types';
import {
    BASE_URI,
    FAUCET_AMOUNT, FAUCET_AMOUNT_WETH,
    LAUNCH_TOTAL,
    MINT_COST,
    PRE_MINT_AMOUNT_STAKE,
    PRE_MINT_AMOUNT_STAR
} from "../helpers/constants";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {

    const {deploy, execute} = deployments;
    const {owner} = await getNamedAccounts();

    console.log("=== Deploying: assets ===");

    const Star = await deploy('Star', {
        from: owner,
        args: [PRE_MINT_AMOUNT_STAR],
        log: true,
    });

    await deploy('USDC', {
        from: owner,
        args: [PRE_MINT_AMOUNT_STAKE, FAUCET_AMOUNT],
        log: true,
    });

    await deploy('USDT', {
        from: owner,
        args: [PRE_MINT_AMOUNT_STAKE, FAUCET_AMOUNT],
        log: true,
    });

    await deploy('WETH', {
        from: owner,
        args: [PRE_MINT_AMOUNT_STAKE, FAUCET_AMOUNT_WETH],
        log: true,
    });

    await deploy('StarNFT', {
        from: owner,
        args: [BASE_URI, MINT_COST],
        log: true,
    });

    const LaunchPad = await deploy('LaunchPad', {
        from: owner,
        args: [Star.address],
        log: true,
    });

    await execute("Star", {from: owner}, "transfer", LaunchPad.address, LAUNCH_TOTAL);
};
export default func;
func.tags = ['assets'];
