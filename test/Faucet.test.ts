import {setup} from "./utils";
import {expect} from "chai";
import {FAUCET_AMOUNT, FAUCET_AMOUNT_WETH} from "../helpers/constants";

describe("Faucet", async () => {

    it("check faucet", async () => {
        const {user1} = await setup();

        await user1.USDC.faucet();
        await user1.USDT.faucet();
        await user1.WETH.faucet();
        
        expect(await user1.USDC.balanceOf(user1.address)).to.eq(FAUCET_AMOUNT);
        expect(await user1.USDT.balanceOf(user1.address)).to.eq(FAUCET_AMOUNT);
        expect(await user1.WETH.balanceOf(user1.address)).to.eq(FAUCET_AMOUNT_WETH);
    })

});
