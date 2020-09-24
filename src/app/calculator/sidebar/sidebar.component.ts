import { Component, OnInit, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event.target'])
  onClick(target){
    const  item = this.el.nativeElement.querySelector('li');

    alert(item);
  }
}
