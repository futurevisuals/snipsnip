import { RenderConfig, State } from './index';
import { isInputElement } from './helpers/isInputElement';

type InputInstances = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;

/**
 * @description Renders given state to the DOM
 */
export const render = (config: Partial<RenderConfig>, state: State): void => {
  const { stringifyValues, allowHTML } = config ?? {};
  const updateMethod = allowHTML ? 'innerHTML' : 'textContent';
  const bindings = (Array.from(document.querySelectorAll('[data-binding]')) as HTMLElement[]).map((x) => x.dataset.binding);

  bindings.forEach((binding) => {
    if (!binding) return;

    const rawData = state[binding];

    if (typeof rawData === 'undefined') {
      console.warn(`🚨 The binding "${binding}" is not declared in the state, therefore nothing happens.`);
      return;
    }

    const data = stringifyValues ? String(rawData) : rawData;
    const models = Array.from(document.querySelectorAll(`[data-model='${binding}']`)) as Array<InputInstances>;
    const binders = Array.from(document.querySelectorAll(`[data-binding="${binding}"]`));

    if (typeof data !== 'string') {
      console.warn(`
        🚨 The data you're trying to set (${data}) is not a string. 
        The attributes method "textContent" or "innerHTML" only accepts a string. 
        You can either change the type or enable the "stringifyValues" option.
        For now nothing is set!
      `);
    }

    models.forEach((x) => {
      if (isInputElement(x)) throw new Error('You can only apply the \'data-model=""\' attribute to an <input /> or <textarea /> element');
      if (typeof data === 'string') x.value = data;
    });

    binders.forEach((x) => {
      if (!isInputElement(x))
        throw new Error('You can only apply the \'data-binding=""\' attribute on non <input /> or <textarea /> elements');
      if (typeof data === 'string') x[updateMethod] = data;
    });
  });
};
