import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promotion[] {
  	return PROMOTIONS;
  }

  getPromotion(id: number): Promotion {
  	//filter the dishes array and extract only those items from the array for which the dish.id matches id that has been supplied as a parameter to the dish
  	return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Promotion {
  	return PROMOTIONS.filter((promo) => (promo.featured))[0];
  }

}
