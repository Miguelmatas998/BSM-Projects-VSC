import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import * as Mnemonic from 'bitcore-mnemonic';
import { hdkey } from 'ethereumjs-wallet';
import * as bip39 from 'bip39';
import * as util from '@ethereumjs/util';
import Web3 from 'web3';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-angular';

  window: any;

  loginForm: any;

  encrypted: any;

  wallet:any = {
    address: ""
  };

  sendForm: any;

  web3: any;

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder) {
    this.window = document.defaultView;

    // LOGIN
    this.encrypted = window.localStorage.getItem('seeds');

    this.loginForm = formBuilder.group({
      seeds: "",
      password: ""
    });

    // SEND TX
    this.sendForm = formBuilder.group({
      address: ""
    });

    this.web3 = new Web3;

    this.web3.setProvider(
      new this.web3.providers.HttpProvider('https://sepolia.infura.io/v3/d09825f256ae4705a74fdee006040903')
    );
  }

  async initWallet(seeds:string) {
    var mnemonic = new Mnemonic(seeds);

    var seed = await bip39.mnemonicToSeed(mnemonic.toString());
    var path = "m/44'/60'/0'/0/0";

    var wallet = hdkey.fromMasterSeed(seed).derivePath(path).getWallet();

    var privateKey = wallet.getPrivateKey();
    var publicKey = util.privateToPublic(privateKey);

    var address = '0x' + util.pubToAddress(publicKey).toString('hex');

    this.wallet = {
        privateKey: privateKey.toString('hex'),
        publicKey: publicKey.toString('hex'),
        address: address
    };
  }

  async sendLogin(sendData:any) {
    if (!sendData.password) {
      return alert('Campos obligatorios');
    }

    if (this.encrypted) {

      console.log(this.encrypted);
      console.log(sendData.password);

      var semillas = CryptoJS.AES.decrypt(this.encrypted, sendData.password).toString(CryptoJS.enc.Utf8);

      console.log(semillas);

      sendData.seeds = semillas;
    }

    console.log(sendData);



    if (!Mnemonic.isValid(sendData.seeds)) {
      return alert('Semilla invalida');
    }

    this.encrypted = CryptoJS.AES.encrypt(sendData.seeds, sendData.password);

    window.localStorage.setItem('seeds', this.encrypted.toString());

    this.initWallet(sendData.seeds);
  }

  loginMetamask() {
    this.window.ethereum.enable().then(async (accounts:any) => {
      this.wallet.address = accounts[0];
    });
  }

  async sendTx(sendData:any) {
    var rawData = {
      from: this.wallet.address,
      to: sendData.address,
      value: 1,
      gasPrice: this.web3.utils.toHex(10000000000),
      gasLimit: this.web3.utils.toHex(1000000),
      nonce: await this.web3.eth.getTransactionCount(this.wallet.address)
    };

    console.log('Raw Transaction:');
    console.log(rawData);

    var signed = await this.web3.eth.accounts.signTransaction(rawData, this.wallet.privateKey.toString('hex'));

    console.log('Signed Transaction:');
    console.log(signed);

    this.web3.eth.sendSignedTransaction(signed.rawTransaction).then(
        (receipt: any) => {
            console.log(receipt)
        },
        (error: any) => {
            console.log(error)
        }
    );
  }

}
