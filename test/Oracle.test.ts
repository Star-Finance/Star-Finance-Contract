import {setup} from "./utils";
import {expect} from "chai";

describe("Oracle", async () => {

    it("check oracle", async () => {
        const {owner} = await setup();

        expect(await owner.Oracle.tokenPrice(owner.USDC.address)).to.eq(1e8);
        expect(await owner.Oracle.tokenPrice(owner.USDT.address)).to.eq(1e8);
        expect(await owner.Oracle.tokenPrice(owner.WETH.address)).to.eq(1e8);

        const starPrice = await owner.Oracle.starPrice();
        console.log("star price:", starPrice.toString());
        expect(starPrice).to.gt(5e8);
    })

});
