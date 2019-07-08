import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ServiceRecipe } from '../../services/serviceRecipe';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';
import { ServiceAuth } from '../../services/auth';
import { ShopOptionsPage } from '../shop-options/shop-options';



@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public recipeService: ServiceRecipe,
    private popOverCtrl: PopoverController, 
    private authService: ServiceAuth,
    private loadingCtrl: LoadingController,
    private alrtCtrl: AlertController) {
  }
  recipes: Recipe[];
  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipe();
    console.log(this.recipes);
  }

  onNewRecepie(){
    this.navCtrl.push(EditRecipePage , {mode:'New'});
  }
  onLoadRecipe(recipe: Recipe ,index: number){
   this.navCtrl.push(RecipePage,{recipe: recipe, index: index})
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
             this.recipeService.loadList(token)
             .subscribe(
               (list:Recipe[])=>{
                 loadi.dismiss();
                 if(list){
                   this.recipes = list;
                 }
                 else{
                   this.recipes = [];
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
               this.recipeService.storeList(token)
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
  private handleError(erorrmessage: string){
    this.alrtCtrl.create({
    title:'An error Occured',
    message:erorrmessage,
    buttons:['Ok']
  }).present();
}


}
