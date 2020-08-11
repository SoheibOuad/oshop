import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {Product} from './models/product';
import {map, take} from 'rxjs/operators';
import {ShoppingCart} from './models/shoppingCart';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {

  }

  create(){
    return this.db.list('shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrcreateCartId();

    return this.db.object('/shopping-cart/' + cartId).valueChanges()
      .pipe((map((x:any) => new ShoppingCart(x.items))));

  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }
  private async getOrcreateCartId(){
    let cartId=localStorage.getItem('cartId');

    if (!cartId){
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
      // Add product to cart
    return cartId;
  }
  async addToCart(product: Product){
    let cartId = await this.getOrcreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item : any) => {
      if (item.payload.exists())   item$.update({ quantity: item.payload.exportVal().quantity + 1 });
      else item$.set({title: product.title ,imageUrl: product.imageUrl , price: product.price , quantity: 1 });
    });
  }

  async deleteToCart(product: Product){
    let cartId = await this.getOrcreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item : any) => {
      if (item.payload.exportVal().quantity === 1) item$.remove();
      else item$.update({ quantity: item.payload.exportVal().quantity - 1 });
    });
  }

  async clearCart(){
    let cartId = await this.getOrcreateCartId();
    this.db.object('/shopping-cart/' + cartId + '/items/').remove();
  }

}
