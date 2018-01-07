import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ToastController, LoadingController } from 'ionic-angular';



@Component({
  selector: 'page-list',
  templateUrl: 'devices.html'
})
export class DevicesPage {
  devices: Array<any>;
  private deviceAdd : FormGroup;
  ip: String;
  port: Number;

  constructor(private formBuilder: FormBuilder, private storage: Storage, public http: Http, private toastController: ToastController, private loadingCtrl: LoadingController) {
    this.deviceAdd = this.formBuilder.group({
      ip: ['', Validators.required],
      port: ['', Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])]
    });

    this.storage.get('ip').then((val) => { this.ip = val; });
    this.storage.get('port').then((val) => { if ( this.port === undefined) { this.port = 7232; } else { this.port = val; } });

  }

  addDevice() {
    let loading = this.loadingCtrl.create({
      content: 'Checking Device...'
    });
  
    loading.present();
  
    this.storage.set('ip', this.ip);
    this.storage.set('port', this.port);
    try {
      const url = "http://" + this.ip + ":" + String(this.port);
      this.http.get(url + "/buttons").subscribe(data => {
          loading.dismiss();
          this.displayTempNotification("Device successfully set");
        },
        error => {
          loading.dismiss();
          this.displayErrorNotification('Could not reach device at ' + url);
        });
    }
    catch (e) {
      loading.dismiss();
      this.displayErrorNotification('Could not reach device')
  }
}

displayTempNotification(message: string) {
  this.toastController.create({
    message: message,
    duration: 2000,
    position: 'top'
  }).present();
}

displayErrorNotification(message: string) {
  this.toastController.create({
    message: message,
    showCloseButton: true,
    position: 'top',
    dismissOnPageChange: true
  }).present();
}

}


