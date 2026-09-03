import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
    selector: 'app-coming-soon',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="cs-stage">
            <span class="cs-emoji">{{ emoji }}</span>
            <h1 class="cs-title">{{ title }}</h1>
            <p class="cs-message">Esta experiência ainda está em desenvolvimento pela equipe.</p>
            <a class="cs-back" routerLink="/experiencias"><= Voltar para o menu</a>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            min-height: 100vh;
            background: #0e1420;
            color: #e7ecf3;
            font-family: 'Inter', system-ui, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            box-sizing: border-box;
        }
        .cs-stage { text-align: center; max-width: 420px; }
        .cs-emoji { font-size: 3rem; display: block; margin-bottom: 1rem; }
        .cs-title { font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; margin: 0 0 0.5rem; }
        .cs-message { color: #8a93a6; margin: 0 0 1.5rem; }
        .cs-back { color: #5eead4; text-decoration: none; font-size: 0.9rem; }
        .cs-back:hover { text-decoration: underline; }
        `]
})
export class ComingSoonComponent {
    private route = inject(ActivatedRoute);

    readonly title: string = this.route.snapshot.data['title'] ?? 'Em breve';
    readonly emoji: string = this.route.snapshot.data['emoji'] ?? '🚧';
}