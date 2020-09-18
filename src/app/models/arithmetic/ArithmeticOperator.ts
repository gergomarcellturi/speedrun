import {ArithmeticOperatorEnum} from './ArithmeticOperatorEnum';
import {ArithmeticLevels} from './ArithmeticLevels';
import {ArithmeticUtilities} from './ArithmeticUtilities';

export class ArithmeticOperator extends ArithmeticUtilities{
  private operator: string;

  constructor(operator: string) {
    super();
    this.operator = operator;
  }

  public get getOperator() { return this.operator; }

  public solve = (a: number, b: number): number => {
    if (typeof b !== 'number') {
      return a;
    }
    return this[`${ArithmeticOperatorEnum[`${this.operator}`]}`](a, b);
  }

  public getArithmeticLevel = () => {
    return ArithmeticLevels[`${this.operator}`];
  }

}
