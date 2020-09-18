import {ArithmeticOperatorEnum} from './ArithmeticOperatorEnum';
import {ArithmeticLevels} from './ArithmeticLevels';

export class ArithmeticOperator {
  private operator: string;

  constructor(operator: string) {
    this.operator = operator;
  }

  public get getOperator(): string { return this.operator; }

  public solve = (a: number, b: number): number => {
    console.log(this.operator);
    return this[`${ArithmeticOperatorEnum[`${this.operator}`]}`].bind(this, a, b);
  }

  public getArithmeticLevel = () => {
    return ArithmeticLevels[`${this.operator}`];
  }

}
