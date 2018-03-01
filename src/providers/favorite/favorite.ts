import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider} from '../dish/dish';
import 'rxjs/add/operator/map';
/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>; // need server surport with authentication later
  
  constructor(public http: Http,
    private dishservice: DishProvider) {
    //console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean { //add id
    if(!this.isFavorite(id))
      this.favorites.push(id);
    return true;
  }

  isFavorite(id: number): boolean { //check id
    return this.favorites.some(el => el === id); // array method some, check if a dish in array or not, return boolean
  }

  getFavorites(): Observable<Dish[]>{ // return dish
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el===dish.id)))
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id); // id already in the list?
    if(index >= 0){
      this.favorites.splice(index, 1);
      return this.getFavorites();
    } else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existing favorite' + id);
    }
  }

}
