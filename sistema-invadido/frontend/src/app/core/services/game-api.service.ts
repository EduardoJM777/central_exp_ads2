import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { AnswerResult, Challenge, GameSession, RankingResponse } from '../models/game.models';

@Injectable({ providedIn: 'root' })
export class GameApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3333/api';

  createSession(nickname: string): Observable<GameSession> {
    return this.http.post<GameSession>(`${this.apiUrl}/sessions`, { nickname });
  }

  answer(sessionId: string, challengeId: string, answer: string, elapsedSeconds: number, hintsUsed: number): Observable<AnswerResult> {
    return this.http.post<AnswerResult>(`${this.apiUrl}/sessions/${sessionId}/answer`, { challengeId, answer, elapsedSeconds, hintsUsed });
  }

  skip(sessionId: string, challengeId: string): Observable<{ completed: boolean; totalScore: number; correctAnswers: number }> {
    return this.http.post<{ completed: boolean; totalScore: number; correctAnswers: number }>(`${this.apiUrl}/sessions/${sessionId}/skip`, { challengeId });
  }

  nextChallenge(sessionId: string): Observable<{ challenge: Challenge | null }> {
    return this.http.get<{ challenge: Challenge | null }>(`${this.apiUrl}/sessions/${sessionId}/next`);
  }

  getRanking(): Observable<RankingResponse> {
    return this.http.get<RankingResponse>(`${this.apiUrl}/ranking`);
  }
}
