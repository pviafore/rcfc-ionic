import { Component } from '@angular/core';

import { ToastController, LoadingController } from 'ionic-angular';
import {Http} from '@angular/http';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-list',
  templateUrl: 'buttons.html'
})
export class ButtonsPage {
  buttons: Array<any>;
  toggles: Array<any>;
  url: String;
  

  constructor(public http: Http, private storage: Storage, public toastController: ToastController, private loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: 'Retrieving Buttons...'
    });
    loading.present();
    this.buttons = [];
    this.storage.get("ip").then(
      (ip) => { this.storage.get("port").then(
        (port) => {
          this.url = "http://" + ip + ":" + String(port);
          try {
            http.get(this.url + "/buttons").subscribe(data => {
                loading.dismiss();
                this.buttons = data.json().buttons;
              },
              error => {
                loading.dismiss();
                this.displayError('There was an error trying to reach the device at ' + this.url);
              });
          }
          catch (e) {
            if (!loading.didLeave) {
              loading.dismiss();
              this.displayError('There was an error trying to retrieve buttons.  Please make sure you have a connected device' + e);
            }
          }
        } );
    });
    
  }

  displayError(message: string) {
    this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      dismissOnPageChange: true
    }).present();
    
  }

  itemTapped(event, button) {
    this.http.post(this.url +"/buttons/"+button.id, {}).subscribe(error => {
        console.log(error);
    })
  }

  toggleTapped(event, toggle) {
    this.http.post(this.url +"/buttons/"+toggle.id, {"value": event.checked}).subscribe(error => {
        console.log(error);
    })
  }
  
  sliderSet(event, slider) {
    this.http.post(this.url +"/buttons/"+slider.id, {"value": event.value}).subscribe(error => {
        console.log(error);
    })
  }
}
