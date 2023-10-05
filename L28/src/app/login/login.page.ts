import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import * as Mnemonic from 'bitcore-mnemonic';
import * as CryptoJS from 'crypto-js';
import { WalletService } from './../wallet.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  window: any;

  wallet: any;

  encrypted: any;

  loginForm: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private walletService: WalletService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.window = document.defaultView;
  }

  ngOnInit() {
    this.encrypted = window.localStorage.getItem('seeds');

    this.loginForm = this.formBuilder.group({
      seeds: "",
      password: ""
    });
  }

  ionViewWillEnter() {
    if (this.walletService.getWallet()) {
      this.router.navigate(['/home']);
    }
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

    this.router.navigate(['/home'])
  }

}
