import * as Mnemonic from 'bitcore-mnemonic';
import { hdkey } from 'ethereumjs-wallet';
import * as bip39 from 'bip39';
import * as util from '@ethereumjs/util';
import * as Web3 from 'web3';
import * as CryptoJS from 'crypto-js';

// var origen = 'gold afford crawl napkin shove rhythm melody insect exchange grow betray wild';

window.initWallet = async (origen) => {
    var mnemonic = new Mnemonic(origen);

    var seed = await bip39.mnemonicToSeed(mnemonic.toString());
    var path = "m/44'/60'/0'/0/0";

    var wallet = hdkey.fromMasterSeed(seed).derivePath(path).getWallet();

    var privateKey = wallet.getPrivateKey();
    var publicKey = util.privateToPublic(privateKey);

    var address = '0x' + util.pubToAddress(publicKey).toString('hex');

    return {
        privateKey: privateKey.toString('hex'),
        publicKey: publicKey.toString('hex'),
        address: address
    };
}

(async () => {

    var encrypted = window.localStorage.getItem('seeds');

    console.log(encrypted)

    if (encrypted) {
        var password = prompt('Introduce tu password para desencriptar tus semillas:');

        console.log(password)

        var semillas = CryptoJS.AES.decrypt(encrypted, password).toString(CryptoJS.enc.Utf8);

        console.log(semillas)

    } else {
        var semillas = prompt('Introduce tus semillas para iniciar sesión:');
        var password = prompt('Introduce tu password para encriptar tus semillas:');

        var encrypted = CryptoJS.AES.encrypt(semillas, password)
        window.localStorage.setItem('seeds', encrypted.toString());
    }

    var wallet = await window.initWallet(semillas);

    console.log(wallet);

})();
