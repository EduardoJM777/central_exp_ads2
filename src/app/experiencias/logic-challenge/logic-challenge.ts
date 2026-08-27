import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  computed,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LOGIC_QUESTIONS } from './logic-challenge-questions';
import {
  LogicAnswerLog,
  LogicChallengeResult,
  LogicQuestion
} from './logic-challenge.model';
import { Router } from '@angular/router';

type Stage = 'intro' | 'playing' | 'feedback' | 'result';

@Component({
  selector: 'app-logic-challenge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logic-challenge.html',
  styleUrl: './logic-challenge.scss'
})
export class LogicChallengeComponent implements OnDestroy{
  private router = inject(Router);

  @Output() challengeCompleted = new EventEmitter<LogicChallengeResult>();

  @Output() exitRequested = new EventEmitter<void>();

  readonly questions: LogicQuestion[] = LOGIC_QUESTIONS;

  stage = signal<Stage>('intro');
  currentIndex = signal(0);
  selectedOption = signal<number | null>(null);
  timeRemaining = signal(0);
  score = signal(0);
  streak = signal(0);
  answerLog = signal<LogicAnswerLog[]>([]);
  lastWasCorrect = signal(false);
  lastPointsEarned = signal(0);
  lastResult = signal<LogicChallengeResult | null>(null);

  private timerHandle: ReturnType<typeof setInterval> | null = null;
  private questionStartedAt = 0;

  readonly currentQuestion = computed(() => this.questions[this.currentIndex()]);

  readonly progressPercent = computed(
    () => (this.currentIndex() / this.questions.length) * 100
  );

  readonly timeProgressPercent = computed(() => {
    const q = this.currentQuestion();
    if (!q) return 0;
    return Math.max(0, Math.round((this.timeRemaining() / q.timeLimitSeconds) * 100));
  });

  readonly isLastQuestion = computed(
    () => this.currentIndex() === this.questions.length - 1
  );

  start(): void {
    this.currentIndex.set(0);
    this.score.set(0);
    this.streak.set(0);
    this.answerLog.set([]);
    this.lastResult.set(null);
    this.startQuestion();
  }

  private startQuestion(): void {
    const q = this.currentQuestion();
    this.selectedOption.set(null);
    this.timeRemaining.set(q.timeLimitSeconds);
    this.questionStartedAt = Date.now();
    this.stage.set('playing');
    this.clearTimer();

    this.timerHandle = setInterval(() => {
      const next = this.timeRemaining() - 1;
      if (next <= 0) {
        this.timeRemaining.set(0);
        this.clearTimer();
        if (this.selectedOption() === null) {
          this.registerAnswer(-1);
        }
        return;
      }
      this.timeRemaining.set(next);
    }, 1000);
  }

  selectOption(index: number): void {
    if (this.stage() !== 'playing' || this.selectedOption() !== null) return;
    this.selectedOption.set(index);
    this.clearTimer();
    this.registerAnswer(index);
  }

  private registerAnswer(index: number): void {
    const q = this.currentQuestion();
    const timeSpent = Math.min(
      q.timeLimitSeconds,
      Math.max(0, Math.round((Date.now() - this.questionStartedAt) / 1000))
    );
    const correct = index === q.correctIndex;

    let points = 0;
    if (correct) {
      const remaining = Math.max(0, q.timeLimitSeconds - timeSpent);
      const speedBonus = Math.round((remaining / q.timeLimitSeconds) * 50);
      this.streak.update((s) => s + 1);
      const streakBonus = this.streak() > 1 ? 20 : 0;
      points = 100 + speedBonus + streakBonus;
    } else {
      this.streak.set(0);
    }

    this.score.update((s) => s + points);
    this.lastWasCorrect.set(correct);
    this.lastPointsEarned.set(points);
    this.answerLog.update((log) => [
      ...log,
      {
        questionId: q.id,
        type: q.type,
        correct,
        timeSpentSeconds: timeSpent,
        pointsEarned: points
      }
    ]);

    this.stage.set('feedback');
  }

  nextQuestion(): void {
    if (this.currentIndex() + 1 < this.questions.length) {
      this.currentIndex.update((i) => i + 1);
      this.startQuestion();
    } else {
      this.finish();
    }
  }

  private finish(): void {
    const log = this.answerLog();
    const totalQuestions = this.questions.length;
    const correctCount = log.filter((a) => a.correct).length;
    const accuracyPercent = Math.round((correctCount / totalQuestions) * 100);
    const averageTimeSeconds = Math.round(
      log.reduce((sum, a) => sum + a.timeSpentSeconds, 0) / totalQuestions
    );

    const result: LogicChallengeResult = {
      visitorAlias: null,
      totalScore: this.score(),
      correctCount,
      totalQuestions,
      accuracyPercent,
      averageTimeSeconds,
      rank: this.rankFor(accuracyPercent),
      answers: log
    };

    this.lastResult.set(result);
    this.stage.set('result');
    this.challengeCompleted.emit(result);
  }

  private rankFor(accuracyPercent: number): string {
    if (accuracyPercent >= 90) return 'Arquiteto(a) de Sistemas';
    if (accuracyPercent >= 70) return 'Desenvolvedor(a) Sênior';
    if (accuracyPercent >= 50) return 'Desenvolvedor(a) Pleno';
    if (accuracyPercent >= 30) return 'Desenvolvedor(a) Júnior';
    return 'Estagiário(a) Curioso(a)';
  }

  playAgain(): void {
    this.stage.set('intro');
  }

  exit(): void {
    this.clearTimer();
    this.exitRequested.emit();
    this.router.navigateByUrl('/');
  }

  private clearTimer(): void {
    if (this.timerHandle) {
      clearInterval(this.timerHandle); 
      this.timerHandle = null;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

}