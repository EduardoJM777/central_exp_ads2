import { CommonModule } from '@angular/common';

import {
  Component,
  OnDestroy,
  computed,
  inject,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import {
  MYSTERY_QUESTIONS,
  MysteryQuestion
} from './questoes';


type Stage =
  | 'intro'
  | 'playing'
  | 'feedback'
  | 'result';


@Component({
  selector: 'app-codigo-misterioso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './codigo-misterioso.html',
  styleUrl: './codigo-misterioso.scss'
})

export class MysteryCodeComponent implements OnDestroy {

  private router = inject(Router);

  readonly questions: MysteryQuestion[] =
    MYSTERY_QUESTIONS;


  stage = signal<Stage>('intro');

  currentIndex = signal(0);

  selectedOption =
    signal<number | null>(null);

  timeRemaining = signal(0);

  score = signal(0);

  streak = signal(0);

  correctAnswers = signal(0);

  lastWasCorrect = signal(false);

  lastPointsEarned = signal(0);


  private timerHandle:
    ReturnType<typeof setInterval> | null = null;

  private questionStartedAt = 0;


  readonly currentQuestion = computed(
    () => this.questions[this.currentIndex()]
  );


  readonly progressPercent = computed(
    () =>
      ((this.currentIndex() + 1)
        / this.questions.length) * 100
  );


  readonly isLastQuestion = computed(
    () =>
      this.currentIndex()
      === this.questions.length - 1
  );


  readonly accuracy = computed(() => {

    return Math.round(
      (this.correctAnswers()
        / this.questions.length) * 100
    );

  });


  readonly timeProgressPercent =
    computed(() => {

      const question =
        this.currentQuestion();

      if (!question) {
        return 0;
      }

      return Math.max(
        0,
        (
          this.timeRemaining()
          / question.timeLimitSeconds
        ) * 100
      );

    });


  start(): void {

    this.currentIndex.set(0);

    this.score.set(0);

    this.streak.set(0);

    this.correctAnswers.set(0);

    this.startQuestion();

  }


  private startQuestion(): void {

    const question =
      this.currentQuestion();

    this.selectedOption.set(null);

    this.timeRemaining.set(
      question.timeLimitSeconds
    );

    this.questionStartedAt =
      Date.now();

    this.stage.set('playing');

    this.clearTimer();


    this.timerHandle =
      setInterval(() => {

        const next =
          this.timeRemaining() - 1;


        if (next <= 0) {

          this.timeRemaining.set(0);

          this.clearTimer();

          this.registerAnswer(-1);

          return;

        }


        this.timeRemaining.set(next);

      }, 1000);

  }


  selectOption(index: number): void {

    if (
      this.stage() !== 'playing'
      ||
      this.selectedOption() !== null
    ) {
      return;
    }


    this.selectedOption.set(index);

    this.clearTimer();

    this.registerAnswer(index);

  }


  private registerAnswer(
    index: number
  ): void {

    const question =
      this.currentQuestion();


    const correct =
      index === question.correctIndex;


    const timeSpent = Math.min(

      question.timeLimitSeconds,

      Math.max(
        0,

        Math.round(
          (
            Date.now()
            - this.questionStartedAt
          ) / 1000
        )

      )

    );


    let points = 0;


    if (correct) {

      this.correctAnswers.update(
        value => value + 1
      );


      this.streak.update(
        value => value + 1
      );


      const remaining =
        Math.max(
          0,
          question.timeLimitSeconds
          - timeSpent
        );


      const speedBonus =
        Math.round(
          (
            remaining
            / question.timeLimitSeconds
          ) * 50
        );


      const streakBonus =
        this.streak() >= 2
          ? 20
          : 0;


      points =
        100
        + speedBonus
        + streakBonus;


      this.score.update(
        value => value + points
      );

    }

    else {

      this.streak.set(0);

    }


    this.lastWasCorrect.set(correct);

    this.lastPointsEarned.set(points);

    this.stage.set('feedback');

  }


  nextQuestion(): void {

    if (this.isLastQuestion()) {

      this.stage.set('result');

      return;

    }


    this.currentIndex.update(
      value => value + 1
    );


    this.startQuestion();

  }


  playAgain(): void {

    this.stage.set('intro');

  }


  exit(): void {

    this.clearTimer();

    this.router.navigateByUrl(
      '/experiencias'
    );

  }


  resultTitle(): string {

    const result =
      this.accuracy();


    if (result === 100) {
      return 'Mestre do Código';
    }


    if (result >= 80) {
      return 'Decifrador de Sistemas';
    }


    if (result >= 60) {
      return 'Explorador de Código';
    }


    return 'Curioso em Tecnologia';

  }


  ngOnDestroy(): void {

    this.clearTimer();

  }


  private clearTimer(): void {

    if (this.timerHandle) {

      clearInterval(
        this.timerHandle
      );

      this.timerHandle = null;

    }

  }

}