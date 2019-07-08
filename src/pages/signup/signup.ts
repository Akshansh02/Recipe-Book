import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ServiceAuth } from '../../services/auth';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public serviceAuth: ServiceAuth,
    public loadingCtrl: LoadingController,
    public alrtCtrl :AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form:NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing You Up'
    });
    loading.present();
    this.serviceAuth.signup(form.value.email, form.value.password)
      .then(data => {loading.dismiss()})
      .catch(error => {
        loading.dismiss()
        const alert = this.alrtCtrl.create({
          title:'Signup Failed',
          message:error.message,
          buttons:['ok']
        });
        alert.present();
      });
  }

}
