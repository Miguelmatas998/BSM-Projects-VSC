import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import * as Mnemonic from 'bitcore-mnemonic';
import Web3 from 'web3';
import * as CryptoJS from 'crypto-js';
import { WalletService } from './wallet.service';
import { ABI } from './MarketPayAudit';
import * as util from '@ethereumjs/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-angular';

  window: any;

  encrypted: any;

  wallet:any = {
    address: ""
  };

  loginForm: any;

  sendForm: any;

  tokensForm: any;

  mintForm: any;

  lastTransaction: any;

  web3: any;

  contract: any;

  contractAddress: any = '0x88cddf322037d8d7bd013e478acdf23a19081d6e';

  balanceOfTokens: any;

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder, private walletService: WalletService) {
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

    // SEND TOKENS
    this.tokensForm = formBuilder.group({
      address: "",
      amount: ""
    });

    // MINT TOKENS
    this.mintForm = formBuilder.group({
      address: "",
      amount: ""
    });

    // INIT WEB3
    this.web3 = new Web3;

    this.web3.setProvider(
      new this.web3.providers.HttpProvider('https://sepolia.infura.io/v3/d09825f256ae4705a74fdee006040903')
    );

    this.contract = new this.web3.eth.Contract(ABI.default, this.contractAddress);
  }

  async sendLogin(sendData:any) {
    if (!sendData.password) {
      return alert('Campos obligatorios');
    }

    if (this.encrypted) {
      var semillas = CryptoJS.AES.decrypt(this.encrypted, sendData.password).toString(CryptoJS.enc.Utf8);
      sendData.seeds = semillas;
    }

    if (!Mnemonic.isValid(sendData.seeds)) {
      return alert('Semilla invalida');
    }

    this.encrypted = CryptoJS.AES.encrypt(sendData.seeds, sendData.password);

    window.localStorage.setItem('seeds', this.encrypted.toString());

    this.wallet = await this.walletService.initWallet(sendData.seeds);
    this.balanceOfTokens = await this.contract.methods.balanceOf(this.wallet.address).call();
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

  async sendTokens(sendData:any) {
    if ( ! util.isValidAddress(sendData.address)) {
      return alert('Dirección no es válida');
    }

    if (sendData.amount == '') {
      return alert('Campos obligatorios');
    }

    if (sendData.amount > this.balanceOfTokens) {
      return alert('No tienes suficientes tokens');
    }

    var rawData = {
      from: this.wallet.address,
      to: this.contractAddress,
      value: 0,
      gasPrice: this.web3.utils.toHex(10000000000),
      gasLimit: this.web3.utils.toHex(1000000),
      nonce: await this.web3.eth.getTransactionCount(this.wallet.address),
      data: this.contract.methods.transfer(sendData.address, sendData.amount).encodeABI()
    };

    var signed = await this.web3.eth.accounts.signTransaction(rawData, this.wallet.privateKey.toString('hex'));

    this.web3.eth.sendSignedTransaction(signed.rawTransaction).then(
        (receipt: any) => {
          this.lastTransaction = receipt;
        },
        (error: any) => {
            console.log(error)
        }
    );
  }

  //Código de la función para mintear tokens

  async mintTokens(sendData:any) {
    if ( ! util.isValidAddress(sendData.address)) {
      return alert('Dirección no es válida');
    }

    if (sendData.amount == '') {
      return alert('Campos obligatorios');
    }

    var rawData = {
      from: this.wallet.address,
      to: this.contractAddress,
      value: 0,
      gasPrice: this.web3.utils.toHex(10000000000),
      gasLimit: this.web3.utils.toHex(1000000),
      nonce: await this.web3.eth.getTransactionCount(this.wallet.address),
      data: this.contract.methods.mint(sendData.address, sendData.amount).encodeABI()
    };

    var signed = await this.web3.eth.accounts.signTransaction(rawData, this.wallet.privateKey.toString('hex'));

    this.web3.eth.sendSignedTransaction(signed.rawTransaction).then(
        (receipt: any) => {
          this.lastTransaction = receipt;
        },
        (error: any) => {
            console.log(error)
        }
    );
  }

}
