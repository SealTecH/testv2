/**
 * Created by sealtech on 12.09.2016.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DbService,Manufacturer,Model,Submodel} from '../../db/DbService'
import {Injectable} from '@angular/core'


declare var zip: any;
@Component({
  templateUrl: 'build/pages/SubmodelPage/Submodel.html'
})
export class SubmodelPage
{
  zipObj: any;
  Type: number;
  Submodels:Submodel[];
  Model_id:number;
  constructor(public navCtrl: NavController,private db: DbService, navParams: NavParams) {



    this.Model_id = navParams.get('id');
    this.Type = navParams.get('type');
    this.db.returnSubmodels(this.Model_id,this.Type).then(
      data=>{
        this.Submodels = [];
        if(data.res.rows.length>0){
          for(var i=0;i<data.res.rows.length;i++)
          {
            let item = data.res.rows.item(i);
            console.log(item);
            this.Submodels.push(new Submodel(item.id,item.Name,item.Type,item.Parent_id,item.Description));
          }
        }
      }
    );
  }


  public onClick(event,id,Type)
  {

    if(Type==='folder')
    {
      console.log(" on click event this id = "+id);
      this.navCtrl.push(SubmodelPage,{id:id,item_type:1});
    }
    //
  }
}
