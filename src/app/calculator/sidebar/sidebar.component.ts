import { Component, OnInit, ElementRef, HostListener, Renderer2 } from '@angular/core';
import * as math from 'mathjs';
import {CacheService} from '../../services/cache.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public calcHistory: {expression: string, value: number}[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cacheService: CacheService,
    ) { }

  ngOnInit(): void {
    this.cacheService.getCalcHistory.forEach(value => this.calcHistory = [
      ...this.calcHistory, {expression: value, value: math.parse(value).evaluate()}
      ]);
  }

  @HostListener('click', ['$event.target'])
  onClick(target){
    const  item = this.el.nativeElement.querySelector('li');

    alert(item);
  }
}
