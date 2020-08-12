import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCart} from '../models/shoppingCart';
import {Subscription} from 'rxjs';
import {ShoppingCartService} from '../shopping-cart.service';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {Orders} from '../models/orders';
import {Router} from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit , OnDestroy{
  shipping:any = {};
  cart: ShoppingCart;
  cartsubscription: Subscription;
  userSubcsription: Subscription;
  userId: string;

  constructor(
    private router : Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService ,
    private orderService: OrderService)
  {}

  async ngOnInit() {
    this.cartsubscription =(await this.shoppingCartService.getCart()).subscribe(cart => this.cart= cart);
    this.userSubcsription= this.authService.user$.subscribe(user => this.userId= user.uid);
  }
  ngOnDestroy() {
    this.cartsubscription.unsubscribe();
    this.userSubcsription.unsubscribe();
  }

  async placeOrder() {
    let order = new Orders(this.userId , this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.shoppingCartService.clearCart();
    this.router.navigate(['/order-success', result.key]);

  }
}
