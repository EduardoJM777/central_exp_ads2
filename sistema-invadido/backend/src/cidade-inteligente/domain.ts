export type MetricKey = 'mobility' | 'sustainability' | 'safety' | 'wellbeing' | 'budget';
export type Metrics = Record<MetricKey, number>;

export interface Decision {
  id: string;
  title: string;
  description: string;
  investment: number;
  technology: string;
  effects: Partial<Metrics>;
  outcome: string;
}

export interface Scenario {
  id: string;
  round: number;
  category: string;
  alert: string;
  title: string;
  description: string;
  liveData: string;
  decisions: Decision[];
}

export interface DecisionHistory {
  round: number;
  scenario: string;
  decision: string;
  investment: number;
  technology: string;
  outcome: string;
}
