import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logincard',
  templateUrl: './logincard.page.html',
  styleUrls: ['./logincard.page.scss'],
})
export class LogincardPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
