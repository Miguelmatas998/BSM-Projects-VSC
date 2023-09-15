import * as Mnemonic from 'bitcore-mnemonic';
import * as bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import * as util from '@ethereumjs/util';
import * as Web3 from 'web3';

(async () => {

    var mnemonic = new Mnemonic('book congress final raise survey beauty crack orbit angry tribe lemon october');
    var seed = await bip39.mnemonicToSeed(mnemonic.toString());
    var path = "m/44'/60'/0'/0/0";

    var wallet = hdkey.fromMasterSeed(seed).derivePath(path).getWallet();

    var publicKey = util.privateToPublic(wallet.getPrivateKey());
    var address = '0x' + util.pubToAddress(publicKey).toString('hex');

    console.log('privateKey: ' + wallet.getPrivateKey().toString('hex'));
    console.log('publicKey: ' + publicKey.toString('hex'));
    console.log('address: ' + address);

    console.log('is valid private: ', util.isValidPrivate(wallet.getPrivateKey()));
    console.log('is valid public: ', util.isValidPublic(publicKey));
    console.log('is valid address: ', util.isValidAddress(address));

})();

window.addEventListener('load', () => {
    var metamask = window.ethereum;

    if ( ! metamask) {
        alert('Please install metamask');

        return;
    }

    var web3 = new Web3(metamask);
    var address = '0x8c8d7c46219d9205f056f28fee5950ad564d7465';

    web3.eth.getBalance(address, (error, result) => {
        var balance = web3.utils.fromWei(result, 'ether');

        console.log(balance);
    });
});