import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';


@Component({
  selector: 'page-list',
  templateUrl: 'buttons.html'
})
export class ButtonsPage {
  buttons: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.buttons = [];
    
    http.get("http://192.168.2.28:7232/buttons").subscribe(data => {
        this.buttons = data.json().buttons;
      },
      error => {
        console.log(error);
      });
    
  }

  itemTapped(event, button) {
    console.log(button);
    this.http.post("http://192.168.2.28:7232/buttons/"+button.id, {}).subscribe(error => {
        console.log(error);
    })
  }
}
