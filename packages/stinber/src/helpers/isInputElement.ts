/**
 * @description Checks if given element is an `<input/>` or `<textarea/>` element
 */
export const isInputElement = (el: Element): boolean => {
  return el instanceof HTMLInputElement === false && el instanceof HTMLTextAreaElement === false;
};
