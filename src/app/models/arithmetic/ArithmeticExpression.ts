import {ArithmeticOperator} from './ArithmeticOperator';
import {isNumeric} from 'rxjs/internal-compatibility';

export class ArithmeticExpression {
  private value: number | ArithmeticOperator;
  private right: ArithmeticExpression;
  private left: ArithmeticExpression;

  public constructor() {}

  public evaluate = (): number => {
    if (typeof this.value === 'number') {
      return this.value;
    }
    return this.evaluateRec(this);
  }

  private evaluateRec = (node: ArithmeticExpression): number => {
    if (!node || !node.value) {
      return;
    }
    if ( typeof node.value === 'number') {
      return node.value;
    }
    return node.value.solve(this.evaluateRec(node.left), this.evaluateRec(node.right));
  }

  public expressionOf = (expression: string): ArithmeticExpression => {
    for (const dataTag of expression.split(' ')) {
      if (isNumeric(dataTag)) {
        this.addValue(+dataTag);
      } else {
        this.addOperator(new ArithmeticOperator(dataTag));
      }
    }
    return this;
  }

  public addValue = (value: number): void => {
    !this.value ? this.value = value : this.getPath().addValue(value);
  }

  public addOperator = (operator: ArithmeticOperator): void => {
    if (typeof this.value === 'number') {
      this.addValue(this.value);
      this.value = operator;
    } else if (operator.getArithmeticLevel() > this.value.getArithmeticLevel()) {
      this.addOperator(this.value);
      this.value = operator;
    } else {
      this.getPath().addOperator(operator);
    }
  }

  private getPath = (): ArithmeticExpression => {

    if (!this.left) {
      this.left = new ArithmeticExpression();
      return this.left;
    }

    if (!this.right) {
      this.right = new ArithmeticExpression();
      return this.right;
    }

    if (!(typeof this.left.value === 'number') && !(typeof this.right.value === 'number')) {
      return this.left;
    } else if (!(typeof this.right.value === 'number')) {
      return this.left;
    } else {
      return this.right;
    }
  }

  public preorder = (node: ArithmeticExpression): void => {
    if (!node) {
      return;
    }
    if (typeof node.value === 'number') {
      console.log(node.value);
    } else {
      console.log(node.value.getOperator);
    }
    this.preorder(node.left);
    this.preorder(node.right);
  }

  public inorder = (node: ArithmeticExpression): void => {
    if (!node) {
      return;
    }
    this.inorder(node.left);
    if (typeof node.value === 'number') {
      console.log(node.value);
    } else {
      console.log(node.value.getOperator);
    }
    this.inorder(node.right);
  }

}
