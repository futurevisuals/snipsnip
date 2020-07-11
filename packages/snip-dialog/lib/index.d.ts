interface Options {
    className?: string;
    target?: Element;
    init?: () => void;
    title: string;
    content: string;
}
export declare class Dialog {
    private dialogInDOM;
    private options;
    constructor(options?: Options);
    private createDialog;
    private addEvents;
    mount(): void;
    unmount(): void;
    show(): void;
    hide(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map