import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private calcHistorySubject: BehaviorSubject<string[]>;
  private calcHistory: Observable<string[]>;

  constructor() {
    this.calcHistorySubject = new BehaviorSubject<string[]>(JSON.parse(localStorage.getItem('calcHistory')) || []);
    this.calcHistory = this.calcHistorySubject.asObservable();
  }

  public get getCalcHistory(): string[] {
    return this.calcHistorySubject.value;
  }

  public addCalcHistory(calcHistory: string): void {
    const calcHistoryArray = [ ...this.getCalcHistory, calcHistory];
    localStorage.setItem('calcHistory', JSON.stringify(calcHistoryArray));
    this.calcHistorySubject.next(JSON.parse(localStorage.getItem('calcHistory')));
  }

  public clearCalcHistory(): void {
    localStorage.clear();
    this.calcHistorySubject.next(null);
  }

}
