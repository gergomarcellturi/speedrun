import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public sidebarclick = new EventEmitter<{ expression: string, value: number }>();

  constructor() { }
}
