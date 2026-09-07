import { Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PASSWORD_CRITERIA, evaluatePassword } from './password-tester.logic';
import { PasswordCriterion, PasswordTesterResult } from './password-tester.model';

type Stage = 'intro' | 'testing' | 'result';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-password-tester',
  styleUrl: './password-tester.scss',
  templateUrl: './password-tester.html',
})
export class PasswordTester {
  private router = inject(Router);

  @Output() challengeCompleted = new EventEmitter<PasswordTesterResult>();
  @Output() exitRequested = new EventEmitter<void>();

  readonly criteria: PasswordCriterion[] = PASSWORD_CRITERIA;

  stage = signal<Stage>('intro');
  password = signal('');
  showPassword = signal(false);
  bestScore = signal(0);
  bestLevelLabel = signal('Muito fraca');
  attemptsTried = signal(0);

  private startedAt = 0;
  private lastNonEmptyLength = 0;

  readonly evaluation = computed(() => evaluatePassword(this.password()));

  start(): void {
    this.password.set('');
    this.showPassword.set(false);
    this.bestScore.set(0);
    this.bestLevelLabel.set('Muito fraca');
    this.attemptsTried.set(0);
    this.lastNonEmptyLength = 0;
    this.startedAt = Date.now();
    this.stage.set('testing');
  }

  onPasswordInput(value: string): void {
    this.password.set(value);

    if (value.length === 0 && this.lastNonEmptyLength > 0){
      this.attemptsTried.update((n) => n + 1);
    }
    this.lastNonEmptyLength = value.length;

    const current = this.evaluation();
    if (current.score > this.bestScore()) {
      this.bestScore.set(current.score);
      this.bestLevelLabel.set(current.level.label);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  isCriterionMet(id: string): boolean {
    return this.evaluation().passedCriteriaIds.includes(id);
  }

  finish(): void {
    if (this.password().length > 0) {
      this.attemptsTried.update((n) => n + 1);
    }
    const timeSpentSeconds = Math.max(0, Math.round((Date.now() - this.startedAt) / 1000));

    const result: PasswordTesterResult = {
      visitorAlias: null,
      bestScore: this.bestScore(),
      bestLevelLabel: this.bestLevelLabel(),
      attemptsTried: this.attemptsTried(),
      timeSpentSeconds
    };

    this.stage.set('result');
    this.challengeCompleted.emit(result);
  }

  playAgain(): void {
    this.stage.set('intro');
  }

  exit(): void {
    this.exitRequested.emit();
    this.router.navigateByUrl('/experiencias');
  }

}
