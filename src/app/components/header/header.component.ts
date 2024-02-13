import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [ButtonComponent, CommonModule]
})
export class HeaderComponent implements OnInit {
  title = 'Tasks Tracker - Angular 17';
  showAddTask: boolean = false;
  subscription!: Subscription;

  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService.onToggle().subscribe(value => {
      console.log('value', value)
      this.showAddTask = value
    })
  }

  ngOnInit(): void { }

  toggleAddTask() {
    console.log('add togglle')
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string): boolean {
    console.log('route', route)
    return this.router.url === route;
  }

}
