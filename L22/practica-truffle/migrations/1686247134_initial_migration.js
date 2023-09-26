const ProductManagement = artifacts.require("ProductManagement");
const ChangeOwnership = artifacts.require("ChangeOwnership");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(ProductManagement).then(function() {
    return _deployer.deploy(ChangeOwnership, ProductManagement.address);
  });
};
