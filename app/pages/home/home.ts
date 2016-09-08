import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Db,Element} from '../../db/db-component'

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

elements: Element[];
dtb: Db;
  constructor(public navCtrl: NavController) {

    this.dtb = new Db();
    this.dtb.insertData();
     this.dtb.returnData().then(

       data=>{
         this.elements = [];
         if(data.res.rows.length>0){
           for(var i=0;i<data.res.rows.length;i++)
           {
             let item = data.res.rows.item(i);
             this.elements.push(new Element(item.key,item.val,item.id ));
           }
         }
       }
     );

  }



}
