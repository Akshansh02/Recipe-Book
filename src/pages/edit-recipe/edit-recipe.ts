import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ServiceRecipe } from '../../services/serviceRecipe';
import { Recipe } from '../../models/recipe';



@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  recipe:Recipe;
  index:number;
  
  mode = 'New';
  selectOptions =['Easy', 'Medium','Hard']
  recipeForm:FormGroup;

  ngOnInit(): void {
  this.mode = this.navParams.get('mode');
  if(this.mode == 'Edit'){
   
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }
  this.initializeForm();
}

  constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public actionCntrl: ActionSheetController,
                private alertCntrl:AlertController,
                public toastCtrl:ToastController,
                public recipeService:ServiceRecipe) {
  }

  private initializeForm(){
    
    let title=null;
    let difficulty = 'Medium';
    let description = null;
    let ingredients = [];

    if(this.mode == 'Edit'){
      title = this.recipe.title;
      difficulty = this.recipe.difficulty;
      description = this.recipe.description;
      for(let ingredient of this.recipe.ingredients){
        ingredients.push(new FormControl(ingredient.name,Validators.required));
      }
    }

    this.recipeForm =new FormGroup({
     'title':new FormControl(title,Validators.required ),
     'description':new FormControl(description,Validators.required),
     'difficulty' : new FormControl(difficulty,Validators.required),
     'ingredients': new FormArray(ingredients)
    });
  }

  private createNewIngAlert(){
    return this.alertCntrl.create({
      title:'Add Ingredient',
      inputs:[{
        name:'name',
        placeholder:'Name'
      }],
      buttons:[{
        text:'cancel',
        role:'cancel'
      },
    {
      text:'Add',
      handler:data=>{
        if(data.name=='' || data.name==null ){
            const toast = this.toastCtrl.create({
              message:'Please Enter Text',
              duration:1000,
              position: 'bottom'
            });
            toast.present();
            return;
        }
        (<FormArray>this.recipeForm.get("ingredients")).push(new FormControl(data.name,Validators.required))
        const toast = this.toastCtrl.create({
          message:'Ingredient Added',
          duration:1000,
          position: 'bottom'
        });
        toast.present();
      }
    }]
    });
  }
  onSubmit(){
    const value = this.recipeForm.value;
    let ingredients= [];
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map(name => {
        return{name:name, amount:1};
      });
    }

    if(this.mode == 'Edit'){
      this.recipeService.updateRecipe(this.index,value.title, value.description, value.difficulty, ingredients);
    }
    else{this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);}
  
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }
  onManageIngredients(){
    const actionSheet = this.actionCntrl.create(
      {
        title :'What Do you want to Do?',
        buttons:[{
          text:'Add Ingredient',
          handler: ()=>{
            this.createNewIngAlert().present();
          }
        },
      {
        text:'Remove All Ingredient',
        role:'destructive',
        handler:()=>{
          const fArray : FormArray = <FormArray>this.recipeForm.get('ingredients');
          const len = fArray.length;
          if(len>0){
            for(let i = len; i>=0;i--){
              fArray.removeAt(i);
            }
            
            const toast = this.toastCtrl.create({
              message:'Items Deleted',
              duration:1000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      },
    {
      text:'Cancel',
      role:'cancel'
    }]
      }
    );
    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

}
