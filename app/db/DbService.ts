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
    //this.insertData();
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
    this.createTable('submodels',['Name','Model_id','Type','Description'],['TEXT','INTEGER','TEXT','BLOB']);
     sql = 'INSERT INTO submodels (Name, Model_id, Type, Description) VALUES (?,?,?,?)';
     i = 0;
     j=0;
    while(i<100)
    {
      while (j<10)
      {
        let m = Math.random()*10;
        let type,desc = null;
        if(m<4)
        {
          type = 'folder';
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
        console.log(sql, [j.toString()+" submodel",i+1,type,desc]);
        this.storage.query(sql, [j.toString()+" submodel",i+1,type,desc]);
        j++;
      }
      j=0;
      i++;
    }
  }

  public returnManufactures()
  {
    return this.storage.query('SELECT * FROM manufactures');
  }

  public returnModels(id:number)
  {
    console.log('SELECT * FROM models WHERE Manufacturer_id = '+id);
    return this.storage.query('SELECT * FROM models WHERE Manufacturer_id = '+id);
  }

  public returnModels(id:number)
  {
    console.log('SELECT * FROM models WHERE Manufacturer_id = '+id);
    return this.storage.query('SELECT * FROM models WHERE Manufacturer_id = '+id);
  }
  public returnSubmodels(id:number)
  {
    console.log('SELECT * FROM models WHERE Model_id = '+id);
    return this.storage.query('SELECT * FROM models WHERE Manufacturer_id = '+id);
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
  Desc: any;
  constructor( val: string, id: number,type:string,desc:any) {
    this.Name = val;
    this.id = id;
    this.Type = type;
    this.Desc = desc;
  }
}
