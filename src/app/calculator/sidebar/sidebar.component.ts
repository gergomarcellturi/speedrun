import { Component, OnInit, ElementRef, HostListener, Renderer2 } from '@angular/core';
import * as math from 'mathjs';
import {CacheService} from '../../services/cache.service';
import {EventService} from '../../services/event.service';

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
    private eventService: EventService,
    ) { }

  ngOnInit(): void {
    this.cacheService.getCalcHistory.forEach(value => this.calcHistory = [
      ...this.calcHistory, {expression: value, value: math.parse(value).evaluate()}
      ]);
  }

  public clickEventHandler(history: {expression: string, value: number}) {
    this.eventService.sidebarclick.emit(history);
  }
}
