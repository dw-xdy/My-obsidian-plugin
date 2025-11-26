// @ts-ignore
import { EditorView, Decoration, WidgetType } from "@codemirror/view";
import { EditorState, StateField, StateEffect, RangeSet } from "@codemirror/state";

// 定义效果
const addH1ContainerEffect
        = StateEffect.define<{ from: number; to: number }>();


// 创建包装部件
class H1ContainerWidget extends WidgetType {
    // 构造器
    constructor(private content: string) {
        super();
    }

    // 创建DOM对象: 标签是: div, class类名是: codeExample
    toDOM(view: EditorView): HTMLElement {
        const container = document.createElement("div");
        container.className = "codeExample";
        container.innerHTML = this.content;
        return container;
    }

    ignoreEvent(event: Event): boolean {
        return true;
    }
}
