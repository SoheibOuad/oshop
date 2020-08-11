import {ShoppingCartItem} from './shopping-cart-item';
import {Product} from './product';

export class ShoppingCart {
  private totalQuantity;
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap){
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({...item, key: productId}));
    }
  }


  get TotalItemCount(){
    this.totalQuantity=0;
    for (let productId in this.itemsMap){
      this.totalQuantity += this.itemsMap[productId].quantity;
    }
    return this.totalQuantity;
  }

  get TotalPrice(){
    let sum = 0;
    for (let productId in this.items)
       sum += this.items[productId].totalPrice;
    return sum;
  }

  getQuantity(product: Product){
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

}
