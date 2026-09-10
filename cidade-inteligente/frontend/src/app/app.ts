import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CityApiService } from './core/city-api.service';
import type { Decision, DecisionHistory, DecisionResult, MetricKey, Metrics, RankingEntry, Scenario } from './core/models';

type Screen = 'start' | 'game' | 'impact' | 'result' | 'ranking';

@Component({ selector: 'app-root', imports: [FormsModule], templateUrl: './app.html', styleUrl: './app.scss' })
export class App implements OnInit {
  private readonly api = inject(CityApiService);
  readonly screen = signal<Screen>('start');
  readonly scenario = signal<Scenario | null>(null);
  readonly metrics = signal<Metrics>({ mobility: 62, sustainability: 58, safety: 65, wellbeing: 60, budget: 72 });
  readonly impact = signal<DecisionResult | null>(null);
  readonly ranking = signal<RankingEntry[]>([]);
  readonly participants = signal(0);
  readonly round = signal(1);
  readonly score = signal(0);
  readonly treasury = signal(20000000);
  readonly startingTreasury = signal(20000000);
  readonly totalInvestment = signal(0);
  readonly history = signal<DecisionHistory[]>([]);
  readonly totalRounds = signal(5);
  readonly reserveTarget = signal(4000000);
  readonly fiscalBonus = signal(0);
  readonly fiscalStatus = signal('');
  readonly fiscalMessage = signal('');
  readonly loading = signal(false);
  readonly error = signal('');
  readonly cityIndex = computed(() => Math.round(Object.values(this.metrics()).reduce((sum, value) => sum + value, 0) / 5));
  readonly cityProfile = computed(() => this.cityIndex() >= 80 ? 'CIDADE DO FUTURO' : this.cityIndex() >= 66 ? 'CIDADE CONECTADA' : 'CIDADE EM TRANSFORMAÇÃO');

  nickname = '';
  sessionId = '';

  readonly metricList: { key: MetricKey; label: string; icon: string }[] = [
    { key: 'mobility', label: 'Mobilidade', icon: '↔' }, { key: 'sustainability', label: 'Sustentabilidade', icon: '♧' },
    { key: 'safety', label: 'Segurança', icon: '◇' }, { key: 'wellbeing', label: 'Bem-estar', icon: '♡' },
    { key: 'budget', label: 'Orçamento', icon: '$' },
  ];

  ngOnInit() { this.loadRanking(); }

  startGame() {
    if (this.nickname.trim().length < 2) { this.error.set('Escolha um apelido com pelo menos 2 caracteres.'); return; }
    this.loading.set(true); this.error.set('');
    this.api.start(this.nickname.trim()).subscribe({
      next: (game) => { this.sessionId = game.sessionId; this.nickname = game.nickname; this.metrics.set(game.metrics); this.scenario.set(game.scenario); this.round.set(1); this.totalRounds.set(game.totalRounds); this.score.set(0); this.treasury.set(game.treasury); this.startingTreasury.set(game.startingTreasury); this.totalInvestment.set(0); this.history.set([]); this.screen.set('game'); this.loading.set(false); this.tone(480); },
      error: () => { this.error.set('Não foi possível conectar à central da cidade. Verifique o backend.'); this.loading.set(false); },
    });
  }

  choose(decision: Decision) {
    const scenario = this.scenario();
    if (!scenario || this.loading()) return;
    this.loading.set(true);
    this.api.decide(this.sessionId, scenario.id, decision.id).subscribe({
      next: (result) => { this.metrics.set(result.metrics); this.score.set(result.totalScore); this.treasury.set(result.treasury); this.totalInvestment.set(result.totalInvestment); this.history.set(result.history); this.reserveTarget.set(result.reserveTarget); this.fiscalBonus.set(result.fiscalBonus); this.fiscalStatus.set(result.fiscalStatus); this.fiscalMessage.set(result.fiscalMessage); this.impact.set(result); this.screen.set('impact'); this.loading.set(false); this.tone(result.roundScore >= 100 ? 720 : 360); },
      error: () => { this.error.set('A decisão não pôde ser processada. Confira o orçamento disponível.'); this.loading.set(false); },
    });
  }

  continueGame() {
    if (this.impact()?.completed) { this.screen.set('result'); this.loadRanking(); return; }
    this.loading.set(true);
    this.api.next(this.sessionId).subscribe({
      next: ({ scenario }) => { if (!scenario) { this.screen.set('result'); return; } this.scenario.set(scenario); this.round.set(scenario.round); this.impact.set(null); this.screen.set('game'); this.loading.set(false); },
      error: () => { this.error.set('Não foi possível carregar o próximo desafio.'); this.loading.set(false); },
    });
  }

  showRanking() { this.loadRanking(); this.screen.set('ranking'); }
  home() { this.screen.set('start'); this.error.set(''); }
  metricValue(key: MetricKey) { return this.metrics()[key]; }
  effectValue(key: MetricKey) { return this.impact()?.effects[key] ?? 0; }
  effectText(key: MetricKey) { const value = this.effectValue(key); return value > 0 ? `+${value}` : `${value}`; }
  money(value: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value); }
  canAfford(decision: Decision) { return decision.investment <= this.treasury(); }
  reserveProgress() { return Math.min(100, this.treasury() / this.reserveTarget() * 100); }
  rank(index: number) { return String(index + 1).padStart(2, '0'); }

  private loadRanking() {
    this.api.ranking().subscribe({ next: ({ ranking, participants }) => { this.ranking.set(ranking); this.participants.set(participants); } });
  }

  private tone(frequency: number) {
    try { const context = new AudioContext(); const oscillator = context.createOscillator(); const gain = context.createGain(); oscillator.frequency.value = frequency; gain.gain.value = .035; oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + .12); } catch { /* Som opcional. */ }
  }
}
