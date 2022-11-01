const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const realEstate = await hre.ethers.getContractFactory("realEstate");
  const realEstateContract = await realEstate.deploy();

  await realEstateContract.deployed();
  console.log(
    `realEstate contract deployed successfully at:  ${realEstateContract.address}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
