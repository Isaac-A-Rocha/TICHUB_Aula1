import { Cart } from "./domain/entities/Cart.js";
import { Product } from "./domain/entities/Product.js";
import { Money } from "./domain/value-objects/Money.js";

const category = { id: 1, name: "Construção" };

const product1 = new Product(1, "Cimento", Money.create(50), category);
const product2 = new Product(2, "Tijolo", Money.create(2), category);

let cart = new Cart();

cart = cart.addItem(product1, 2);
cart = cart.addItem(product2, 10);
cart = cart.addItem(product1, 1);

console.log("Itens:", cart.getTotalItems());
console.log("Total:", cart.getFinalPrice().amount);