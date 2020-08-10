import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../models/product';
import {Subscription} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {
  products: Product[]= [];
  filtredProducts: Product[] = [];
  myPicturesRef;
  categories;
  subscription: Subscription;
  category: string;
  constructor(
    route: ActivatedRoute,
    productService: ProductService , private db: AngularFireDatabase ) {
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

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}
