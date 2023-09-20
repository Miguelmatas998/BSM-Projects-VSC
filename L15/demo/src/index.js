import * as Mnemonic from 'bitcore-mnemonic';
import * as bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import * as util from '@ethereumjs/util';
import * as Web3 from 'web3';

window.init = async () => {
    var web3 = new Web3;

    web3.setProvider(
        new web3.providers.HttpProvider('https://sepolia.infura.io/v3/d09825f256ae4705a74fdee006040903')
    );

    var wallet = await getWallet();
    console.log(wallet);

    /* console.log("Balance:");
    await web3.eth.getBalance(wallet.address).then(console.log);

    console.log("Gas Price:");
    await web3.eth.getGasPrice().then(console.log);

    console.log("Accounts:");
    await web3.eth.getAccounts().then(console.log);

    console.log("Transaction:");

    var tx = "0xaaaf2dd01ca2e82a61f8cf2a6e5e4f8465ad462a24b18f6af103b154b667f193";
    await web3.eth.getTransaction(tx).then(console.log);

    console.log("Receipt:");
    await web3.eth.getTransactionReceipt(tx).then(console.log);

    console.log("Nonce:");
    await web3.eth.getTransactionCount(wallet.address).then(console.log);

    // BATCH
    var request1 = web3.eth.getBalance.request(wallet.address, 'latest', function (error, balance) {
        console.log('Request 1', balance);
    });

    var request2 = web3.eth.getTransaction.request(tx, function (error, receipt) {
        console.log('Request 2', receipt)
    });

    var batch = new web3.BatchRequest();
    batch.add(request1);
    batch.add(request2);
    batch.execute(); */

    // TRANSACTION
    var rawData = {
        from: wallet.address,
        to: "0xef2C39592187b19b7C15E5C34cA9fF5C244FE447",
        value: 1,
        gasPrice: web3.utils.toHex(10000000000),
        gasLimit: web3.utils.toHex(1000000),
        nonce: await web3.eth.getTransactionCount(wallet.address)
    };

    console.log('Raw Transaction:');
    console.log(rawData);

    var signed = await web3.eth.accounts.signTransaction(rawData, wallet.privateKey.toString('hex'));

    console.log('Signed Transaction:');
    console.log(signed);

    web3.eth.sendSignedTransaction(signed.rawTransaction).then(
        receipt => {
            console.log(receipt)
        },
        error => {
            console.log(error)
        }
    );
}

async function getWallet () {
    var phrase = 'rescue tired mimic myth glimpse possible crunch upset method save public attack';
    var mnemonic = new Mnemonic(phrase);

    var path = "m/44'/60'/0'/0/0";

    var seed = await bip39.mnemonicToSeed(mnemonic.toString());
    var wallet = hdkey.fromMasterSeed(seed).derivePath(path).getWallet();

    var privateKey = wallet.getPrivateKey();
    var publicKey = util.privateToPublic(privateKey);
    var address = '0x' + util.pubToAddress(publicKey).toString('hex');

    return {
        'privateKey': privateKey.toString('hex'),
        'publicKey': publicKey.toString('hex'),
        'address': address
    };
};

window.init();