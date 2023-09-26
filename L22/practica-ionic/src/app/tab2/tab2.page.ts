import { Component } from '@angular/core';

import Web3 from 'web3';
import { WalletService } from './../wallet.service';
import { ABI as BSMERC } from './BSMERC721';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  wallet: any = {
    address: ""
  };

  web3: any;

  // NFT CONTRACT
  nftContract: any;

  nftContractAddress: any = '0xdB354447833a035Da9f8b28f157c877bDf48F02c';

  nfts:any[] = [];

  constructor(public walletService: WalletService) {
    this.web3 = new Web3;

    this.web3.setProvider(
      new this.web3.providers.HttpProvider('http://localhost:7545')
    );

    // NFT CONTRACT
    this.nftContract = new this.web3.eth.Contract(BSMERC.default, this.nftContractAddress);
  }

  async ngOnInit() {
    this.wallet = await this.walletService.initWallet('crouch error dumb spell weekend seminar veteran problem success nest door street');

    await this.loadNFTs();
  }

  async loadNFTs() {
    let supply = await this.nftContract.methods.totalSupply().call();

    this.nfts = [];

    for (var i = 1; i <= supply; i++) {
      let url = await this.nftContract.methods.tokenURI(i).call();
      let nft = await (await fetch(url)).json();

      nft.tokenId = i;
      nft.owner = await this.nftContract.methods.ownerOf(i).call();
      nft.price = await this.nftContract.methods.priceOf(i).call();
      nft.priceUsd = 0; // await this.nftContract.methods.usdPriceOf(i).call();
      nft.disabled = nft.owner.toLowerCase() == this.wallet.address.toLowerCase();

      this.nfts.push(nft);
    }
  }

  async mintNFT() {
    var rawData = {
      from: this.wallet.address,
      to: this.nftContractAddress,
      value: 10000000000000000,
      gasPrice: this.web3.utils.toHex(10000000000),
      gasLimit: this.web3.utils.toHex(1000000),
      nonce: await this.web3.eth.getTransactionCount(this.wallet.address),
      data: await this.nftContract.methods.mint().encodeABI()
    };

    var signed = await this.web3.eth.accounts.signTransaction(rawData, this.wallet.privateKey.toString('hex'));

    this.web3.eth.sendSignedTransaction(signed.rawTransaction).then(
      (receipt: any) => {
        this.loadNFTs();
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  async buyNFT(nft:any) {
    var rawData = {
      from: this.wallet.address,
      to: this.nftContractAddress,
      value: nft.price * 1.1,
      gasPrice: this.web3.utils.toHex(10000000000),
      gasLimit: this.web3.utils.toHex(1000000),
      nonce: await this.web3.eth.getTransactionCount(this.wallet.address),
      data: await this.nftContract.methods.buy(nft.tokenId).encodeABI()
    };

    var signed = await this.web3.eth.accounts.signTransaction(rawData, this.wallet.privateKey.toString('hex'));

    this.web3.eth.sendSignedTransaction(signed.rawTransaction).then(
      (receipt: any) => {
        this.loadNFTs();
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
}
