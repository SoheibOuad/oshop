import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {ShoppingCart} from '../models/shoppingCart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product;
  @Input('shoppingCart') shoppingCart: ShoppingCart;


  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  deleteToCart(){
    this.cartService.deleteToCart(this.product);
  }

}
