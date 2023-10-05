const BSMWINE = artifacts.require("BSMWINE");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(BSMWINE, 'https://ipfs.io/ipfs/QmS4k6JHPHqHC14MDKB4pEQTf4jTWBnTePfYJsSpoJmcMs/');
};
