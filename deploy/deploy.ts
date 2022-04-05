import { parseEther } from 'ethers/lib/utils';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy,execute} = deployments;
    const {owner} = await getNamedAccounts();

    // console.log('chainId:', await getChainId());

    const exampleToken = await deploy('ExampleToken', {
        from: owner,
        args: [],
        log: true,
    });

    const usdsToken = await deploy('UsdsToken', {
        from: owner,
        args: [],
        log: true,
    });

    const stakingRewards = await deploy('StakingRewards', {
        from: owner,
        args: [owner, exampleToken.address, usdsToken.address],
        log: true,
    });

    const uniswapV2Factory = await deploy('UniswapV2Factory', {
        from: owner,
        args: [owner],
        log: true,
    });

    const uniswapV2Router02 = await deploy('UniswapV2Router02', {
        from: owner,
        args: [uniswapV2Factory.address, "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"],
        log: true,
    });

    await execute("ExampleToken",{from:owner},"transfer",stakingRewards.address, parseEther("1000000"));
    await execute("StakingRewards",{from:owner},"notifyRewardAmount", parseEther("1000000"));

};
export default func;
func.tags = ['deploy'];
