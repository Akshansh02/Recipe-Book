import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ServiceShoppingList } from '../../services/serviceShoppingList';
import { Ingredient } from '../../models/ingredient';
import { ShopOptionsPage } from '../shop-options/shop-options';
import { ServiceAuth } from '../../services/auth';



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
listItem:Ingredient[];
  constructor(private slService:ServiceShoppingList, 
    private popOverCtrl: PopoverController, 
    private authService: ServiceAuth,
    private loadingCtrl: LoadingController,
    private alrtCtrl: AlertController){}

 onAddItem(form:NgForm)
 {
   this.slService.addItem(form.value.ingredientName,form.value.amount);
   form.reset();
   this.loadItems();
 }

 ionViewWillEnter(){
  this.loadItems();
 }

  loadItems(){
  this.listItem = this.slService.getItems();
 }
 onShowOptions(event: MouseEvent){
   const loadi = this.loadingCtrl.create({
     content:'Please Wait'
   })
   const popover = this.popOverCtrl.create(ShopOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data =>{
        
        if(!data){
          return;
        }
        if(data.action == 'load'){
          loadi.present();
          this.authService.getActiveUser().getIdToken()
          .then((token: string) => {
            this.slService.loadList(token)
            .subscribe(
              (list:Ingredient[])=>{
                loadi.dismiss();
                if(list){
                  this.listItem = list;
                }
                else{
                  this.listItem = [];
                }
              },
              error=>{
                loadi.dismiss();
                console.log(error);
                this.handleError(error.message);
              }
            );
          });
        }
        else if(data.action == 'store'){
          loadi.present();
            this.authService.getActiveUser().getIdToken()
            .then((token: string) => {
              this.slService.storeList(token)
              .subscribe(
                ()=>loadi.dismiss(),
                error=>{
                  loadi.dismiss();
                  console.log(error);
                  this.handleError(error.message);
                }
              );
            });
            
        }
      }
      )
 }

  onCheckItem(index:number){
   this.slService.removeItem(index);
   this.loadItems();
 }

 private handleError(erorrmessage: string){
     this.alrtCtrl.create({
     title:'An error Occured',
     message:erorrmessage,
     buttons:['Ok']
   }).present();
 }

}
