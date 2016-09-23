/**
 * Created by sealtech on 12.09.2016.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DbService,Subscription,Model,Submodel} from '../../db/DbService'
import {Injectable} from '@angular/core'
import {SubmodelPage} from "../SubmodelPage/SubmodelPage";
import {Device} from 'ionic-native';
import {Platform} from 'ionic-angular';
import { Http } from '@angular/http';
import {User} from "../../user/User";
@Component({
  templateUrl: 'build/pages/ModelPage/Model.html'
})
export class ModelPage
{
  Models:Model[];
  Sub_id:number;
  http:Http;
  constructor(public navCtrl: NavController,private db: DbService,private user: User,http:Http, navParams: NavParams) {
    this.Sub_id = navParams.get('id');
    this.http = http;

    this.db.getModels(this.Sub_id).then(data=>{
        if(data==null)
        {
          let url = 'http://razorolog.ua.local/ezparts-mobile/models.php';
          let body = JSON.stringify({u: user.username, p: user.pass,id:user.device_id });
          this.http.post(url, body).subscribe(data => {
            console.log(data);
            let answer = data.json();
            console.log(answer);
            if (answer.r === 'ok') {


            }
          });
        }
      else
        {
          this.Models=data;
        }
    });
  }


  public onClick(event,id)
  {
    console.log("model click");
    this.navCtrl.push(SubmodelPage,{id:id,type:0});
  }

}
