import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
  	return DISHES;
  }

  getDish(id: number): Dish {
  	//filter the dishes array and extract only those items from the array for which the dish.id matches id that has been supplied as a parameter to the dish
  	return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish(): Dish {
  	return DISHES.filter((dish) => (dish.featured))[0];
  }


}
