import type { Category } from "./Category.js";
import { Money } from "../value-objects/Money.js";

export class Product {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: Money,
    public readonly category: Category
  ) {}
}