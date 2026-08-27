export type LogicQuestionType =
 | 'sequence'
 | 'classification'
 | 'ordering'
 | 'strategy'
 | 'cause-effect';

 export interface LogicQuestion {
    id: string;
    type: LogicQuestionType;
    typeLabel: string;
    scenario: string;
    prompt: string;
    options: string[];
    correctIndex: number;
    feedback: string;
    timeLimitSeconds: number;
 }

 export interface LogicAnswerLog {
    questionId: string;
    type: LogicQuestionType;
    correct: boolean;
    timeSpentSeconds: number;
    pointsEarned: number;
 }

 export interface LogicChallengeResult {
    visitorAlias: string | null;
    totalScore: number;
    correctCount: number;
    totalQuestions: number;
    accuracyPercent: number;
    averageTimeSeconds: number;
    rank: string;
    answers: LogicAnswerLog[];
 }