import {Contract} from 'ethers';
import {deployments, ethers, getNamedAccounts} from "hardhat";
import {
    LaunchPad,
    Star,
    StarNFT,
    StarStakingUSDC,
    StarStakingUSDT,
    StarStakingWETH,
    USDC,
    USDT,
    WETH
} from "../../typechain";

export async function setupUser<T extends { [contractName: string]: Contract }>(
    address: string,
    contracts: T
): Promise<{ address: string } & T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = {address};
    for (const key of Object.keys(contracts)) {
        user[key] = contracts[key].connect(await ethers.getSigner(address));
    }
    return user as { address: string } & T;
}

export const setup = deployments.createFixture(async () => {
    await deployments.fixture();
    const contracts = {
        Star: await ethers.getContract<Star>('Star'),
        StarNFT: await ethers.getContract<StarNFT>('StarNFT'),
        LaunchPad: await ethers.getContract<LaunchPad>('LaunchPad'),
        USDC: await ethers.getContract<USDC>('USDC'),
        USDT: await ethers.getContract<USDT>('USDT'),
        WETH: await ethers.getContract<WETH>('WETH'),
        StarStakingUSDC: await ethers.getContract<StarStakingUSDC>('StarStakingUSDC'),
        StarStakingUSDT: await ethers.getContract<StarStakingUSDT>('StarStakingUSDT'),
        StarStakingWETH: await ethers.getContract<StarStakingWETH>('StarStakingWETH'),
    };
    const {owner, user1, user2, user3, user4, user5} = await getNamedAccounts();
    return {
        ...contracts,
        owner: await setupUser(owner, contracts),
        user1: await setupUser(user1, contracts),
        user2: await setupUser(user2, contracts),
        user3: await setupUser(user3, contracts),
        user4: await setupUser(user4, contracts),
        user5: await setupUser(user5, contracts),
    };
});
