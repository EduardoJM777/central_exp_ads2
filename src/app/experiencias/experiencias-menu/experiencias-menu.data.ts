import { ExperienceMenuItem } from "./experiencias-menu.model";

export const EXPERIENCE_MENU_ITEMS: ExperienceMenuItem[] = [
    {
        slug: 'desafio-logica',
        emoji: '🧠',
        name: 'Desafio da Lógica',
        description: 'Resolve sequências, padrões e decisões.',
        concepts: 'Algoritmos, lógica, estruturas condicionais',
        duration: '30-60s',
        status: 'ready'
    },
    {
        slug: 'sistema-invadido',
        emoji: '🔐',
        name: 'Sistema Invadido',
        description: 'Investiga pistas para descobrir uma senha ou usuário.',
        concepts: 'Segurança, lógica, dados',
        duration: '3-5 min',
        status: 'ready',
        url: 'http://localhost:4200'
    },
    {
        slug: 'banco-de-dados',
        emoji: '💾',
        name: 'Banco de Dados',
        description: 'Relaciona informações para encontrar um resultado.',
        concepts: 'Modelagem, consultas, relacionamentos',
        duration: '45-60s',
        status: 'ready'
    },
    {
        slug: 'codigo-misterioso',
        emoji: '💻',
        name: 'Código Misterioso',
        description: 'Completa ou interpreta pequenos trechos de código.',
        concepts: 'Programação, variáveis, condições',
        duration: '30-60s',
        status: 'ready'
    },
    {
        slug: 'cidade-inteligente',
        emoji: '🏙',
        name: 'Cidade Inteligente',
        description: 'Assuma a prefeitura, invista o orçamento e transforme uma cidade viva.',
        concepts: 'Dados, APIs, sistemas, IoT',
        duration: '4-6 min',
        status: 'ready',
        url: 'http://localhost:4201'
    },
    {
        slug: 'mini-game',
        emoji: '🎮',
        name: 'Mini Game ADS',
        description: 'Joga uma fase curta com desafios.',
        concepts: 'Lógica, eventos, interface, programação',
        duration: '60-120s',
        status: 'ready'
    },
    {
        slug: 'testador-senhas',
        emoji: '🔑',
        name: 'Testador de Senhas',
        description: 'Digite uma senha e veja o quão forte ela é, na hora.',
        concepts: 'Segurança, entropia, força bruta',
        duration: '30-90s',
        status: 'ready'
    }
];
