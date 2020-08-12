import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {Orders} from '../models/orders';
import {of, Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {AppUser} from '../models/app-user';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit , OnDestroy {
  orders: Orders[]= [];
  subscription: Subscription;
  constructor(private auth: AuthService , private orderService: OrderService) {

    auth.user$.subscribe((user) => {
      this.subscription=this.orderService.getOrdersByUser(user.uid)
        .snapshotChanges().subscribe((res:any) => {
          this.orders = res.map(change => ({key: change.payload.key, ...change.payload.val()}));
        });
    })

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
