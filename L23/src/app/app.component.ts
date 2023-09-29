import { Component } from '@angular/core';

import { create } from 'ipfs-http-client'
var Bzz = require('web3-bzz');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ipfs;

  bzz;

  buffer:any;

  constructor() {
    this.ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      apiPath: '/api/v0',
      headers: {
        authorization: 'Basic ' + Buffer.from('29LKkkFosqL3FRvdhZH83JKA2me:b252631a377cbee6dcd82b0f9aba32a2').toString('base64')
      }
    });

    this.bzz = {};
    // this.bzz = new Bzz('https://gateway-proxy-bee-1-0.gateway.ethswarm.org');
  }

  handleFileInput($event:any) {
    let files = $event.currentTarget.files
    let reader = new FileReader();

    reader.readAsArrayBuffer(files.item(0));
    reader.onloadend = () => this.convertToBuffer(reader);
  }

  async convertToBuffer(reader:any) {
    this.buffer = await Buffer.from(reader.result);
    console.log(this.buffer);
  }

  async submit($event:any) {
    $event.preventDefault();

    await this.ipfs.add(this.buffer).then(value => {
      console.log('https://ipfs.io/ipfs/' + value.path);
    });

    /** await this.bzz.upload(this.buffer).then((value:any) => {
      console.log(value);
    }); */
  }

}