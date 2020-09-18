import { Component, OnInit } from '@angular/core';
import {ArithmeticExpression} from '../models/arithmetic/ArithmeticExpression';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const test = new ArithmeticExpression().expressionOf('2 * 4 + 15 / 3 - 6');
    // test.inorder(test);
    console.log(test.evaluate());
  }

}
