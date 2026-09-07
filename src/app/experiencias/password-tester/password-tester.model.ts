export interface PasswordCriterion {
    id: string;
    label: string;
    weight: number;
    test: (password: string) => boolean;
}

export interface PasswordStrengthLevel {
    label: string;
    color: string;
    minScore: number;
}

export interface PasswordEvaluation {
    score: number;
    level: PasswordStrengthLevel;
    passedCriteriaIds: string[];
    hasWeakPattern: boolean;
    tip: string;
}

export interface PasswordTesterResult {
    visitorAlias: string | null;
    bestScore: number;
    bestLevelLabel: string;
    attemptsTried: number;
    timeSpentSeconds: number;
}