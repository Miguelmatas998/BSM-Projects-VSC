const BSMNFT721 = artifacts.require("BSMNFT721");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(BSMNFT721);
};
