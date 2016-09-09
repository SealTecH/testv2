/**
 * Created by sealtech on 09.09.2016.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/secondpage/secondPage.html',
})
export class SecondPage
{
id: number;
  constructor(public nav: NavController, navParams: NavParams) {
    // Retrieve the login from the navigation parameters
    this.id = navParams.get('id');
  }
}
