import type { Category } from "./Category.js";
import { Money } from "../value-objects/Money.js";

export interface ProductDTO {
  id: number;
  name: string;
  price: Money;
  category: Category;
}

export class Product implements ProductDTO {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: Money,
    public readonly category: Category
  ) {}
}