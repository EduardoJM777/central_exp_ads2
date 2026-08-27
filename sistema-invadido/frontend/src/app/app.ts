import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { AnswerResult, Challenge, RankingEntry } from './core/models/game.models';
import { GameApiService } from './core/services/game-api.service';

type Screen = 'start' | 'game' | 'feedback' | 'result' | 'ranking';

@Component({ selector: 'app-root', imports: [FormsModule], styleUrl: './app.scss', templateUrl: './app.html' })
export class App implements OnInit, OnDestroy {
  private readonly api = inject(GameApiService);
  private timer?: ReturnType<typeof setInterval>;
  private terminalTimer?: ReturnType<typeof setInterval>;
  private terminalCursor = 0;
  private readonly terminalScript = [
    'C:\\ADS> netstat --scan local',
    '[OK] 12 conexões locais verificadas',
    'C:\\ADS> trace access_log.dat',
    '[WARN] padrão incomum encontrado no setor 07',
    'C:\\ADS> decrypt evidence --safe-mode',
    '[OK] pacote de evidências descriptografado',
    'C:\\ADS> monitor --live',
    '[SYS] aguardando credencial do agente...',
  ];

  readonly screen = signal<Screen>('start');
  readonly challenge = signal<Challenge | null>(null);
  readonly ranking = signal<RankingEntry[]>([]);
  readonly participants = signal(0);
  readonly timeLeft = signal(0);
  readonly revealedClues = signal(1);
  readonly challengeNumber = signal(1);
  readonly score = signal(0);
  readonly correctAnswers = signal(0);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly feedback = signal<AnswerResult | null>(null);
  readonly terminalLines = signal<string[]>([]);
  readonly progress = computed(() => this.challengeNumber() / 3 * 100);

  nickname = '';
  answer = '';
  sessionId = '';

  ngOnInit(): void { this.loadRanking(); }
  ngOnDestroy(): void { this.stopTimer(); this.stopTerminal(); }

  startGame(): void {
    const nickname = this.nickname.trim();
    if (nickname.length < 2) {
      this.errorMessage.set('Escolha um apelido com pelo menos 2 caracteres.');
      return;
    }
    this.playIntrusionAlert();
    this.loading.set(true);
    this.errorMessage.set('');
    this.api.createSession(nickname).subscribe({
      next: (session) => {
        this.sessionId = session.sessionId;
        this.nickname = session.nickname;
        this.score.set(0);
        this.correctAnswers.set(0);
        this.challengeNumber.set(1);
        this.openChallenge(session.challenge);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Não foi possível conectar à central. Confirme se o backend está ligado.');
        this.loading.set(false);
      },
    });
  }

  revealClue(): void {
    const total = this.challenge()?.clues.length ?? 0;
    if (this.revealedClues() < total) {
      this.revealedClues.update((value) => value + 1);
      this.playTone(280, 0.05);
    }
  }

  selectAnswer(option: string): void {
    this.answer = option;
    this.errorMessage.set('');
    this.playTone(360, 0.045);
  }

  submitAnswer(): void {
    const challenge = this.challenge();
    if (!challenge || !this.answer.trim() || this.loading()) return;
    this.loading.set(true);
    const elapsed = challenge.timeLimitSeconds - this.timeLeft();
    this.api.answer(this.sessionId, challenge.id, this.answer, elapsed, this.revealedClues()).subscribe({
      next: (result) => {
        this.loading.set(false);
        this.score.set(result.totalScore);
        this.correctAnswers.set(result.correctAnswers);
        if (result.correct) {
          this.feedback.set(result);
          this.stopTimer();
          this.stopTerminal();
          this.playTone(720, 0.12);
          setTimeout(() => this.playTone(920, 0.16), 120);
          this.screen.set('feedback');
        } else {
          this.playTone(150, 0.12);
          this.errorMessage.set(result.attemptsRemaining > 0
            ? `Credencial recusada. Você ainda tem ${result.attemptsRemaining} tentativa(s).`
            : 'Tentativas esgotadas. O sistema vai revelar uma nova missão.');
          if (result.attemptsRemaining === 0) {
            this.feedback.set(result);
            this.stopTimer();
            this.stopTerminal();
            this.screen.set('feedback');
          }
        }
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('A transmissão falhou. Tente novamente.');
      },
    });
  }

