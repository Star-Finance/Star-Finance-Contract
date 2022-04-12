import {setup} from "./utils";
import {parseEther} from "ethers/lib/utils";
import {expect} from "chai";

describe("StarNFT", async () => {

    it("check mint", async () => {
        const {owner, user1, StarNFT} = await setup();

        expect(await StarNFT.balanceOf(owner.address)).to.eq(0);
        expect(await StarNFT.balanceOf(user1.address)).to.eq(0);

        await owner.StarNFT.mint(owner.address);
        expect(await StarNFT.balanceOf(owner.address)).to.eq(1);

        await user1.StarNFT.mint(user1.address, {value: parseEther("0.0001")});
        expect(await StarNFT.balanceOf(user1.address)).to.eq(1);
    })

});
