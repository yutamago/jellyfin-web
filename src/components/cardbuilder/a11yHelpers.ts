/**
 * Keyboard-navigation and accessibility helpers for card grid components.
 */

const FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
].join(', ');

/**
 * Returns the first focusable descendant of the given container, or null if none exist.
 */
export function getFirstFocusable(container: HTMLElement): HTMLElement | null {
    return container.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
}

/**
 * Moves focus to the card at the given grid position.
 * @param grid - The card grid root element.
 * @param index - Zero-based card index.
 */
export function focusCardAtIndex(grid: HTMLElement, index: number): void {
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-card-index]'));
    const target = cards[index];
    if (target) {
        const focusable = getFirstFocusable(target) ?? target;
        focusable.focus({ preventScroll: false });
    }
}
