import {Contract} from 'ethers';
import {deployments, ethers, getNamedAccounts} from "hardhat";
import {ExampleToken, StakingRewards, UsdsToken} from "../../typechain";

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
        StakingRewards: await ethers.getContract<StakingRewards>('StakingRewards'),
        ExampleToken: await ethers.getContract<ExampleToken>('ExampleToken'),
        UsdsToken: await ethers.getContract<UsdsToken>('UsdsToken'),
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
