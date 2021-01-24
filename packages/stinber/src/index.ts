export { render } from './render';
export { createState } from './createState';
export { listener } from './listener';

export interface RenderConfig {
  initialRender: boolean;
  allowHTML: boolean;
  stringifyValues: boolean;
}

export type StateValue = string | number | boolean;

export type State = Record<string, StateValue>;
