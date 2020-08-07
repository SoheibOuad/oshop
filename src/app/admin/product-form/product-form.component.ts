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
  product:any = {};
  id;
  constructor(private db: AngularFireDatabase , private productService: ProductService , private router: Router,
    private route: ActivatedRoute ) {
    this.myPicturesRef = this.db.list('/categories', ref => ref
      .orderByChild('name'));
    this.myPicturesRef
      .snapshotChanges().subscribe((res) => {
      this.categories = res.map(change => ({key: change.payload.key, ...change.payload.val()}));
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(p =>
      {
        this.product=p;
      });
    }
  }

  ngOnInit(): void {

  }

  save(product){
    if (this.id) this.productService.update(this.id , product.value);
    else this.productService.create(product.value);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (confirm('Are you sure you want to delete this product ')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }else {
      return ;
    }
  }
}
