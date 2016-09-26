/**
 * Created by sealtech on 23.09.2016.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class User
{
  user_id:number;
  username:string;
  pass:string;
  device_id:any;
  constructor(){
    this.user_id=null;
    this.username ='';
    this.pass = '';
    this.device_id=null;
  }
 public insertUser(id:any,username:string,pass:string,dev_id:any)
  {
    this.user_id=id;
    this.username=username;
    this.pass = pass;
    this.device_id = dev_id;
  }
}
