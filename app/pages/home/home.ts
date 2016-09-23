import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DbService,Subscription,Model,Submodel} from '../../db/DbService'
import {Injectable} from '@angular/core'
import {ModelPage} from "../ModelPage/ModelPage";
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  Subscriptions:Subscription[];
  constructor(public navCtrl: NavController,private db: DbService) {
/*
     this.db.returnSubscriptions(1).then(
       data=>{
         this.Subscriptions = [];
         if(data.res.rows.length>0){
           for(var i=0;i<data.res.rows.length;i++)
           {
             let item = data.res.rows.item(i);
             console.log(item);
             this.Subscriptions.push(new Subscription(item.Name,item.id,item.Ext_id ));
           }
         }
       }
     );
*/
  }

  onClick(event,id)
  {
    this.navCtrl.push(ModelPage,{id:id});
  }


}
