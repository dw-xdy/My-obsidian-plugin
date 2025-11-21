import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// 记得重命名这些类和接口！

interface MyPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
    mySetting: 'default'
}

export default class MyPlugin extends Plugin {
    settings: MyPluginSettings;

    async onload() {
        await this.loadSettings();

        // 在左侧功能区创建一个图标
        const ribbonIconEl = this.addRibbonIcon('heart', '示例插件', (_evt: MouseEvent) => {
            // 当用户点击图标时调用
            new Notice('但是我想要的不是这个');
        });
        // 为功能区图标添加额外样式
        ribbonIconEl.addClass('my-plugin-ribbon-class');

        // 在应用底部添加状态栏项（在移动应用中不起作用）
        const statusBarItemEl = this.addStatusBarItem();
        statusBarItemEl.setText('状态栏文本');

        // 添加一个可以在任何地方触发的简单命令
        this.addCommand({
            id: 'open-sample-modal-simple',
            name: '打开示例模态框（简单）',
            callback: () => {
                new SampleModal(this.app).open();
            }
        });
        // 添加一个编辑器命令，可以在当前编辑器实例上执行某些操作
        this.addCommand({
            id: 'sample-editor-command',
            name: '示例编辑器命令',
            editorCallback: (editor: Editor, _view: MarkdownView) => {
                console.log(editor.getSelection());
                editor.replaceSelection('示例编辑器命令');
            }
        });
        // 添加一个复杂命令，可以检查应用的当前状态是否允许执行该命令
        this.addCommand({
            id: 'open-sample-modal-complex',
            name: '打开示例模态框（复杂）',
            checkCallback: (checking: boolean) => {
                // 要检查的条件
                const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (markdownView) {
                    // 如果checking为true，我们只是"检查"命令是否可以运行
                    // 如果checking为false，那么我们想要实际执行操作
                    if (!checking) {
                        new SampleModal(this.app).open();
                    }

                    // 只有当检查函数返回true时，该命令才会显示在命令面板中
                    return true;
                }
            }
        });

        // 添加设置选项卡，以便用户可以配置插件的各个方面
        this.addSettingTab(new SampleSettingTab(this.app, this));

        // 如果插件挂载了任何全局DOM事件（在不属于此插件的应用部分上）
        // 使用此函数将在插件禁用时自动移除事件监听器
        this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
            console.log('click', evt);
        });

        // 注册间隔时，此函数将在插件禁用时自动清除间隔
        this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
    }

    onunload() {
        // 插件卸载时的清理工作
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class SampleModal extends Modal {
    constructor(app: App) {
        super(app);
    }

    onOpen() {
        const {contentEl} = this;
        contentEl.setText('哇！');
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }
}

class SampleSettingTab extends PluginSettingTab {
    plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();

        new Setting(containerEl)
                .setName('设置 #1')
                .setDesc('这是一个秘密')
                .addText(text => text
                        .setPlaceholder('输入你的秘密')
                        .setValue(this.plugin.settings.mySetting)
                        .onChange(async (value) => {
                            this.plugin.settings.mySetting = value;
                            await this.plugin.saveSettings();
                        }));
    }
}