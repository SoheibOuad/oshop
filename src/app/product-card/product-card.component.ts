import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Product} from '../models/product';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../product.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {ShoppingCartService} from '../shopping-cart.service';
import {ShoppingCart} from '../models/shoppingCart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('shoppingCart') shoppingCart: ShoppingCart;
  @Input('product') product;
  @Input('showAction') showAction;
  clicked : boolean = false;

  constructor( route: ActivatedRoute,
               productService: ProductService , private db: AngularFireDatabase , private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

}
