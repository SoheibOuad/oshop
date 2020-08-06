import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products;
  myPicturesRef;
  constructor(private db: AngularFireDatabase) {
    this.myPicturesRef = this.db.list('/products', ref => ref
      .orderByChild('name'));
    this.myPicturesRef
      .snapshotChanges().subscribe((res) => {
      this.products = res.map(change => ({key: change.payload.key, ...change.payload.val()}));
    });
  }

  ngOnInit(): void {
  }

}
