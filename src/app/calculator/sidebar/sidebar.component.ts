import {Component, OnInit, ElementRef, Renderer2, Input} from '@angular/core';
import {CacheService} from '../../services/cache.service';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input()
  public calcHistory: {expression: string, value: number}[];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cacheService: CacheService,
    private eventService: EventService,
    ) { }

  ngOnInit(): void {
  }

  public clickEventHandler(history: {expression: string, value: number}) {
    this.eventService.sidebarclick.emit(history);
  }
}
