import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ServiceShoppingList } from '../../services/serviceShoppingList';
import { ServiceRecipe } from '../../services/serviceRecipe';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;
  ngOnInit(): void {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public serviceShopping: ServiceShoppingList, 
    public serviceRecipe:ServiceRecipe 
   ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }
  onEditRecipe(){
    this.navCtrl.push(EditRecipePage,{mode:'Edit',recipe:this.recipe ,index: this.index});
  }
  deleteRecipe(){
    this.serviceRecipe.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
  onAddIngredient(){
    this.serviceShopping.addItems(this.recipe.ingredients);
  }



}
