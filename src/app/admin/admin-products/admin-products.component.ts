import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Subscription} from 'rxjs';
import {DataTableResource} from 'angular5-data-table';
import {Product} from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filtredProducts: any[];
  myPicturesRef;
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items:  Product[]=[];
  itemCount: number;
  constructor(private db: AngularFireDatabase) {
    this.myPicturesRef = this.db.list('/products', ref => ref
      .orderByChild('name'));
    this.subscription=this.myPicturesRef
      .snapshotChanges().subscribe((res) => {
      this.filtredProducts=this.products = res.map(change => ({key: change.payload.key, ...change.payload.val()}));
      this.initialTable(this.products);
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

    this.initialTable(this.filtredProducts);
  }

  private initialTable(products : Product[]){
    this.tableResource= new DataTableResource<Product>(products);
    this.tableResource.query({offset : 0 , limit: 10})
      .then(items => this.items= items);
    this.tableResource.count()
      .then(count => this.itemCount=count);
  }

  reloadItems(params){
    if (!this.tableResource) return;
    this.tableResource.query(params)
      .then(items => this.items= items);
  }

}
