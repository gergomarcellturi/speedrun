import {Component, ElementRef, OnInit} from '@angular/core';
import {ArithmeticExpression} from '../models/arithmetic/ArithmeticExpression';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class CalculatorComponent implements OnInit {

  menuState = 'out';

  constructor(private elementRef: ElementRef) {  }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#112';
    this.cursorEffect();

    const test = new ArithmeticExpression().expressionOf('2 * 4 + 15 / 3 - 6');
    // test.inorder(test);
    console.log(test.evaluate());
  }

  private cursorEffect() {
    const border = this.elementRef.nativeElement.ownerDocument.querySelector('.highlight');
    this.elementRef.nativeElement.ownerDocument.querySelector('.calculator-container')
      .addEventListener('mousemove', (ev: any) => {
      const x = ev.pageX;
      const y = ev.pageY;
      const bounding = border.getBoundingClientRect();

      border.style.webkitMaskPosition = `${x - bounding.x - 160}px ${y - bounding.y - 160}px`;
    });
  }


  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
