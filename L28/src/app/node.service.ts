import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import Web3 from 'web3';

var BSMWINE = require('../../build/contracts/BSMWINE.json');

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  contract: any;

  contractAddress: any;

  web3: any;

  wines: any = [];

  constructor() {
    this.web3 = new Web3;

    this.web3.setProvider(
      new this.web3.providers.HttpProvider(environment.provider)
    );

    this.contractAddress = BSMWINE.networks[environment.networkId].address;
    this.contract = new this.web3.eth.Contract(BSMWINE.abi, this.contractAddress);
  }
}
