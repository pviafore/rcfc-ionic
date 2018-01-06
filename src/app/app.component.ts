import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ButtonsPage } from '../pages/buttons/buttons';
import { DevicesPage } from '../pages/devices/devices';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = ButtonsPage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen, 
              public menu: MenuController) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      { title: "RCFC - HOME", component: ButtonsPage },
      { title: "Device", component: DevicesPage}
    ];
  }

  openPage(page) { 
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}

