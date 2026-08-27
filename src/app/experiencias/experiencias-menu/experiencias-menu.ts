import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { EXPERIENCE_MENU_ITEMS } from './experiencias-menu.data';
import { ExperienceMenuItem } from './experiencias-menu.model';

@Component({
  selector: 'app-experiencias-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './experiencias-menu.html',
  styleUrl: './experiencias-menu.scss'
})
export class ExperienciasMenuComponent {
  readonly items: ExperienceMenuItem[] = EXPERIENCE_MENU_ITEMS;
}