import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../category.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {ProductService} from '../../product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories;
  myPicturesRef;
  constructor(private db: AngularFireDatabase , private productService: ProductService , private router: Router) {
    this.myPicturesRef = this.db.list('/categories', ref => ref
      .orderByChild('name'));
    this.myPicturesRef
      .snapshotChanges().subscribe((res) => {
      this.categories = res.map(change => ({key: change.payload.key, ...change.payload.val()}));
    });

  }

  ngOnInit(): void {
  }

  save(product){
    this.productService.create(product.value);
    this.router.navigate(['/admin/products']);
  }
}
