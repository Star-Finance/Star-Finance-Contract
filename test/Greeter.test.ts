import {expect} from "chai";
import {setup} from "./utils";
import { parseEther } from "ethers/lib/utils";
import { forwardTime } from "../helpers";

describe("ExampleToken", async () => {
    
    it("buy one zoombie", async () => {
        const { owner } = await setup();
       
        await owner.UsdsToken.approve(owner.StakingRewards.address, parseEther("9999999999999"));
        await owner.StakingRewards.stake(parseEther("1000"));

        await forwardTime(60);

        const sd = await owner.StakingRewards.earned(owner.address);

        console.log(sd.toString());
    })

});
