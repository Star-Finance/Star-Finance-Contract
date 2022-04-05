import {deployments, ethers, getNamedAccounts} from 'hardhat';


const {execute, read} = deployments;

async function main() {

    const {owner} = await getNamedAccounts();

    const zombie = await ethers.getContractAt('ZoombieFactory', "0x042c56bAf97f290dCf7d7177c60ca73Fcb91cf5E");
    await zombie.createZoombie("star");

    let zom= await zombie.zoombies(0);

    console.log(`zombie: ${zom}`);
    
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
