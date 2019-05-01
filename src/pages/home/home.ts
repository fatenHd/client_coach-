import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth';
//import {Login} from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authProvider:AuthProvider) {

  }

  logoutUser() {
	  this.authProvider.logoutUser().then(() => {
		  //this.navCtrl.setRoot('login');
		  console.log('logged out');
	  });
  } 
}
