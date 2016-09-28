import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DbService,Subscription,Model,Submodel} from '../../db/DbService'
import {Injectable} from '@angular/core'
import {ModelPage} from "../ModelPage/ModelPage";
import {File} from 'ionic-native';
import {Platform } from 'ionic-angular';
import {Transfer} from 'ionic-native';
import {AlertController} from "../../../node_modules/ionic-angular/components/alert/alert";
//declare var cordova: any;
//const fs:string = cordova.file.dataDirectory;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  url:string;


  constructor(private nav:NavController, private platform:Platform, private alertCtrl:AlertController) {

    //
    //File.createFile('files', 'feedback.txt', true).then((fileEntry) => {
    //
    //  fileEntry.createWriter((fileWriter) => {
    //
    //    fileWriter.onwriteend = () => {
    //      console.log('File writer - write end event fired...');
    //      alert('File writer - write end event fired...');
    //    };
    //
    //    fileWriter.onerror = (e) => {
    //      console.log('file writer - error event fired: ' + e.toString());
    //     alert('file writer - error event fired: ' + e.toString());
    //    };
    //
    //    fileWriter.write("ololo");
    //  });
    //}).catch(err =>{
    //  console.log(err);
    //});

  }





}
