import { LogicQuestion } from "./logic-challenge.model";

export const LOGIC_QUESTIONS: LogicQuestion[] = [
    {
        id: 'seq-01',
        type: 'sequence',
        typeLabel: 'Sequência',
        scenario: 'Toda sequência esconde uma regra.',
        prompt: '2, 4, 8, 16, ?',
        options: ['24', '32', '30', '18'],
        correctIndex: 1,
        feedback:
            'Você acabou de identificar um padrão - uma habilidade fundamental para construir algoritmos.',
        timeLimitSeconds: 40
    },

    {
        id: 'seq-02',
        type: 'sequence',
        typeLabel: 'Sequência',
        scenario: 'Algumas regras dependem dos números anteriores.',
        prompt: '1, 1, 2, 3, 5, 8, ?',
        options: ['11', '13', '12', '10'],
        correctIndex: 1,
        feedback:
            'Você reconheceu uma regra de formação com base nos termos anteriores - é assim que um algoritmo generaliza uma solução.',
        timeLimitSeconds: 40
    },

    {
        id: 'class-01',
        type: 'classification',
        typeLabel: 'Classificação',
        scenario: 'Nem tudo que é semelhante pertence ao mesmo grupo.',
        prompt: 'Qual item NÃO pertence ao grupo?',
        options: ['Array', 'Lista', 'Fila', 'Impressora'],
        correctIndex: 3,
        feedback:
            'Você separou o que é estrutura de dados do que é hardware - classificar corretamente é o primeiro passo para modelar um sistema.',
        timeLimitSeconds: 30
    },

    {
        id: 'order-01',
        type: 'ordering',
        typeLabel: 'Ordenação',
        scenario: 'Todo problema de programação segue um caminho.',
        prompt: 'Qual é a ordem correta para resolver um problema de programação?',
        options: [
            'Codificar -> Entender o problema -> Testar -> Planejar', 
            'Entender o problema -> Planejar a solução -> Codificar -> Testar', 
            'Testar -> Codificar -> Planejar -> Entender o problema', 
            'Planejar -> Testar -> Entender o problema -> Codificar'
        ],
        correctIndex: 1,
        feedback:
            'Você organizou as etapas na ordem certa - planejar antes de codificar evita retrabalho, e testar garante que a solução funciona de verdade.',
        timeLimitSeconds: 45
    },

    {
        id: 'strat-01',
        type: 'strategy',
        typeLabel: 'Estratégia',
        scenario: 
        'Seu programa trava sempre que a pessoa digita uma letra em vez de um número.',
        prompt: 'Qual é a melhor estratégia para resolver isso?',
        options: [
            'Pedir para o usuário nunca errar', 
            'Reiniciar o programa toda vez que travar', 
            'Validar a entrada antes de processar o valor', 
            'Ignorar o erro e continuar mesmo assim'
        ],
        correctIndex: 2,
        feedback:
            'Você escolheu prevenir o problema em vez de remediá-lo - antecipar falhas é uma das decisões mais importantes ao desenvolver um sistema.',
        timeLimitSeconds: 45
    },

    {
        id: 'cause-01',
        type: 'cause-effect',
        typeLabel: 'Causa e efeito',
        scenario: 'Toda decisão no código gera uma consequência.',
        prompt: 
            'Se um comando de repetição (loop) nunca recebe uma condição de parada, o que acontece?',
        options: [
            'O programa executa mais rápido', 
            'O programa entra em loop infinito', 
            'O programa ignora o comando automaticamente', 
            'Nada muda, é o comportamento normal'
        ],
        correctIndex: 1,
        feedback:
            'Você previu a consequência de uma decisão lógica antes de ela acontecer - isso é essencial para depurar sistemas.',
        timeLimitSeconds: 35
    }

]