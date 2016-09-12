/**
 * Created by sealtech on 12.09.2016.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DbService,Manufacturer,Model,Submodel} from '../../db/DbService'
import {SecondPage} from '../secondpage/secondPage';
import {Injectable} from '@angular/core'

@Component({
  templateUrl: 'build/pages/SubmodelPage/SubmodelPage.html',
  providers:   [DbService]
})
export class SubmodelPage
{
  Submodels:Model[];
  Model_id:number;
  constructor(public navCtrl: NavController,private db: DbService, navParams: NavParams) {
    this.Model_id = navParams.get('id');
    this.db.returnSubmodels(this.Model_id).then(

      data=>{
        this.Submodels = [];
        if(data.res.rows.length>0){
          for(var i=0;i<data.res.rows.length;i++)
          {
            let item = data.res.rows.item(i);
            console.log(item);
            this.Submodels.push(new Submodel(item.Name,item.id,item.Type,item.Desc));
          }
        }
      }
    );

  }
}
