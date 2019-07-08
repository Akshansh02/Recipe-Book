import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { ServiceAuth } from "./auth";
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http'; 

@Injectable()
export class ServiceShoppingList{

    private ingredients:Ingredient[] = [];

    constructor(private http:HttpClient,private authService: ServiceAuth){}

    addItem(name:string,amount:number){
        this.ingredients.push(new Ingredient(name,amount));
        console.log("added");
        console.log(this.ingredients);
    }
    addItems(items:Ingredient[]){
         this.ingredients.push(...items);
    }

    getItems(){
        return this.ingredients.slice();
    }

    removeItem(index:number){
        this.ingredients.splice(index,1);
    }

    storeList(token:string){
        const userId =this.authService.getActiveUser().uid;
        return  this.http
        .put('https://recipe-book-5087e.firebaseio.com/' + userId + '/shopping-list.json?auth='+ token,this.ingredients);   
    }

    loadList(token:string){
        const userId =this.authService.getActiveUser().uid;
        return  this.http
        .get('https://recipe-book-5087e.firebaseio.com/' + userId + '/shopping-list.json?auth='+ token)
        .do((ingredients: Ingredient[])=>{
            if(ingredients){
                this.ingredients = ingredients;
            }
            else{
                this.ingredients = [];
            }
            
        }); 
    }
}