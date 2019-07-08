import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ServiceAuth } from '../../services/auth';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public serviceAuth: ServiceAuth, 
              public loadingCtrl:LoadingController,
              public alrtCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignin(form:NgForm){
    const loading = this.loadingCtrl.create({
      content:'Signing in '
    });
    loading.present();
    this.serviceAuth.signin(form.value.email,form.value.password)
    .then(data => {
     loading.dismiss();
    })
    .catch(error => {
      loading.dismiss();
      const alert = this.alrtCtrl.create({title:'Faile to Sign In',message:error.message, buttons:['Ok']});
      alert.present();
    });
  }
}
