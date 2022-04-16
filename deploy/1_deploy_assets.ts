import {DeployFunction} from 'hardhat-deploy/types';
import {
    APPROVE_AMOUNT,
    BASE_URI, CHAIN_ID_LOCAL, CHAIN_LINK_ETH_RINKEBY, CHAIN_LINK_USDC_RINKEBY,
    FAUCET_AMOUNT, FAUCET_AMOUNT_WETH,
    LAUNCH_TOTAL, LIQUIDITY_STAR, LIQUIDITY_USDC,
    MINT_COST,
    PRE_MINT_AMOUNT_STAKE,
    PRE_MINT_AMOUNT_STAR, UNISWAP_ROUTER_RINKEBY
} from "../helpers/constants";
import {getCurrentTimestamp} from "hardhat/internal/hardhat-network/provider/utils/getCurrentTimestamp";
import {ethers} from "hardhat";
import {UniswapV2Router} from "../typechain";

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {

    const {deploy, execute} = deployments;
    const {owner} = await getNamedAccounts();

    console.log("=== Deploying: assets ===");

    const chainId = await getChainId();

    const Star = await deploy('Star', {
        from: owner,
        args: [PRE_MINT_AMOUNT_STAR],
        log: true,
    });

    const USDC = await deploy('USDC', {
        from: owner,
        args: [PRE_MINT_AMOUNT_STAKE, FAUCET_AMOUNT],
        log: true,
    });

    const USDT = await deploy('USDT', {
        from: owner,
        args: [PRE_MINT_AMOUNT_STAKE, FAUCET_AMOUNT],
        log: true,
    });

    const WETH = await deploy('WETH', {
        from: owner,
        args: [PRE_MINT_AMOUNT_STAKE, FAUCET_AMOUNT_WETH],
        log: true,
    });

    let router;

    if (chainId == CHAIN_ID_LOCAL) {
        const WETH = await deploy('MockWETH', {
            from: owner,
            args: [],
            log: true,
        });

        const UniswapV2Factory = await deploy('UniswapV2Factory', {
            from: owner,
            args: [owner],
            log: true,
        });

        const UniswapV2Router = await deploy('UniswapV2Router', {
            from: owner,
            args: [UniswapV2Factory.address, WETH.address],
            log: true,
        });

        await deploy('MockOracle', {
            from: owner,
            args: [Star.address, USDC.address, UniswapV2Router.address],
            log: true,
        });

        router = await ethers.getContractAt("UniswapV2Router", UniswapV2Router.address);

    } else {

        await deploy('Oracle', {
            from: owner,
            args: [Star.address, USDC.address, UNISWAP_ROUTER_RINKEBY],
            log: true,
        });

        router = await ethers.getContractAt("UniswapV2Router", UNISWAP_ROUTER_RINKEBY);
        await execute("Oracle", {from: owner}, "setPriceFeed", USDC.address, CHAIN_LINK_USDC_RINKEBY);
        await execute("Oracle", {from: owner}, "setPriceFeed", USDT.address, CHAIN_LINK_USDC_RINKEBY);
        await execute("Oracle", {from: owner}, "setPriceFeed", WETH.address, CHAIN_LINK_ETH_RINKEBY);
    }

    await execute("Star", {from: owner}, "approve", router.address, APPROVE_AMOUNT);
    await execute("USDC", {from: owner}, "approve", router.address, APPROVE_AMOUNT);

    await router.addLiquidity(Star.address, USDC.address, LIQUIDITY_STAR, LIQUIDITY_USDC,
        LIQUIDITY_STAR, LIQUIDITY_USDC, owner, getCurrentTimestamp() + 120);

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
