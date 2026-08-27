export type ExperienceStatus = 'ready' | 'coming-soon';

export interface ExperienceMenuItem {
    slug: string;
    emoji: string;
    name: string;
    description: string;
    concepts: string;
    duration: string;
    status: ExperienceStatus;
}