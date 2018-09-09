import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { ColorPickerModule } from 'ngx-color-picker';

import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { ButtonsPage } from '../pages/buttons/buttons';
import { DevicesPage } from '../pages/devices/devices';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    ButtonsPage,
    DevicesPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ColorPickerModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ButtonsPage,
    DevicesPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
