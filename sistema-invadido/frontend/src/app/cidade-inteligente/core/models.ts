export type MetricKey = 'mobility' | 'sustainability' | 'safety' | 'wellbeing' | 'budget';
export type Metrics = Record<MetricKey, number>;
export interface Decision { id: string; title: string; description: string; investment: number; technology: string; effects: Partial<Metrics>; outcome: string; }
export interface Scenario { id: string; round: number; category: string; alert: string; title: string; description: string; liveData: string; decisions: Decision[]; }
export interface DecisionHistory { round: number; scenario: string; decision: string; investment: number; technology: string; outcome: string; }
export interface GameStart { sessionId: string; nickname: string; metrics: Metrics; scenario: Scenario; round: number; totalRounds: number; treasury: number; startingTreasury: number; }
export interface DecisionResult { before: Metrics; metrics: Metrics; effects: Partial<Metrics>; outcome: string; technology: string; roundScore: number; totalScore: number; completed: boolean; cityIndex?: number; investment: number; treasury: number; totalInvestment: number; history: DecisionHistory[]; reserveTarget: number; fiscalBonus: number; fiscalStatus: string; fiscalMessage: string; }
export interface RankingEntry { id: number; nickname: string; score: number; cityIndex: number; createdAt: string; }
