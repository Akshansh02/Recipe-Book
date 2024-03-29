import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ServiceAuth } from '../services/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false; 

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController,public serviceAuth: ServiceAuth) {
    firebase.initializeApp({
      apiKey: "AIzaSyADdwQ9qwiJxcBrepSouX3rh9EGLPR3Nm4",
      authDomain: "recipe-book-5087e.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      }
      else{
        this.isAuthenticated = false;
        this.rootPage = this.signinPage;     
       }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(){
  this.serviceAuth.logout();
   this.menuCtrl.close();
   this.nav.setRoot(this.signinPage);
  }
}

