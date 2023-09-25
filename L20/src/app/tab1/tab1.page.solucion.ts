import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AlertController } from '@ionic/angular';

import * as Mnemonic from 'bitcore-mnemonic';
import Web3 from 'web3';
import * as CryptoJS from 'crypto-js';
import { WalletService } from './../wallet.service';
import { ABI as ICOBSM } from './../ICOBSM';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  window: any;

  encrypted: any;

  wallet:any = {
    address: ""
  };

  loginForm: any;

  icoForm: any;

  web3: any;

  // ICO CONTRACT
  icoContract: any;

  icoContractAddress: any = '0x526ea39cbdd24c7fae51f5fa99afb815a678783c';

  icoTokensForm: any;

  icoBalanceOfTokens: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private walletService: WalletService,
    private alertController: AlertController
  ) {
    this.window = document.defaultView;

    // LOGIN
    this.encrypted = window.localStorage.getItem('seeds');

    this.loginForm = formBuilder.group({
      seeds: "",
      password: ""
    });

    // BUY ICO
    this.icoForm = formBuilder.group({
      amount: ""
    });

    // SEND ICO TOKENS
    this.icoTokensForm = formBuilder.group({
      address: "",
      amount: ""
    });

    // INIT WEB3
    this.web3 = new Web3;

    this.web3.setProvider(
      new this.web3.providers.HttpProvider('https://sepolia.infura.io/v3/d09825f256ae4705a74fdee006040903')
    );

    // ICO CONTRACT
    this.icoContract = new this.web3.eth.Contract(ICOBSM.default, this.icoContractAddress);
  }

  async sendLogin(sendData:any) {
    if (!sendData.password) {
      const alert = await this.alertController.create({
        message: 'Campos obligatorios',
        buttons: ['OK']
      });

      await alert.present();

      return;
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
    this.icoBalanceOfTokens = await this.icoContract.methods.balanceOf(this.wallet.address).call();
  }

  loginMetamask() {
    this.window.ethereum.enable().then(async (accounts:any) => {
      this.wallet.address = accounts[0];
    });
  }

  async sendIco(sendData:any) {
    if (!sendData.amount) {
      const alert = await this.alertController.create({
        message: 'Introduce un importe',
        buttons: ['OK']
      });

      await alert.present();

      return;
    }

    // amount = 1000000000000000
    var rawData = {
      from: this.wallet.address,
      to: this.icoContractAddress,
      value: sendData.amount,
      gasPrice: this.web3.utils.toHex(10000000000),
      gasLimit: this.web3.utils.toHex(1000000),
      nonce: await this.web3.eth.getTransactionCount(this.wallet.address),
    };

    var signed = await this.web3.eth.accounts.signTransaction(rawData, this.wallet.privateKey.toString('hex'));

    this.web3.eth.sendSignedTransaction(signed.rawTransaction).then(
      (receipt: any) => {
        console.log(receipt)
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  async sendIcoTokens(sendData:any) {
    if (!sendData.amount || !sendData.address) {
      const alert = await this.alertController.create({
        message: 'Campos obligatorios',
        buttons: ['OK']
      });

      await alert.present();

      return;
    }

    var rawData = {
      from: this.wallet.address,
      to: this.icoContractAddress,
      value: 0,
      gasPrice: this.web3.utils.toHex(10000000000),
      gasLimit: this.web3.utils.toHex(1000000),
      nonce: await this.web3.eth.getTransactionCount(this.wallet.address),
      data: this.icoContract.methods.transfer(sendData.address, sendData.amount).encodeABI()
    };

    var signed = await this.web3.eth.accounts.signTransaction(rawData, this.wallet.privateKey.toString('hex'));

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
