import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  computed,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DB_QUESTIONS, DB_TABLES } from './db-challenge.data';
import { DbAnswerLog, DbChallengeResult, DbQuestion, DbTable } from './db-challenge.model';

type Stage = 'intro' | 'playing' | 'feedback' | 'result';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-db-challenge',
  styleUrl: './db-challenge.scss',
  templateUrl: './db-challenge.html',
})
export class DbChallenge implements OnDestroy{

  @Output() challengeCompleted = new EventEmitter<DbChallengeResult>();
  @Output() exitRequested = new EventEmitter<void>();

  readonly tables: DbTable[] = DB_TABLES;
  readonly questions: DbQuestion[] = DB_QUESTIONS;

  stage = signal<Stage>('intro');
  currentIndex = signal(0);
  selectedOption = signal<number | null>(null);
  timeRemaining = signal(0);
  score = signal(0);
  streak = signal(0);
  answerLog = signal<DbAnswerLog[]>([]);
  lastWasCorrect = signal(false);
  lastPointsEarned = signal(0);
  lastResult = signal<DbChallengeResult | null>(null);

  private timerHandle: ReturnType<typeof setInterval> | null = null;
  private questionStartedAt = 0;

  readonly currentQuestion = computed(() => this.questions[this.currentIndex()]);

  readonly progressPercent = computed(
    () => (this.currentIndex() / this.questions.length) * 100
  );

  readonly timeProgressPercent = computed (() => {
    const q = this.currentQuestion();
    if (!q) return 0;
    return Math.max(0, Math.round((this.timeRemaining() / q.timeLimitSeconds) * 100));
  });

  readonly isLastQuestion = computed(
    () => this.currentIndex() === this.questions.length -1
  );

  start(): void {
    this.currentIndex.set(0);
    this.score.set(0);
    this.streak.set(0);
    this.answerLog.set([]);
    this.lastResult.set(null);
    this.startQuestion();
  }











  

}
