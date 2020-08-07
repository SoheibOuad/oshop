import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: { title: string }[];
  filtredProducts: any[];
  myPicturesRef;
  subscription: Subscription;
  constructor(private db: AngularFireDatabase) {
    this.myPicturesRef = this.db.list('/products', ref => ref
      .orderByChild('name'));
    this.subscription=this.myPicturesRef
      .snapshotChanges().subscribe((res) => {
      this.filtredProducts=this.products = res.map(change => ({key: change.payload.key, ...change.payload.val()}));
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  filter(query: string){
    this.filtredProducts= (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

}
