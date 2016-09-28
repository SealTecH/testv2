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
import {Observable} from 'rxjs/Observable';
@Component({
  templateUrl: 'build/pages/ModelPage/Model.html'
})
export class ModelPage
{
  Models:Model[];
  Sub_id:number;
  http:Http;
  sb: any;
  data: any;
  values: any;
  anyErrors:any;
  finished: any;
  constructor(public navCtrl: NavController,private db: DbService,private user: User,http:Http, navParams: NavParams) {
    this.Sub_id = navParams.get('id');
    this.http = http;
    this.Models = [];







    this.db.getModels(this.Sub_id).then(data=>{
        if(data.length==0)
        {
        this.sb =   new Observable(observer =>{
            console.log("data is null");
            let flag= true;
            let page = 0;
            let  counter;
            console.log("first start");
            counter = this.test(flag,page,user,this.Sub_id);
            observer.complete();
          });
          this.sb.subscribe(val=>{this.db.getModels(this.Sub_id).then(dt=> {
            this.Models =dt;
          });});
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
  public onRef($event,id)
  {
    this.db.getModels(this.Sub_id).then(dt=> {
      this.Models = dt;
    });
  }



 public test(flag,page,user,sub_id):Promise<any>
 {
   console.log("inside");
   let url = 'http://preview.sysonline.com/ezparts-mobile/models.php';
   let body = JSON.stringify({u: user.username, p: user.pass,id:user.device_id,f:page,sid:this.Sub_id });
  return Promise.resolve(this.http.post(url, body).subscribe(data => {
     let answer = data.json();
     if(answer.r === 'ok')
     {
       flag = answer.more;
       this.db.addModels(answer.m,0,sub_id).then(data=> {
         page++;
         if(page<15&&flag)
         {
           console.log("start "+page);
           this.test(flag,page,user,sub_id);
         }
       });
      return [flag,page];
     }
   })
  );
   //return Promise.resolve({d:fg});
 }


  init()
  {
    console.log("INIT");

    this.data = new Observable(observer => {
      setTimeout(() => {
        observer.next(42);
      }, 1000);

      setTimeout(() => {
        observer.next(43);
      }, 2000);

      setTimeout(() => {
        observer.complete();
      }, 3000);
    });

    let subscription = this.data.subscribe(
      value => this.values.push(value),
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }























  //
  //
  //
  //
  //private synchModels(user,url,flag,page)
  //{
  //  console.log("go into synch at "+page);
  //  if(!flag||page>10)
  //  {
  //    console.log("flag is "+flag+" page is "+page);
  //    return Promise.resolve(null);
  //  }
  //  let body = JSON.stringify({u: user.username, p: user.pass,id:user.device_id,f:page,sid:this.Sub_id });
  //   return Promise.resolve(this.http.post(url, body).subscribe(data => {
  //    console.log(data);
  //    let answer = data.json();
  //    console.log(answer);
  //    if (answer.r === 'ok') {
  //      flag = answer.more;
  //      this.db.addModels(answer.m,0).then(data=>{
  //        page++;
  //        this.synchModels(user,url,flag,page);
  //      });
  //    }
  //    else
  //    {
  //      console.log(answer);
  //      flag = false;
  //    }
  //  })
  //   );
  //}
}
