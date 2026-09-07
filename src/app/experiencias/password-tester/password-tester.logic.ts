import { PasswordCriterion, PasswordEvaluation, PasswordStrengthLevel } from "./password-tester.model";

export const PASSWORD_CRITERIA: PasswordCriterion[] = [
    { id: 'length8', label: 'Tem pelo menos 8 caracteres', weight: 20, test: (p) => p.length >= 8 },
    { id: 'length12', label: 'Tem 12 caracteres ou mais', weight: 15, test: (p) => p.length >= 12 },
    { id: 'lowercase', label: 'Usa letras minúsculas', weight: 10, test: (p) => /[a-z]/.test(p) },
    { id: 'number', label: 'Usa números', weight: 15, test: (p) => /[0-9]/.test(p) },
    { id: 'symbol', label: 'Usa símbolos (ex: @ # ! %)', weight: 15, test: (p) => /[^A-Za-z0-9]/.test(p) },
    { id: 'notCommon', label: 'Não é uma senha muito comum', weight: 10, test: (p) => !COMMON_PASSWORDS.has(p.toLowerCase())}
];

const COMMON_PASSWORDS = new Set([
    '123456', '12345678', '123456789', '12345', '1234',
    'senha', 'senha123', 'password', 'qwerty', 'admin',
    'iloveyou', '111111', '000000', 'abc123', 'usuario'
]);

export const PASSWORD_LEVELS: PasswordStrengthLevel[] = [
    { label: 'Muito fraca', color: '#ff6b6b', minScore: 0 },
    { label: 'Fraca', color: '#fb923c', minScore: 31 },
    { label: 'Média', color: '#fde047', minScore: 51 },
    { label: 'Forte', color: '#5eead4', minScore: 71 },
    { label: 'Muito forte', color: '#4ade80', minScore: 91 }
];

function hasWeakPattern(password: string): boolean {
    const lower = password.toLowerCase();
    const sequences = ['1234', '2345', '3456', '4567', '5678', '6789', 'abcd', 'bcde', 'qwer'];
    if (sequences.some((seq) => lower.includes(seq))) return true;
    if (/(.)\1\1/.test(password)) return true;
    return false;
}

function levelFor(score: number): PasswordStrengthLevel {
    return [...PASSWORD_LEVELS].reverse().find((level) => score >= level.minScore)!;
}

function tipFor(password: string, passedIds: string[], weakPattern: boolean): string {
    if (password.length === 0) {
        return 'Comece a digitar para ver a força da senha em tempo real.';
    }
    const firstMissing = PASSWORD_CRITERIA.find((c) => !passedIds.includes(c.id));
    if (firstMissing) {
        return `Dica: ${firstMissing.label.charAt(0).toLowerCase()}${firstMissing.label.slice(1)} deixaria essa senha mais resistente a ataques de força bruta.`;
    }
    if (weakPattern) {
        return 'Ela cumpre os critérios, mas tem uma sequência previsível (como "1234" ou letras repetidas) - isso reduz a resistência real contra tentativas automatizadas.';
    }
    return 'Excelente! Essa senha combina tamanho, variedade de caracteres e imprevisibilidade - os três pilares contra ataques de força bruta.';
}

export function evaluatePassword(password: string): PasswordEvaluation {
    const passedCriteriaIds = PASSWORD_CRITERIA.filter((c) => c.test(password)).map((c) => c.id);
    const baseScore = PASSWORD_CRITERIA
        .filter((c) => passedCriteriaIds.includes(c.id))
        .reduce((sum, c) => sum + c.weight, 0);

    const weakPattern = password.length > 0 && hasWeakPattern(password);
    const score = Math.max(0, weakPattern ? baseScore - 20 : baseScore);

    return {
        score,
        level: levelFor(score),
        passedCriteriaIds,
        hasWeakPattern: weakPattern,
        tip: tipFor(password, passedCriteriaIds, weakPattern)
    };
}