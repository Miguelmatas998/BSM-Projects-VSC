import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public wallet: any;

  constructor(public router: Router, public walletService: WalletService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.wallet = this.walletService.getWallet();

    if (!this.wallet) {
      this.router.navigate(['/login']);
    }
  }

}
