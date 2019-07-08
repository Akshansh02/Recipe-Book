import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import firebase from "firebase";
import { ServiceAuth } from "./auth";


@Injectable()
export class ServiceRecipe{

    constructor(private http: HttpClient ,private authServie: ServiceAuth){}
    private recipes : Recipe[] = [];

    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]){
        this.recipes.push(new Recipe(title,description,difficulty,ingredients));
        console.log(this.recipes);
    }
    getRecipe(){
        return this.recipes.slice();
    }

    updateRecipe(index: number,title: string, description: string, difficulty: string, ingredients: Ingredient[]){
        this.recipes[index] = new Recipe(title,description,difficulty,ingredients);
    }

    removeRecipe(index: number){
        this.recipes.splice(index, 1);
    }
    storeList(token:string){
        const userId = this.authServie.getActiveUser().uid;
        return this.http.put('https://recipe-book-5087e.firebaseio.com/' + userId + '/recipes.json?auth='+ token,this.recipes); 
    }
    loadList(token: string){
        const userId = this.authServie.getActiveUser().uid;
        return this.http.get('https://recipe-book-5087e.firebaseio.com/' + userId + '/recipes.json?auth='+ token)
        .do((recipes:Recipe[])=>{
            if(recipes){
                for(let item of recipes){
                    if(!item.hasOwnProperty('ingrefients')){
                        item.ingredients = [];
                    }
                }

                this.recipes = recipes;
            }
            else{
                this.recipes=[];
            }
        }); 
    }
}