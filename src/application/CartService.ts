import { Cart } from "../domain/entities/Cart.js";
import { Product } from "../domain/entities/Product.js";

export class CartService {
  static addProduct(cart: Cart, product: Product, quantity: number): Cart {
    return cart.addItem(product, quantity);
  }

  static checkout(cart: Cart): number {
    return cart.getFinalPrice().amount;
  }
}