import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  get(productId){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId,product){
    return this.db.object('/products/' + productId).update(product);
  }
}

