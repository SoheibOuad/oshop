import {ShoppingCart} from './shoppingCart';

export class Orders {
  datePlaced: number;
  public items: any[];
  key: string;
  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced= new Date().getTime();
    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.price
      }
    })
  }
}