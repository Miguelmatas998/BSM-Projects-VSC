const BSMWINE = artifacts.require("BSMWINE");

module.exports = async function (callback) {
    var _BSMWINE = await BSMWINE.deployed();

    var mintIsActive = await _BSMWINE.mintIsActive();

    if (!mintIsActive) {
        await _BSMWINE.flipMintState();
    }

    await _BSMWINE.mint(8437003104558, { value: 35000000000000000 });
    await _BSMWINE.mint(8426411002204, { value: 35000000000000000 });

    await _BSMWINE.flipMintState();

    callback();
}