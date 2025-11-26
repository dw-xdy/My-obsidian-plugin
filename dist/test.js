"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("@codemirror/view");
class H1ContainerWidget extends view_1.WidgetType {
    constructor(htmlContent) {
        super();
        this.htmlContent = htmlContent;
    }
    toDOM() {
        const container = document.createElement("div");
        container.innerHTML = this.htmlContent;
        return container;
    }
    ignoreEvent() {
        return true;
    }
}
// 从外部加载 HTML 内容
function loadHTMLContent() {
    return __awaiter(this, void 0, void 0, function* () {
        // 这里可以从服务器获取，或者使用其他方式
        const response = yield fetch('template.html');
        return yield response.text();
    });
}
// 创建编辑器
loadHTMLContent().then(htmlContent => {
    const widget = new H1ContainerWidget(htmlContent);
    // 这里可以将 widget 应用到编辑器中
});
