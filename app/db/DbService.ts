/**
 * Created by sealtech on 08.09.2016.
 */
import {Storage, SqlStorage} from 'ionic-angular';
import {Type} from "../../node_modules/@angular/common/src/facade/lang";
import {Injectable} from '@angular/core';

@Injectable()
export  class  DbService
{
  storage: Storage = null;

  constructor(){
    this.storage = new Storage(SqlStorage);
    console.log("I was Born!");
    //this.insertData();
    console.log("I insert data");
  }
 /* constructor(TblName: string, Keys: Array<string>, Types: Array<string>){
    this.storage = new Storage(SqlStorage);
    this.createTable(TblName, Keys, Types);
  }*/

  public createTable(TblName: string, Keys: Array<string>, Types: Array<string>)
  {
    if( ( Keys.length>0 && Types.length>0) &&  Keys.length==Types.length)
    {
      let i:number = 0;
      let field_string: string='id INTEGER PRIMARY KEY AUTOINCREMENT, ';
      while (i<Keys.length)
      {
        field_string+=Keys[i]+' '+Types[i]+', ';
        i++;
      }
      field_string = field_string.substring(0,field_string.length-2);
      this.storage.query("CREATE TABLE IF NOT EXISTS "+TblName+" ("+field_string+")");
    }
  }


  public insertData()
  {
    this.storage.query("DROP TABLE manufactures");
    this.createTable('manufactures',['Name'],['TEXT']);
    var sql:string = 'INSERT INTO manufactures (Name) VALUES (?)';
    var i: number = 0;
    while(i<10)
    {
      console.log(sql, [i.toString()+" manufacturer"]);
      this.storage.query(sql, [i.toString()+" manufacturer"]);
      i++;
    }


    this.storage.query("DROP TABLE models");
    this.createTable('models',['Name','Manufacturer_id'],['TEXT','INTEGER']);
     sql = 'INSERT INTO models (Name, Manufacturer_id) VALUES (?,?)';
     i= 0;
    let j: number = 0;
    while(i<10)
    {
      while (j<10)
      {
        console.log(sql, [j.toString()+" model",i+1]);
        this.storage.query(sql, [j.toString()+" model",i+1]);
        j++;
      }
      j=0;
      i++;
    }


    this.storage.query("DROP TABLE submodels");
    this.createTable('submodels',['Name','Model_id','Type','Description','Parent_id'],['TEXT','INTEGER','TEXT','BLOB','INTEGER']);
     sql = 'INSERT INTO submodels (Name, Model_id, Type, Description,Parent_id) VALUES (?,?,?,?,?)';
     i = 0;
     j=0;
    let m;
    let p = null;
    let type,desc = null;
    while(i<100)
    {
      while (j<10)
      {
         m = Math.random()*10;
        if(m<4)
        {
          type = 'folder';
          desc = null;
        }
        else
        if(m<7)
        {
          type ='schematic';
          desc = 'something in png';
        }
        else
        {
          type = 'pdf';
          desc = 'something in pdf';
        }
        console.log(sql, ["m: "+m+" "+j.toString()+" submodel",i+1,type,desc,p]);
        this.storage.query(sql, [j.toString()+" submodel",i+1,type,desc,p]);

        if(m<4)
        p = (i+1)*(j+1)-1;
        else
        {
          m = Math.random()*10;
          if(m<5)
          {
            p=null;
          }
        }

        j++;
      }
      j=0;
      i++;
    }
  }

  public returnManufactures()
  {
    console.log("start retriving manufactures");
    return this.storage.query('SELECT * FROM manufactures');
  }

  public returnModels(id:number)
  {
    console.log('SELECT * FROM models WHERE Manufacturer_id = '+id);
    return this.storage.query('SELECT * FROM models WHERE Manufacturer_id = '+id);
  }


  public returnSubmodels(id:number,item_type: number)
  {

    if(item_type ==0)
    {
      console.log('SELECT * FROM submodels WHERE Model_id = '+id);
      return this.storage.query('SELECT submodels.id as id, submodels.Name as Name,submodels.Model_id as Model_id, submodels.Type as Type,  submodels.Parent_id as Parent_id,submodels.Description as Description FROM submodels WHERE Model_id = '+id);
    }
    else
    {
      console.log('SELECT * FROM submodels WHERE Parent_id = '+id);
      return this.storage.query('SELECT submodels.id as id,submodels.Name as Name,submodels.Model_id as Model_id, submodels.Type as Type,  submodels.Parent_id as Parent_id,submodels.Description as Description FROM submodels WHERE Parent_id = '+id);
    }

  }
}


export class Manufacturer {
  Name: string;
  id: number;
  constructor( val: string, id: number) {
    this.Name = val;
    this.id = id;
  }
}

export class Model {
  Name:string;
  id:number;

  constructor(val:string, id:number) {
    this.Name = val;
    this.id = id;
  }
}

export class Submodel {
  Name: string;
  id: number;
  Type: string;
  Parent_id: number;
  Description:any;
  constructor(  id: number,val: string,type:string,parent_id: number,Description:any) {/*,desc:any*/
    this.Name = val;
    this.id = id;
    this.Type = type;
    this.Parent_id = parent_id;
    this.Description = Description;
    //this.Desc = desc;
  }
}
