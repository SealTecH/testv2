import {App} from 'ionic-angular';
import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home';
import {DbService} from "./db/DbService";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {User} from "./user/User";
@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {
  //rootPage: any = LoginPage;
  rootPage: any =LoginPage;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.



      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp,[DbService,User]);
