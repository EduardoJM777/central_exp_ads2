import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

type GameStage = 'intro' | 'playing' | 'door' | 'result';
type Result = 'won' | 'timeout';

@Component({
  selector: 'app-mini-game',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mini-game.html',
  styleUrl: './mini-game.scss'
})
export class MiniGameComponent implements OnDestroy {
  readonly rows = Array.from({ length: 7 }, (_, i) => i);
  readonly columns = Array.from({ length: 5 }, (_, i) => i);
  readonly bugs = new Set(['5-1', '4-3', '3-0', '2-2', '1-4']);
  readonly initialCoins = ['5-3', '4-0', '3-2', '2-4', '1-1'];
  readonly doorOptions = [
    { text: 'Testar, identificar o erro e corrigir', correct: true },
    { text: 'Ignorar o erro e continuar', correct: false },
    { text: 'Apagar todo o sistema', correct: false }
  ];

  stage: GameStage = 'intro';
  result: Result = 'won';
  player = { row: 6, column: 2 };
  coins = new Set<string>();
  score = 0;
  timeRemaining = 60;
  message = 'Leve o personagem até a porta de saída.';
  private timer: ReturnType<typeof setInterval> | null = null;

  start(): void {
    this.clearTimer();
    this.stage = 'playing';
    this.player = { row: 6, column: 2 };
    this.coins = new Set(this.initialCoins);
    this.score = 0;
    this.timeRemaining = 60;
    this.message = 'Colete boas decisões (+25) e desvie dos bugs.';
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) this.finish('timeout');
    }, 1000);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const moves: Record<string, [number, number]> = {
      ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1]
    };
    const move = moves[event.key];
    if (move && this.stage === 'playing') {
      event.preventDefault();
      this.move(move[0], move[1]);
    }
  }

  move(rowDelta: number, columnDelta: number): void {
    if (this.stage !== 'playing') return;
    const row = this.player.row + rowDelta;
    const column = this.player.column + columnDelta;
    if (row < 0 || row > 6 || column < 0 || column > 4) return;
    const cell = `${row}-${column}`;
    if (this.bugs.has(cell)) {
      this.score = Math.max(0, this.score - 10);
      this.message = 'Bug encontrado: procure outro caminho. -10 pontos.';
      return;
    }
    this.player = { row, column };
    if (this.coins.delete(cell)) {
      this.score += 25;
      this.message = 'Boa decisão coletada! +25 pontos.';
    }
    if (row === 0 && column === 2) {
      this.stage = 'door';
      this.message = 'Resolva o desafio para abrir a porta.';
    }
  }

  answerDoor(correct: boolean): void {
    if (correct) {
      this.score += 100 + Math.round(this.timeRemaining * 0.5);
      this.finish('won');
    } else {
      this.score = Math.max(0, this.score - 10);
      this.message = 'Essa decisão não resolveu o bug. Tente novamente.';
    }
  }

  cellClass(row: number, column: number): Record<string, boolean> {
    const cell = `${row}-${column}`;
    return {
      'mg-cell--player': this.player.row === row && this.player.column === column,
      'mg-cell--bug': this.bugs.has(cell),
      'mg-cell--coin': this.coins.has(cell),
      'mg-cell--door': row === 0 && column === 2
    };
  }

  private finish(result: Result): void {
    this.result = result;
    this.stage = 'result';
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  ngOnDestroy(): void { this.clearTimer(); }
}
