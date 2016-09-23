/**
 * Created by sealtech on 12.09.2016.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DbService,Subscription,Model,Submodel} from '../../db/DbService'
import {Injectable} from '@angular/core'
import {SubmodelPage} from "../SubmodelPage/SubmodelPage";
@Component({
  templateUrl: 'build/pages/ModelPage/Model.html'
})
export class ModelPage
{
  Models:Model[];
  Sub_id:number;
  constructor(public navCtrl: NavController,private db: DbService, navParams: NavParams) {
    this.Manufacturer_id = navParams.get('id');
    this.db.returnModels(this.Manufacturer_id).then(

      data=>{
        this.Models = [];
        if(data.res.rows.length>0){
          for(var i=0;i<data.res.rows.length;i++)
          {
            let item = data.res.rows.item(i);
            console.log(item);
            this.Models.push(new Model(item.Name,item.id ));
          }
        }
      }
    );

  }


  public onClick(event,id)
  {
    console.log("model click");
    this.navCtrl.push(SubmodelPage,{id:id,type:0});
  }

}
