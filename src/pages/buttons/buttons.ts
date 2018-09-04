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
  groups: Set<String>;
  visible_buttons: Array<any>;
  visible_toggles: Array<any>;
  url: String;
  group: String;


  constructor(public http: Http, private storage: Storage, public toastController: ToastController, private loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: 'Retrieving Buttons...'
    });
    loading.present();
    this.group = "All";
    this.buttons = [];
    this.groups = new Set();
    this.storage.get("ip").then(
      (ip) => { this.storage.get("port").then(
        (port) => {
          this.url = "http://" + ip + ":" + String(port);
          try {
            http.get(this.url + "/buttons").subscribe(data => {
                loading.dismiss();
                data.json().buttons.forEach(button => {
                  button.groups.forEach(group => {
                    this.groups.add(group);
                  });
                });
                this.buttons = data.json().buttons.filter((b) => b.type == "button.simple");
                this.toggles = data.json().buttons.filter((b) => b.type == "button.toggle");
                this.loadValues();
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

  loadValues() {
    if(this.group === "All") {
      this.setValues((b) => true);
    } else if(this.group === "Unassigned") {
      this.setValues((b) => b.groups.length === 0);
    } else {
      this.setValues((b) => b.groups.includes(this.group));
    }
  }

  setValues(filter_condition) {
    this.visible_buttons = this.buttons.filter(filter_condition);
    this.visible_toggles = this.toggles.filter(filter_condition);
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
}
