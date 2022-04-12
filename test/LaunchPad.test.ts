import {setup} from "./utils";
import {parseEther} from "ethers/lib/utils";
import {ethers} from "hardhat";
import {expect} from "chai";

describe("LaunchPad", async () => {

    it("check buy Star", async () => {
        const {owner, user1} = await setup();

        const signer = await ethers.getSigner(user1.address);
        await signer.getGasPrice().then(async (gasPrice) => {
            const tx = {
                from: user1.address,
                to: owner.LaunchPad.address,
                value: parseEther("0.01"),
                nonce: await signer.getTransactionCount(),
                gasLimit: ethers.utils.hexlify(500000),
                gasPrice: gasPrice,
            };
            await signer.sendTransaction(tx);
        });
        
        expect(await owner.Star.balanceOf(user1.address)).to.eq(parseEther("1000"));
    })

});
