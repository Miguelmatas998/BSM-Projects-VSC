import { Injectable } from '@angular/core';

import * as Mnemonic from 'bitcore-mnemonic';
import { hdkey } from 'ethereumjs-wallet';
import * as bip39 from 'bip39';
import * as util from '@ethereumjs/util';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private wallet: any;

  constructor() { }

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

    window.sessionStorage.setItem('wallet', JSON.stringify(this.wallet));
  }

  getWallet() {
    let wallet = window.sessionStorage.getItem('wallet');

    if (wallet) {
      this.wallet = JSON.parse(wallet);
    }

    return this.wallet;
  }
}
