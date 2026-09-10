import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { DecisionResult, GameStart, RankingEntry, Scenario } from './models';

@Injectable({ providedIn: 'root' })
export class CityApiService {
  private readonly http = inject(HttpClient);
  private readonly api = (['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? 'http://localhost:3333' : 'https://sistema-invadido-api.onrender.com') + '/api/cidade';
  start(nickname: string) { return this.http.post<GameStart>(`${this.api}/sessions`, { nickname }); }
  decide(sessionId: string, scenarioId: string, decisionId: string) { return this.http.post<DecisionResult>(`${this.api}/sessions/${sessionId}/decisions`, { scenarioId, decisionId }); }
  next(sessionId: string) { return this.http.get<{ scenario: Scenario | null }>(`${this.api}/sessions/${sessionId}/next`); }
  ranking() { return this.http.get<{ ranking: RankingEntry[]; participants: number }>(`${this.api}/ranking`); }
}
