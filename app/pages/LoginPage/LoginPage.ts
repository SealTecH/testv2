/**
 * Created by sealtech on 22.09.2016.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DbService,Subscription} from '../../db/DbService'
import {Injectable} from '@angular/core'
import {Device} from 'ionic-native';
import {Platform} from 'ionic-angular';
import { Http } from '@angular/http';
import {SubscriptionsPage} from "../SubscriptionsPage/SubscriptionsPage";
import {User} from "../../user/User";

@Component({
  templateUrl: 'build/pages/LoginPage/Login.html'
})
export class LoginPage
{

  login:string;
  pass: string;
  http:Http;
  public device;
  error: string;
  constructor(public navCtrl: NavController,private db: DbService,http:Http, public platform: Platform,private user:User)
  {

    this.http = http;
    this.device={};
    platform.ready().then(() => {
      this.device['uuid'] = Device.device.uuid;
    });
  }

  public onSign(login:string,pass:string) {
    let url = 'http://preview.sysonline.com/ezparts-mobile/subscriptions.php';
    console.log("log "+login);
    console.log("pas "+pass);
    console.log("id "+this.device['uuid']);
    if(this.device['uuid']===undefined)
      this.device['uuid'] = "THIS IS WINDOWS!";
    let body = JSON.stringify({u: login, p: pass,id:this.device['uuid'] });
    return this.http.post(url, body).subscribe(data => {
      console.log(data);
      let answer = data.json();
      console.log(answer);
    if(answer.r ==='ok')
    {
      let UserId =null;
       this.db.getUser(login,pass).then(data=>{
         console.log("data "+data);
         if(data==undefined)
         {
           console.log("going to insert");
           this.db.setUser(login,pass).then(data=>{
             console.log("set "+data);

             this.user.insertUser(data,login,pass,this.device['uuid']);
             this.db.addSubscriptions(answer.s,data).then(vv=>{
               console.log("complete insert data is "+data);
               this.navCtrl.push(SubscriptionsPage,{UserId:data});
             });
           });
         }
         else
         {
           this.user.insertUser(data,login,pass,this.device['uuid']);
           this.navCtrl.push(SubscriptionsPage,{UserId:data});
         }

       });
    }
     else
    {
      this.error = answer.m;
    }
    }, error => {
      console.log("Oooops!");
    });
  }
}
