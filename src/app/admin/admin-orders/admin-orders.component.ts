import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../order.service';
import {Orders} from '../../models/orders';
import {Subscription} from 'rxjs';
import {UserService} from '../../user.service';
import {AppUser} from '../../models/app-user';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit , OnDestroy{

  orders: Orders[]= [];
  subscription: Subscription;
  constructor(private orderService: OrderService , private userService: UserService) {
    this.subscription=this.orderService.getOrders()
      .snapshotChanges().subscribe((res:any) => {
        this.orders = res.map(change => ({key: change.payload.key, ...change.payload.val()}));
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
