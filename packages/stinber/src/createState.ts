import { omit } from 'lodash-es';
import { State, RenderConfig, render } from './index';

type ProxyReturn = {
  [x: string]: string | number;
}

/**
 * Creates a state for two way data binding. If this state change the dom
 * will render as well.
 * @param state An literal object with your data
 * @param config A config like `{ initialRender: false }`
 */
export const createState = (state: State, config?: Partial<RenderConfig>): ProxyReturn => {
  const { initialRender = true } = config ?? {};
  const renderConfig = omit(config, 'initialRender');

  if (initialRender) render({ ...renderConfig }, state);

  return new Proxy(state, {
    set(target, property, value) {
      if (typeof property === 'symbol') return true;

      target[property] = value;
      render({ ...renderConfig }, target);

      return true;
    },
  });
};
