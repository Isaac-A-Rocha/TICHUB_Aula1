import { Product } from "./Product.js";
import { Money } from "../value-objects/Money.js";

export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  private readonly items: Map<number, CartItem>;

  constructor(items?: Map<number, CartItem>) {
    this.items = items ? new Map(items) : new Map();
  }

  addItem(product: Product, quantity: number): Cart {
    if (quantity <= 0) throw new Error("Invalid quantity");

    const newItems = new Map(this.items);
    const existing = newItems.get(product.id);

    if (existing) {
      newItems.set(product.id, {
        product,
        quantity: existing.quantity + quantity,
      });
    } else {
      newItems.set(product.id, { product, quantity });
    }

    return new Cart(newItems);
  }

  removeItem(productId: number, quantity: number = 1): Cart {
    const newItems = new Map(this.items);
    const existing = newItems.get(productId);

    if (existing) {
      if (existing.quantity > quantity) {
        newItems.set(productId, {
          product: existing.product,
          quantity: existing.quantity - quantity,
        });
      } else {
        newItems.delete(productId);
      }
    }

    return new Cart(newItems);
  }

  removeAll(productId: number): Cart {
    const newItems = new Map(this.items);
    newItems.delete(productId);
    return new Cart(newItems);
  }

  getTotalItems(): number {
    return Array.from(this.items.values())
      .reduce((acc, item) => acc + item.quantity, 0);
  }

  getFinalPrice(): Money {
    return Array.from(this.items.values())
      .reduce(
        (acc, item) =>
          acc.add(item.product.price.multiply(item.quantity)),
        Money.create(0)
      );
  }

  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }
}