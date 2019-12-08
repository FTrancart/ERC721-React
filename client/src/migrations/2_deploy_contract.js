var erc = artifacts.require("./ERC721.sol");

module.exports = function(deployer, network) {
	deployer.deploy(erc);
};