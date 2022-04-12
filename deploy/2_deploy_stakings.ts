import {parseEther} from 'ethers/lib/utils';
import {DeployFunction} from 'hardhat-deploy/types';
import {PRE_MINT_AMOUNT_STAR, REWARD_AMOUNT, REWARD_AMOUNT_WETH} from "../helpers/constants";
import {WETH} from "../typechain";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {

    const {deploy, execute, get} = deployments;
    const {owner} = await getNamedAccounts();

    console.log("=== Deploying: stakings ===");

    const Star = await get("Star");
    const USDC = await get("USDC");
    const USDT = await get("USDT");
    const WETH = await get("WETH");

    const StarStakingUSDC = await deploy('StarStakingUSDC', {
        from: owner,
        args: [owner, Star.address, USDC.address],
        log: true,
    });

    const StarStakingUSDT = await deploy('StarStakingUSDT', {
        from: owner,
        args: [owner, Star.address, USDT.address],
        log: true,
    });

    const StarStakingWETH = await deploy('StarStakingWETH', {
        from: owner,
        args: [owner, Star.address, WETH.address],
        log: true,
    });

    // add rewards
    await execute("Star", {from: owner}, "transfer", StarStakingUSDC.address, REWARD_AMOUNT);
    await execute("StarStakingUSDC", {from: owner}, "notifyRewardAmount", REWARD_AMOUNT);

    await execute("Star", {from: owner}, "transfer", StarStakingUSDT.address, REWARD_AMOUNT);
    await execute("StarStakingUSDT", {from: owner}, "notifyRewardAmount", REWARD_AMOUNT);

    await execute("Star", {from: owner}, "transfer", StarStakingWETH.address, REWARD_AMOUNT_WETH);
    await execute("StarStakingWETH", {from: owner}, "notifyRewardAmount", REWARD_AMOUNT_WETH);
    
};
export default func;
func.dependencies = []
func.tags = ['assets'];
