/** Fallback для страниц без `highlights` в пропсах (главная задаёт строки из `data.homeHeroHighlights`). */
export const DEFAULT_HERO_HIGHLIGHTS: readonly string[] = [
    'Индивидуальная концепция под ваш стиль жизни',
    'Фиксированные сроки и прозрачный бюджет',
    'Полное сопровождение: дизайн + реализация',
];

export const resolveHeroHighlights = (highlights?: string[] | undefined): string[] =>
    highlights?.length ? [...highlights] : [...DEFAULT_HERO_HIGHLIGHTS];
