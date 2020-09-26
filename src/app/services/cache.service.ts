import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as math from 'mathjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private calcHistorySubject: BehaviorSubject<math.MathNode[]>;
  private calcHistory: Observable<math.MathNode[]>;

  constructor() {
    this.calcHistorySubject = new BehaviorSubject<math.MathNode[]>(JSON.parse(localStorage.getItem('calcHistory')));
    this.calcHistory = this.calcHistorySubject.asObservable();
  }

  public get getCalcHistory(): math.MathNode[] {
    return this.calcHistorySubject.value;
  }

  public addCalcHistory(calcHistory: math.MathNode): void {
    const calcHistoryArray = [ ...this.getCalcHistory, calcHistory];
    localStorage.setItem('calcHistory', JSON.stringify(calcHistoryArray));
    this.calcHistorySubject.next(JSON.parse(localStorage.getItem('calcHistory')));
  }

  public clearCalcHistory(): void {
    localStorage.clear();
    this.calcHistorySubject.next(null);
  }

}
