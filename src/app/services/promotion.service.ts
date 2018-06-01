import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
  	return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS), 2000);
     });
  }

  getPromotion(id: number): Promise<Promotion> {
  	//filter the dishes array and extract only those items from the array for which the dish.id matches id that has been supplied as a parameter to the dish
  	return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
  	return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.featured))[0]), 2000);
    });
  }

}
