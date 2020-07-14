"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
var body_scroll_lock_1 = require("body-scroll-lock");
var Dialog = /** @class */ (function () {
    function Dialog(options) {
        var defaultOptions = {
            className: 'o-dialog',
            target: document.body,
            title: 'My Modal',
            content: 'My modal content',
            init: function () { return undefined; }
        };
        this.options = __assign(__assign({}, defaultOptions), options);
        this.dialogInDOM = document.createElement('DIV');
        this.dialogInDOM.classList.add('js-dialog', this.options.className);
        if (document.querySelector('.js-dialog')) {
            throw new Error('You can only have one dialog on the page, unmount the other first.');
        }
        this.createDialog();
    }
    Dialog.prototype.createDialog = function () {
        this.dialogInDOM.insertAdjacentHTML('afterbegin', "\n      <div class=\"" + this.options.className + " js-dialog\">\n        <div class=\"" + this.options.className + "__overlay js-dialog-overlay\"></div>\n        <div class=\"" + this.options.className + "__container\">\n          <button class=\"" + this.options.className + "__close js-dialog-close\">\n            <svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" xmlns=\"http://www.w3.org/2000/svg\">\n              <path d=\"M8.27455 6L11.686 2.58852C12.1047 2.16989 12.1047 1.49114 11.686 1.07216L10.9278 0.313977C10.5092 -0.104659 9.83045 -0.104659 9.41148 0.313977L6 3.72545L2.58852 0.313977C2.16989 -0.104659 1.49114 -0.104659 1.07216 0.313977L0.313977 1.07216C-0.104659 1.4908 -0.104659 2.16955 0.313977 2.58852L3.72545 6L0.313977 9.41148C-0.104659 9.83011 -0.104659 10.5089 0.313977 10.9278L1.07216 11.686C1.4908 12.1047 2.16989 12.1047 2.58852 11.686L6 8.27455L9.41148 11.686C9.83011 12.1047 10.5092 12.1047 10.9278 11.686L11.686 10.9278C12.1047 10.5092 12.1047 9.83045 11.686 9.41148L8.27455 6Z\" fill=\"currentColor\"/>\n            </svg>\n          </button>\n          <div class=\"" + this.options.className + "__content\">\n            <h4 class=\"" + this.options.className + "__content-title\">" + this.options.title + "</h4>\n            <main class=\"" + this.options.className + "__content-body\">\n              " + this.options.content + "\n            </main>\n          </div>\n        </div>\n      </div>\n    ");
    };
    Dialog.prototype.addEvents = function () {
        var _a, _b;
        (_a = this.dialogInDOM.querySelector('.js-dialog-close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.unmount);
        (_b = this.dialogInDOM.querySelector('.js-dialog-overlay')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.unmount);
    };
    Dialog.prototype.mount = function () {
        var _a, _b, _c;
        this.addEvents();
        (_a = this.options.target) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement('beforeend', this.dialogInDOM);
        (_c = (_b = this.options).init) === null || _c === void 0 ? void 0 : _c.call(_b);
        var existingDialog = document.querySelector("." + this.options.className + "__content");
        existingDialog && body_scroll_lock_1.disableBodyScroll(existingDialog);
    };
    Dialog.prototype.unmount = function () {
        var _a;
        var dialog = document.querySelector('.js-dialog');
        (_a = dialog === null || dialog === void 0 ? void 0 : dialog.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(dialog);
        body_scroll_lock_1.clearAllBodyScrollLocks();
    };
    Dialog.prototype.show = function () {
        this.dialogInDOM.setAttribute('style', 'display: block');
        body_scroll_lock_1.disableBodyScroll(document.body);
    };
    Dialog.prototype.hide = function () {
        this.dialogInDOM.setAttribute('style', 'display: none');
        body_scroll_lock_1.clearAllBodyScrollLocks();
    };
    return Dialog;
}());
exports.Dialog = Dialog;
//# sourceMappingURL=index.js.map