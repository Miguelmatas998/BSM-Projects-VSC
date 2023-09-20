import * as Mnemonic from 'bitcore-mnemonic';
import { hdkey } from 'ethereumjs-wallet';
import * as bip39 from 'bip39';
import * as util from '@ethereumjs/util';
import * as Web3 from 'web3';
import * as CryptoJS from "crypto-js";

var phrase = 'frequent antique present skull method memory liberty crouch wrap dice verify joy'; // new Mnemonic().phrase;

console.log(1, phrase);

var mnemonic = new Mnemonic(phrase);

console.log(2, mnemonic);

bip39.mnemonicToSeed(mnemonic.toString()).then(seed => {

    var path = "m/44'/60'/0'/0/0";

    console.log(3, seed)

    var wallet = hdkey.fromMasterSeed(seed).derivePath(path).getWallet();

    console.log(4, wallet);

    var privateKey = wallet.getPrivateKey();

    console.log(5, privateKey);

    var publicKey = util.privateToPublic(privateKey);

    console.log(6, publicKey);

    var address = '0x' + util.pubToAddress(publicKey).toString('hex');

    console.log(7, address);

    console.log(8, util.isValidAddress(address));

    console.log(9, util.isValidPrivate(privateKey));

    console.log(10, util.isValidPublic(publicKey));

});

var encrypted = CryptoJS.AES.encrypt(
    seeds,
    password
).toString();

if (encrypted) {
    window.localStorage.setItem("seeds", encrypted.toString());
}

if (encrypted) {
    var decrypt = CryptoJS.AES.decrypt(encrypted, password);
    var seeds = decrypt.toString(CryptoJS.enc.Utf8);
}

window.localStorage.setItem('seeds', 'hshshsh');

window.localStorage.getItem('seeds');

window.addEventListener('load', () => {

    var address = '0x33f41757609b06b17fe8e886e703a8efeca42658';
    var web3 = new Web3(window.ethereum);
    // window.ethereum.enable();

    web3.eth.getBalance(address, (error, result) => {

        console.log(result);

        var balance = web3.utils.fromWei(result, 'ether');

        console.log(balance)

    });
});