  continueGame(): void {
    const result = this.feedback();
    if (!result) return;
    if (!result.correct) return this.skipCurrent();
    if (result.completed) return this.finishGame();
    this.fetchNextChallenge();
  }

  skipCurrent(): void {
    const challenge = this.challenge();
    if (!challenge || this.loading()) return;
    this.stopTimer();
    this.stopTerminal();
    this.loading.set(true);
    this.api.skip(this.sessionId, challenge.id).subscribe({
      next: (result) => {
        this.loading.set(false);
        this.score.set(result.totalScore);
        this.correctAnswers.set(result.correctAnswers);
        if (result.completed) this.finishGame(); else this.fetchNextChallenge();
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Não foi possível avançar agora.');
      },
    });
  }

  showRanking(): void { this.loadRanking(); this.screen.set('ranking'); }
  goHome(): void { this.stopTimer(); this.stopTerminal(); this.screen.set('start'); this.errorMessage.set(''); this.answer = ''; }
  rankLabel(index: number): string { return index < 3 ? ['01', '02', '03'][index] : String(index + 1).padStart(2, '0'); }

  playIntrusionAlert(): void {
    try {
      const context = new AudioContext();
      [0, 0.72].forEach((offset) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(980, context.currentTime + offset);
        oscillator.frequency.exponentialRampToValueAtTime(230, context.currentTime + offset + 0.55);
        gain.gain.setValueAtTime(0.0001, context.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.055, context.currentTime + offset + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + offset + 0.58);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(context.currentTime + offset);
        oscillator.stop(context.currentTime + offset + 0.6);
      });
      setTimeout(() => void context.close(), 1600);
    } catch { /* O alerta visual permanece se o navegador bloquear o áudio. */ }
  }

  private openChallenge(challenge: Challenge): void {
    this.challenge.set(challenge);
    this.answer = '';
    this.feedback.set(null);
    this.errorMessage.set('');
    this.revealedClues.set(1);
    this.timeLeft.set(challenge.timeLimitSeconds);
    this.screen.set('game');
    this.startTimer();
    this.startTerminal(challenge.title);
  }

  private fetchNextChallenge(): void {
    this.loading.set(true);
    this.api.nextChallenge(this.sessionId).subscribe({
      next: ({ challenge }) => {
        this.loading.set(false);
        if (!challenge) return this.finishGame();
        this.challengeNumber.update((value) => value + 1);
        this.openChallenge(challenge);
      },
      error: () => { this.loading.set(false); this.errorMessage.set('Não foi possível carregar a próxima missão.'); },
    });
  }

  private finishGame(): void { this.stopTimer(); this.stopTerminal(); this.screen.set('result'); this.loadRanking(); }

  private startTimer(): void {
    this.stopTimer();
    this.timer = setInterval(() => {
      this.timeLeft.update((value) => Math.max(0, value - 1));
      if (this.timeLeft() === 0) {
        this.errorMessage.set('Tempo esgotado. Carregando a próxima missão...');
        this.skipCurrent();
      }
    }, 1000);
  }

  private stopTimer(): void { if (this.timer) clearInterval(this.timer); this.timer = undefined; }

  private startTerminal(missionTitle: string): void {
    this.stopTerminal();
    this.terminalCursor = 0;
    this.terminalLines.set([
      'Microsoft Windows [versão ADS.SECURE]',
      `C:\\ADS> load mission "${missionTitle.toLowerCase()}"`,
      '[SYS] ambiente seguro e simulado iniciado',
    ]);
    this.terminalTimer = setInterval(() => {
      const line = this.terminalScript[this.terminalCursor];
      this.terminalCursor = (this.terminalCursor + 1) % this.terminalScript.length;
      this.terminalLines.update((lines) => [...lines, line].slice(-6));
    }, 850);
  }

  private stopTerminal(): void {
    if (this.terminalTimer) clearInterval(this.terminalTimer);
    this.terminalTimer = undefined;
  }

  private loadRanking(): void {
    this.api.getRanking().subscribe({ next: ({ ranking, participants }) => { this.ranking.set(ranking); this.participants.set(participants); } });
  }

  private playTone(frequency: number, duration: number): void {
    try {
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.035;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration);
    } catch { /* O som é apenas um reforço visual. */ }
  }
}
