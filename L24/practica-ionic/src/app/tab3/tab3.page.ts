import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";

import Web3 from 'web3';
import { WalletService } from '../wallet.service';

import { ABI as ProductManagement } from './ProductManagement';
import { ABI as ChangeOwnership } from './ChangeOwnership';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  wallet:any = {
    address: ""
  };

  web3:any;

  productManagementAddress = '0x27D9691027685C6f89A52a1196a1bCd1D2A74CCf';
  changeOwnershipAddress = '0xa213374310476b7787A94C004b2b4808C9562F0b';

  productManagement:any;
  changeOwnership:any;

  createPartForm: any;

  parts:any = [];

  constructor(public walletService: WalletService, private formBuilder: FormBuilder) {
    this.createPartForm = formBuilder.group({
      sku: '',
      name: '',
      date: ''
    });
  }

  async ngOnInit() {
    this.wallet = await this.walletService.initWallet('middle squeeze pull battle stadium typical file ride park help forward obey');
    this.web3 = new Web3;

    this.web3.setProvider(
      new this.web3.providers.HttpProvider('http://localhost:7545')
    );

    this.productManagement = new this.web3.eth.Contract(ProductManagement.default, this.productManagementAddress);
    this.changeOwnership = new this.web3.eth.Contract(ChangeOwnership.default, this.changeOwnershipAddress);

    this.productManagement.getPastEvents('PartCreated', { fromBlock: 0, toBlock: 'latest' }).then((events:any) => {
      for (let event of events) {
        this.productManagement.methods.parts(event.returnValues.part_hash).call().then((part:any) => {
          console.log(part);
          this.parts.push(part);
        });
      }
    });
  }

  async createPart(data:any) {
    var rawData = {
      from: this.wallet.address,
      to: this.productManagementAddress,
      value: 0,
      gasPrice: this.web3.utils.toHex(10000000000),
      gasLimit: this.web3.utils.toHex(1000000),
      nonce: await this.web3.eth.getTransactionCount(this.wallet.address),
      data: await this.productManagement.methods.buildPart(data.sku, data.name, data.date).encodeABI()
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
