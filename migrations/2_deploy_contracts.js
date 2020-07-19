const Charity = artifacts.require("Charity");
const CharityHandler = artifacts.require("CharityHandler");

module.exports = function(deployer) {
    deployer.deploy(CharityHandler);
    deployer.deploy(Charity,'World Health Organization', '0x328b3a52d853bC228380CD59FdA3c6E0426EC14E');
};

