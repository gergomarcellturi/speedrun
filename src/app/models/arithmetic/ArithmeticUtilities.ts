export class ArithmeticUtilities {
  public add = (a: number, b: number): number => {
    return a + b;
  }

  public subtract = (a: number, b: number): number => {
    return a - b;
  }

  public multiply = (a: number, b: number): number => {
    return a * b;
  }

  public divide = (a: number, b: number): number => {
    return a / b;
  }

  public exponentiation = (a: number, b: number): number => {
    return b === 1 ? a : a * this.exponentiation(a, b--);
  }

  public factoral = (a: number): number => {
    return a === 1 ? a : a * this.factoral(a--);
  }
}
