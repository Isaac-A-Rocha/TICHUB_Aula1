export class Money {
  private constructor(private readonly value: number) {}

  static create(value: number): Money {
    if (value < 0) throw new Error("Invalid price");
    return new Money(value);
  }

  get amount(): number {
    return this.value;
  }

  add(other: Money): Money {
    return new Money(this.value + other.value);
  }

  multiply(factor: number): Money {
    return new Money(this.value * factor);
  }
}