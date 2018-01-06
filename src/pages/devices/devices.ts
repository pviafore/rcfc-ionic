import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-list',
  templateUrl: 'devices.html'
})
export class DevicesPage {
  devices: Array<any>;
  private deviceAdd : FormGroup;
  ip: String;
  port: Number;

  constructor(private formBuilder: FormBuilder, private storage: Storage) {
    this.deviceAdd = this.formBuilder.group({
      ip: ['', Validators.required],
      port: ['', Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])]
    });

    this.storage.get('ip').then((val) => { this.ip = val; });
    this.storage.get('port').then((val) => { if ( this.port === undefined) { this.port = 7232; } else { this.port = val; } });

  }

  addDevice() {
    this.storage.set('ip', this.ip);
    this.storage.set('port', this.port);
  }

}


