const BSMNFT721 = artifacts.require("BSMNFT721");

module.exports = async (callback) => {
    // TODO: implement your actions
    var contract = await BSMNFT721.deployed();

    var tokenURI1 = contract.tokenURI(1);

    console.log(tokenURI1);

    var amount = await web3.eth.getBalance('0x3e14e56AF447497E14f38015382B7932F45FbE79');

    console.log(amount);

    // invoke callback
    callback();
}