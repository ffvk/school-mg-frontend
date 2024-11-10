import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  activeIndex: number = 1;

  ngOnInit() {}

  setActive(index: number): void {
    this.activeIndex = index;
  }

  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMenu(open: boolean) {
    this.isMenuOpen = open;
  }

  goto(evt: any, url: string) {
    evt.preventDefault();

    this.router.navigateByUrl(url);
    this.isMenuOpen = false;
  }
}
