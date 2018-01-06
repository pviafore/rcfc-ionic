import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-list',
  templateUrl: 'buttons.html'
})
export class ButtonsPage {
  buttons: Array<any>;
  url: String;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage) {

    this.buttons = [];
    this.storage.get("ip").then(
      (ip) => { this.storage.get("port").then(
        (port) => {
          this.url = "http://" + ip + ":" + String(port);
          try {
            http.get(this.url + "/buttons").subscribe(data => {
                this.buttons = data.json().buttons;
              },
              error => {
                console.log(error);
              });
          }
          catch (e) {
            console.log(" An error occurred " + e);
            console.log(this.url)
          }
        });
    });
  }

  itemTapped(event, button) {
    console.log(button);
    this.http.post(this.url +"/buttons/"+button.id, {}).subscribe(error => {
        console.log(error);
    })
  }
}
