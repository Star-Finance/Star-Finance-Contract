import {DeployFunction} from 'hardhat-deploy/types';
import {CHAIN_ID_LOCAL, REWARD_AMOUNT, REWARD_AMOUNT_WETH, UNISWAP_ROUTER_RINKEBY} from "../helpers/constants";
import {WETH} from "../typechain";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {

    const {deploy, execute, get} = deployments;
    const {owner} = await getNamedAccounts();

    console.log("=== Deploying: stakings ===");

    let Oracle;

    const chainId = await getChainId();
    if (chainId == CHAIN_ID_LOCAL)
        Oracle = await get("MockOracle");
    else
        Oracle = await get("Oracle");
    
    const Star = await get("Star");
    const USDC = await get("USDC");
    const USDT = await get("USDT");
    const WETH = await get("WETH");

    const StarStakingUSDC = await deploy('StarStakingUSDC', {
        from: owner,
        args: [owner, Star.address, USDC.address, Oracle.address],
        log: true,
    });

    const StarStakingUSDT = await deploy('StarStakingUSDT', {
        from: owner,
        args: [owner, Star.address, USDT.address, Oracle.address],
        log: true,
    });

    const StarStakingWETH = await deploy('StarStakingWETH', {
        from: owner,
        args: [owner, Star.address, WETH.address, Oracle.address],
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
