import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DbService,Manufacturer,Model,Submodel} from '../../db/DbService'
import {SecondPage} from '../secondpage/secondPage';
import {Injectable} from '@angular/core'
import {ModelPage} from "../ModelPage/ModelPage";
@Component({
  templateUrl: 'build/pages/home/home.html',
  providers:   [DbService]
})
export class HomePage {

  Manufactures:Manufacturer[];
  constructor(public navCtrl: NavController,private db: DbService) {

     this.db.returnManufactures().then(
       data=>{
         this.Manufactures = [];
         if(data.res.rows.length>0){
           for(var i=0;i<data.res.rows.length;i++)
           {
             let item = data.res.rows.item(i);
             console.log(item);
             this.Manufactures.push(new Manufacturer(item.Name,item.id ));
           }
         }
       }
     );

  }

  onClick(event,id)
  {
    this.navCtrl.push(ModelPage,{id:id});
  }


}
