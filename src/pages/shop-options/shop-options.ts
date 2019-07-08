import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shop-options',
  templateUrl: 'shop-options.html',
})
export class ShopOptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopOptionsPage');
  }
  onAction(action: string){
    this.viewCtrl.dismiss({action: action});
}

}
