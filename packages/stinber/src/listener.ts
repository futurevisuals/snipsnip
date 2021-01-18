import { State } from 'index';

/**
 * Bind this to an keyboard event to really enable two-way databinding power.
 * @param e A keyboard event
 */
export function listener (this: State, { target }: KeyboardEvent): void {
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) {
    throw new Error('You can only put the listener on an actual DOM element and not on the document or window object');
  }

  const { dataset, value } = target;
  if (dataset.model) this[dataset.model] = value;
}
