/**
 * Created by sealtech on 12.09.2016.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DbService,Manufacturer,Model,Submodel} from '../../db/DbService'
import {SecondPage} from '../secondpage/secondPage';
import {Injectable} from '@angular/core'
import {SubmodelPage} from "../SubmodelPage/SubmodelPage";
@Component({
  templateUrl: 'build/pages/ModelPage/Model.html',
  providers:   [DbService]
})
export class ModelPage
{
  Models:Model[];
  Manufacturer_id:number;
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


  goClick(event,id)
  {
    this.navCtrl.push(SubmodelPage,{id:id});
  }

}
