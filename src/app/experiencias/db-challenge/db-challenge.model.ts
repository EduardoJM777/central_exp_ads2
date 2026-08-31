export interface DbTable {
    name: string;
    columns: string[];
    rows: (string | number)[][];
}

export interface DbQuestion {
    id: string;
    scenario: string;
    prompt: string;
    options: string[];
    correctIndex: number;
    sql: string;
    feedback: string;
    timeLimitSeconds: number;
}

export interface DbAnswerLog {
    questionId: string;
    correct: boolean;
    timeSpentSeconds: number;
    pointsEarned: number;
}

export interface DbChallengeResult {
    visitorAlias: string | null;
    totalScore: number;
    correctCount: number;
    totalQuestions: number;
    accuracyPercent: number;
    averageTimeSeconds: number;
    rank: string;
    answers: DbAnswerLog[];
}