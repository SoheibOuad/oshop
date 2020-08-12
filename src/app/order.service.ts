import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  storeOrder(order){
    return this.db.list('/orders').push(order);
  }

  getOrders(){
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string){
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));
  }

  get(orderId){
    return this.db.object('/orders/' + orderId).valueChanges();
  }

}
