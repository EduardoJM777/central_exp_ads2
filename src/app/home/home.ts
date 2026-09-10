import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { EXPERIENCE_MENU_ITEMS } from '../experiencias/experiencias-menu/experiencias-menu.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  readonly experienceCount = EXPERIENCE_MENU_ITEMS.filter(item => item.status === 'ready').length;
}
