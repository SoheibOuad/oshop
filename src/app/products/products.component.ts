import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../models/product';
import {Subscription} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy{
  myPicturesRef;
  categories;
  category: string;
  products: Product[]= [];
  filtredProducts: Product[] = [];
  subscription: Subscription;
  cart;
  constructor(route: ActivatedRoute,
              productService: ProductService , private db: AngularFireDatabase , private cartService: ShoppingCartService) {


    this.myPicturesRef = this.db.list('/products', ref => ref
      .orderByChild('name'));
    this.subscription=this.myPicturesRef
      .snapshotChanges().subscribe((res) => {
          this.products = res.map(change => ({key: change.payload.key, ...change.payload.val()}));

        //Get procuts with filters
        route.queryParamMap.subscribe(params => {
          this.category=params.get('category');
          this.filtredProducts = (this.category) ?
            this.products.filter(p =>p.category === this.category) :
            this.products;
        });
      });
    // Get all the categoris.
    this.myPicturesRef = this.db.list('/categories', ref => ref
      .orderByChild('name'));
    this.myPicturesRef
      .snapshotChanges().subscribe((res) => {
      this.categories = res.map(change => ({key: change.payload.key, ...change.payload.val()}));
    });

  }

  async ngOnInit() {

    this.subscription=(await this.cartService.getCart()).subscribe(cart =>this.cart=cart);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
