import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../category.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {ProductService} from '../../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories;
  myPicturesRef;
  product={};
  constructor(private db: AngularFireDatabase , private productService: ProductService , private router: Router,
    private route: ActivatedRoute ) {
    this.myPicturesRef = this.db.list('/categories', ref => ref
      .orderByChild('name'));
    this.myPicturesRef
      .snapshotChanges().subscribe((res) => {
      this.categories = res.map(change => ({key: change.payload.key, ...change.payload.val()}));
    });

    let id = this.route.snapshot.paramMap.get('id');
    if(id) this.productService.get(id).subscribe(p =>
      {
        this.product=p;
      });


  }

  ngOnInit(): void {
  }

  save(product){
    this.productService.create(product.value);
    this.router.navigate(['/admin/products']);
  }
}
