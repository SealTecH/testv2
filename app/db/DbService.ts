/**
 * Created by sealtech on 08.09.2016.
 */
import {Storage, SqlStorage} from 'ionic-angular';
import {Type} from "../../node_modules/@angular/common/src/facade/lang";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {DelaySignature} from "../../node_modules/rxjs/src/operator/delay";
@Injectable()
export  class  DbService
{
  storage: Storage = null;

  constructor(){
    this.storage = new Storage(SqlStorage);
   // this.insertData();
  //  this.storage.query("DROP TABLE Subscriptions");
   // this.storage.query("DROP TABLE Users");
    this.storage.query("DROP TABLE Models");
    this.createTable("Users",["Username","Password"],["TEXT","TEXT"]);
    this.createTable("Subscriptions",["Ext_id","Name","User_id"],["INTEGER","TEXT","INTEGER"]);
    this.createTable("Models",["Sub_id","Ext_id","Code","Desc"],["INTEGER","INTEGER","TEXT","TEXT"]);
  }

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

    this.storage.query("DROP TABLE subscriptions");
    this.createTable('subscriptions',["Ext_id","Name","User_id"],["INTEGER","TEXT","INTEGER"]);
    var sql:string = 'INSERT INTO subscriptions (Ext_id,Name,User_id) VALUES (?,?,?)';
    var i: number = 0;
    while(i<10)
    {
      console.log(sql, [i.toString()+" subscription"]);
      this.storage.query(sql, [i,i.toString()+" subscription",1]);
      i++;
    }


    this.storage.query("DROP TABLE models");
    this.createTable('models',['Name','Ext_id'],['TEXT','INTEGER']);
     sql = 'INSERT INTO models (Name, Ext_id) VALUES (?,?)';
    this.storage.query("DROP TABLE models_subscriptions");
    this.createTable('models_subscriptions',['Model_id','Subscription_id'],['INTEGER','INTEGER']);
    let sql2 = 'INSERT INTO models_subscriptions (Model_id, Subscription_id) VALUES (?,?)';
    let id =null;
    i= 0;
    let j: number = 0;
    while(i<10)
    {
      while (j<10)
      {
        console.log(sql, [j.toString()+" model",i+1]);
        this.storage.query(sql, [j.toString()+" model",i+1]);
        id = this.last_id();
        this.storage.query(sql2, [id,i+1]);

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

  public last_id()
  {
    let id:number;
    return Promise.resolve( this.storage.query("SELECT last_insert_rowid()").then(
      data=>{
        if(data.res.rows.length>0){
          console.log(data);
            let item = data.res.rows[0];
          return  item["last_insert_rowid()"];
        }
      }
    ));

  }
  public returnSubscriptions(UserId: number)
  {
    console.log("start retriving subscriptions number "+UserId);
    return this.storage.query('SELECT * FROM subscriptions WHERE User_id = ?',[UserId]);
  }

  public getModels(Sub_id:number)
  {

    console.log('SELECT * FROM models WHERE Sub_id = '+Sub_id);
    let models:Model[];
    return Promise.resolve( this.storage.query('SELECT * FROM models WHERE Sub_id = '+Sub_id).then(
      data=>{
        if(data.res.rows.length>0) {
          for(var i=0;i<data.res.rows.length;i++)
          {
            let item = data.res.rows.item(i);
            console.log(item);
            models.push(new Model(item.id,item.Ext_id,item.Sub_id,item.Code,item.Desc));
          }
          return models;
        }
        else return models;
      }
    ));
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

  public getUser(login: string,pass:string)
  {
    let id: number = null;
    return Promise.resolve( this.storage.query('SELECT id FROM users WHERE Username = ? and Password = ?',[login,pass]).then(
      data=>
      {
        if(data.res.rows.length>0) {
          let item = data.res.rows[0];
          console.log("item ");
          console.log(item);
          return item.id;
        }
      })
    );
}
  public setUser(login: string,pass:string)
  {
    this.storage.query('INSERT INTO users (Username,Password) VALUES (?,?)',[login,pass]);
    return this.last_id();
  }

  public addSubscriptions(answer,UserId:any)
  {
    let sub;
    for(sub in answer)
    {
      console.log('INSERT INTO Subscriptions (Ext_id,Name,User_id) VALUES (?,?,?)',[sub,answer[sub],UserId]);
      this.storage.query('INSERT INTO Subscriptions (Ext_id,Name,User_id) VALUES (?,?,?)',[sub,answer[sub],UserId]);
    }
    return Promise.resolve();
  }

}


export class Subscription {
  Name: string;
  id: number;
  Ext_id: number;
  User_id: number;
  constructor( val: string, id: number,ext_id:number,user_id:number) {
    this.Name = val;
    this.id = id;
    this.Ext_id = ext_id;
    this.User_id = user_id;
  }
}

export class Model {
  Desc:string;
  id:number;
  Sub_id:number;
  Ext_id:number;
  Code:string;

  constructor(id:number,Ext_id:number,Sub_id:number,Code:string,Desc:string) {
    this.id = id;
    this.Sub_id = Sub_id;
    this.Ext_id = Ext_id;
    this.Code = Code;
    this.Desc = Desc;
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
  }
}
