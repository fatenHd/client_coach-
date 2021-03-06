import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from '@angular/fire/auth'; 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth:AngularFireAuth) {
	      const authUnsubscribe = afAuth.authState.subscribe(user => {
      if (user) {
this.rootPage=HomePage;
	  }  else {
		  this.rootPage='Login';
	  }
	  });
    platform.ready().then(() => {
	  
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

