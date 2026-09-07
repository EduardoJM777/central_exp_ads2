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