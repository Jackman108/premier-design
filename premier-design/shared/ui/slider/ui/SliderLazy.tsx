'use client';

import Slider from './Slider';

/**
 * Оставляем стабильный экспорт "Lazy" для совместимости API,
 * но в dev грузим компонент напрямую, чтобы избежать HMR-404 по отдельному чанку слайдера.
 */
export default Slider;
