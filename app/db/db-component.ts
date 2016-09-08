/**
 * Created by sealtech on 08.09.2016.
 */
import {Storage, SqlStorage} from 'ionic-angular';
import {Type} from "../../node_modules/@angular/common/src/facade/lang";


export  class  Db
{
  storage: Storage = null;

  constructor(){
    this.storage = new Storage(SqlStorage);
  }
  constructor(TblName: string, Keys: Array<string>, Types: Array<string>){
    this.storage = new Storage(SqlStorage);
    this.createTable(TblName, Keys, Types);
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
    this.createTable('test',['key','val'],['INTEGER','TEXT']);

    let sql = 'INSERT INTO test (key, val) VALUES (?,?)';
    let i: number = 0;
    while(i<10)
    {
      this.storage.query(sql, [i+1,i.toString()+" value"]);
      i++;
    }
  }

  public returnData()
  {
    return this.storage.query('SELECT * FROM test');
  }
}
