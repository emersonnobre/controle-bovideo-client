import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  cow_icon: HTMLElement

  constructor() { }

  ngOnInit(): void {
    this.cow_icon = document.getElementById('cow-icon')
  }
  
  changeCowIconColor(color: string): void {
    if (color === 'white') return this.cow_icon.setAttribute('src', '/assets/icon/cow.png')
    this.cow_icon.setAttribute('src', '/assets/icon/cow-green.png')
  }

}
