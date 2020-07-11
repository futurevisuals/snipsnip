import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

interface Options {
  className?: string;
  target?: Element;
  init?: () => void;
  title: string;
  content: string;
}

export class Dialog {
  private dialogInDOM: Element = document.createElement('DIV');
  private options: Options;

  constructor(options?: Options){
    const defaultOptions = {
      className: 'o-dialog',
      target: document.body,
      title: 'My Modal',
      content: 'My modal content'
    };
    this.options = { ...defaultOptions, ...options };

    if (document.querySelector('.js-dialog')) {
      throw new Error('You can only have one dialog on the page, unmount the other first.');
    }

    this.createDialog();
  }

  private createDialog (): void {
    this.dialogInDOM.insertAdjacentHTML('afterbegin', `
      <div class="${this.options.className} js-dialog">
        <div class="${this.options.className}__overlay js-dialog-overlay"></div>
        <div class="${this.options.className}__container">
          <button class="${this.options.className}__close js-dialog-close">
            <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.27455 6L11.686 2.58852C12.1047 2.16989 12.1047 1.49114 11.686 1.07216L10.9278 0.313977C10.5092 -0.104659 9.83045 -0.104659 9.41148 0.313977L6 3.72545L2.58852 0.313977C2.16989 -0.104659 1.49114 -0.104659 1.07216 0.313977L0.313977 1.07216C-0.104659 1.4908 -0.104659 2.16955 0.313977 2.58852L3.72545 6L0.313977 9.41148C-0.104659 9.83011 -0.104659 10.5089 0.313977 10.9278L1.07216 11.686C1.4908 12.1047 2.16989 12.1047 2.58852 11.686L6 8.27455L9.41148 11.686C9.83011 12.1047 10.5092 12.1047 10.9278 11.686L11.686 10.9278C12.1047 10.5092 12.1047 9.83045 11.686 9.41148L8.27455 6Z" fill="currentColor"/>
            </svg>
          </button>
          <div class="${this.options.className}__content">
            <h4 class="${this.options.className}__content-title">${this.options.title}</h4>
            <main class="${this.options.className}__content-body">
              ${this.options.content}
            </main>
          </div>
        </div>
      </div>
    `);
  }

  private addEvents (): void {
    this.dialogInDOM.querySelector('.js-dialog-close')?.addEventListener('click', this.unmount);
    this.dialogInDOM.querySelector('.js-dialog-overlay')?.addEventListener('click', this.unmount);
  }

  public mount (): void {
    this.addEvents();
    this.options.target?.insertAdjacentElement('beforeend', this.dialogInDOM);
    this.options.init?.();
    const existingDialog = document.querySelector(`.${this.options.className}__content`);

    existingDialog && disableBodyScroll(existingDialog);
  }

  public unmount (): void {
    const dialog = document.querySelector('.js-dialog');
    dialog?.parentElement?.removeChild(dialog);
    clearAllBodyScrollLocks();
  }

  public show (): void {
    this.dialogInDOM.setAttribute('style', 'display: block');
    disableBodyScroll(document.body);
  }

  public hide (): void {
    this.dialogInDOM.setAttribute('style', 'display: none');
    clearAllBodyScrollLocks();
  }
}