import {setup} from "./utils";
import {APPROVE_AMOUNT, FAUCET_AMOUNT, FAUCET_AMOUNT_WETH, STAKE_AMOUNT, STAKE_AMOUNT_WETH} from "../helpers/constants";
import {expect} from "chai";
import {forwardTime} from "../helpers";

describe("Faucet", async () => {

    it("check staking USDC", async () => {
        const {user1} = await setup();

        await user1.USDC.faucet();
        await user1.USDC.approve(user1.StarStakingUSDC.address, APPROVE_AMOUNT);
        await user1.StarStakingUSDC.stake(STAKE_AMOUNT);
        expect(await user1.StarStakingUSDC.balanceOf(user1.address)).to.eq(STAKE_AMOUNT);
        expect(await user1.StarStakingUSDC.totalSupply()).to.eq(STAKE_AMOUNT);
        
        await forwardTime(600);
        await user1.StarStakingUSDC.exit();
        expect(await user1.USDC.balanceOf(user1.address)).to.eq(FAUCET_AMOUNT);
        expect(await user1.Star.balanceOf(user1.address)).to.gt(0);
    });

    it("check staking USDT", async () => {
        const {user1} = await setup();

        await user1.USDT.faucet();
        await user1.USDT.approve(user1.StarStakingUSDT.address, APPROVE_AMOUNT);
        await user1.StarStakingUSDT.stake(STAKE_AMOUNT);
        expect(await user1.StarStakingUSDT.balanceOf(user1.address)).to.eq(STAKE_AMOUNT);
        expect(await user1.StarStakingUSDT.totalSupply()).to.eq(STAKE_AMOUNT);

        await forwardTime(600);
        await user1.StarStakingUSDT.exit();
        expect(await user1.USDT.balanceOf(user1.address)).to.eq(FAUCET_AMOUNT);
        expect(await user1.Star.balanceOf(user1.address)).to.gt(0);
    });

    it("check staking WETH", async () => {
        const {user1} = await setup();

        await user1.WETH.faucet();
        await user1.WETH.approve(user1.StarStakingWETH.address, APPROVE_AMOUNT);
        await user1.StarStakingWETH.stake(STAKE_AMOUNT_WETH);
        expect(await user1.StarStakingWETH.balanceOf(user1.address)).to.eq(STAKE_AMOUNT_WETH);
        expect(await user1.StarStakingWETH.totalSupply()).to.eq(STAKE_AMOUNT_WETH);

        await forwardTime(600);
        await user1.StarStakingWETH.exit();
        expect(await user1.WETH.balanceOf(user1.address)).to.eq(FAUCET_AMOUNT_WETH);
        expect(await user1.Star.balanceOf(user1.address)).to.gt(0);
    });

});
