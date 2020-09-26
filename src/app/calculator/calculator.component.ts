import {Component, ElementRef, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as math from 'mathjs';
import {CacheService} from "../services/cache.service";

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

  public menuState = 'out';
  public inputString = '';
  public resultString = '';

  constructor(
    private elementRef: ElementRef,
    private cacheService: CacheService,
  ) {  }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#112';
    this.cursorEffect();
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

  public toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  public input(char: string) {
    this.inputString += this.isOperator(char) && this.isOperator(this.inputString[this.inputString.length - 1]) ? '' : char;
  }

  public evaluateExpression() {
    this.resultString = `= ${math.parse(this.inputString).evaluate()}`;
    this.cacheService.addCalcHistory(math.parse(this.inputString));
  }

  public clearInput() {
    this.inputString = '';
  }

  private isOperator(char: string): boolean {
    return char === '/' || char === '*' || char === '+' || char === '-' || char === undefined;
  }
}
