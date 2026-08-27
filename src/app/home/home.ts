import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  // TODO: substituir por dados reais vindos de um serviço de ranking (seção 17 do documento)
  readonly challengesCompletedToday = 0;
  readonly topRanking: { alias: string; score: number }[] = [];
}