interface Options {
    className: string;
    target: Element;
    init: () => undefined;
    title: string;
    content: string;
}
export declare class Dialog {
    private dialogInDOM;
    private options;
    constructor(options?: Partial<Options>);
    private createDialog;
    private addEvents;
    mount(): void;
    unmount(): void;
    show(): void;
    hide(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map