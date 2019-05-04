/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { GoldenLayoutConfiguration } from './config';
import { GoldenLayoutStateStore } from './state';
/**
 * golden-layout component initialization callback type.
 * @record
 */
export function ComponentInitCallback() { }
/**
 * @record
 */
export function ComponentInitCallbackFactory() { }
if (false) {
    /**
     * @param {?} component
     * @return {?}
     */
    ComponentInitCallbackFactory.prototype.createComponentInitCallback = function (component) { };
}
export class GoldenLayoutService {
    /**
     * @param {?} config
     * @param {?} stateStore
     */
    constructor(config, stateStore) {
        this.config = config;
        this.stateStore = stateStore;
        this._layout = null;
    }
    /**
     * @param {?} goldenLayout
     * @param {?} componentInitCallbackFactory
     * @return {?}
     */
    initialize(goldenLayout, componentInitCallbackFactory) {
        this._layout = goldenLayout;
        this.config.components.forEach((componentConfig) => {
            /** @type {?} */
            const componentInitCallback = componentInitCallbackFactory.createComponentInitCallback(componentConfig.component);
            goldenLayout.registerComponent(componentConfig.componentName, componentInitCallback);
        });
        if (this.stateStore) {
            ((/** @type {?} */ (((/** @type {?} */ (goldenLayout)))))).on('stateChanged', () => {
                this._saveState(goldenLayout);
            });
        }
    }
    /**
     * @param {?} goldenLayout
     * @return {?}
     */
    _saveState(goldenLayout) {
        if (this.stateStore && goldenLayout.isInitialised) {
            try {
                this.stateStore.writeState(goldenLayout.toConfig());
            }
            catch (ex) {
                // Workaround for https://github.com/deepstreamIO/golden-layout/issues/192
            }
        }
    }
    /**
     * @return {?}
     */
    getState() {
        if (this.stateStore) {
            return this.stateStore.loadState().catch(() => {
                return this.config.defaultLayout;
            });
        }
        return Promise.resolve(this.config.defaultLayout);
    }
    /**
     * @return {?}
     */
    getRegisteredComponents() {
        return this.config.components;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getRegisteredComponent(name) {
        for (let index = 0; index < this.config.components.length; index++) {
            /** @type {?} */
            const component = this.config.components[index];
            if (component.componentName === name) {
                return component;
            }
        }
        return null;
    }
    /**
     * @return {?}
     */
    childOfRoot() {
        if (this._layout == null || this._layout.root == null || this._layout.root.contentItems == null || this._layout.root.contentItems.length === 0) {
            throw new Error("no child in root ");
        }
        return this._layout.root.contentItems[0];
    }
    /**
     * @param {?} parent
     * @param {?=} opt
     * @return {?}
     */
    addStack(parent, opt) {
        if (parent == null) {
            throw new Error("cannot add stack to null item");
        }
        if (opt != null && opt.id != null && parent.getItemsById(opt.id).length > 0) {
            throw new Error(`there already exists a item with same id: ${opt.id} in parent!`);
        }
        // create stack item
        /** @type {?} */
        const stack = (/** @type {?} */ (this._layout.createContentItem(Object.assign({ type: 'stack' }, (/** @type {?} */ (opt))))));
        parent.addChild(stack);
        return stack;
    }
    /**
     * @param {?} parent
     * @param {?} comp
     * @param {?=} opt
     * @return {?}
     */
    addComponent(parent, comp, opt) {
        if (parent == null) {
            throw new Error("cannot add component to null item");
        }
        if (opt != null && opt.id != null && parent.getItemsById(opt.id).length > 0) {
            throw new Error(`there already exists a item with same id: ${opt.id} in parent!`);
        }
        // create content item
        /** @type {?} */
        const content = (/** @type {?} */ (this._layout.createContentItem(Object.assign({ type: 'component', componentName: comp.componentName }, (/** @type {?} */ (opt))))));
        parent.addChild(content);
        return content;
    }
    /**
     * @return {?}
     */
    currentConfig() {
        return JSON.stringify(this._layout.toConfig(), null, 2);
    }
    /**
     * @return {?}
     */
    isChildWindow() {
        return !!window.opener;
    }
    /**
     * @return {?}
     */
    getRootWindow() {
        return window.opener || window;
    }
}
GoldenLayoutService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GoldenLayoutService.ctorParameters = () => [
    { type: GoldenLayoutConfiguration, decorators: [{ type: Inject, args: [GoldenLayoutConfiguration,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [GoldenLayoutStateStore,] }] }
];
if (false) {
    /** @type {?} */
    GoldenLayoutService.prototype._layout;
    /** @type {?} */
    GoldenLayoutService.prototype.config;
    /** @type {?} */
    GoldenLayoutService.prototype.stateStore;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZGVuLWxheW91dC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdhcnJpb3J0cmFkaW5nL25nLWdvbGRlbi1sYXlvdXQvIiwic291cmNlcyI6WyJsaWIvZ29sZGVuLWxheW91dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBUSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbkUsT0FBTyxFQUFFLHlCQUF5QixFQUEwQixNQUFNLFVBQVUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQXNDLE1BQU0sU0FBUyxDQUFDOzs7OztBQUtyRiwyQ0FFQzs7OztBQUVELGtEQUVDOzs7Ozs7SUFEQyw4RkFBeUU7O0FBSTNFLE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBRzlCLFlBQStELE1BQWlDLEVBQ3ZCLFVBQXNCO1FBRGhDLFdBQU0sR0FBTixNQUFNLENBQTJCO1FBQ3ZCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFIdkYsWUFBTyxHQUFpQixJQUFJLENBQUM7SUFHNkQsQ0FBQzs7Ozs7O0lBRTVGLFVBQVUsQ0FBQyxZQUEwQixFQUFFLDRCQUEwRDtRQUN0RyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUF1QyxFQUFFLEVBQUU7O2tCQUNuRSxxQkFBcUIsR0FBRyw0QkFBNEIsQ0FBQywyQkFBMkIsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO1lBQ2pILFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsQ0FBQyxtQkFBMkIsQ0FBQyxtQkFBSyxZQUFZLEVBQUEsQ0FBQyxFQUFBLENBQUMsQ0FBQyxFQUFF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QUNwRix5Q0FBbUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFR5cGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBHb2xkZW5MYXlvdXQgZnJvbSAnZ29sZGVuLWxheW91dCc7XG5pbXBvcnQgeyBHb2xkZW5MYXlvdXRDb25maWd1cmF0aW9uLCBDb21wb25lbnRDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgR29sZGVuTGF5b3V0U3RhdGVTdG9yZSwgU3RhdGVTdG9yZSwgTG9jYWxTdG9yYWdlU3RhdGVTdG9yZSB9IGZyb20gJy4vc3RhdGUnO1xuXG4vKipcbiAqIGdvbGRlbi1sYXlvdXQgY29tcG9uZW50IGluaXRpYWxpemF0aW9uIGNhbGxiYWNrIHR5cGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50SW5pdENhbGxiYWNrIGV4dGVuZHMgRnVuY3Rpb24ge1xuICAoY29udGFpbmVyOiBHb2xkZW5MYXlvdXQuQ29udGFpbmVyLCBjb21wb25lbnRTdGF0ZTogYW55KTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnRJbml0Q2FsbGJhY2tGYWN0b3J5IHtcbiAgY3JlYXRlQ29tcG9uZW50SW5pdENhbGxiYWNrKGNvbXBvbmVudDogVHlwZTxhbnk+KTogQ29tcG9uZW50SW5pdENhbGxiYWNrO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29sZGVuTGF5b3V0U2VydmljZSB7XG4gIHByaXZhdGUgX2xheW91dDogR29sZGVuTGF5b3V0ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEdvbGRlbkxheW91dENvbmZpZ3VyYXRpb24pIHB1YmxpYyByZWFkb25seSBjb25maWc6IEdvbGRlbkxheW91dENvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoR29sZGVuTGF5b3V0U3RhdGVTdG9yZSkgcHJpdmF0ZSByZWFkb25seSBzdGF0ZVN0b3JlOiBTdGF0ZVN0b3JlKSB7fVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKGdvbGRlbkxheW91dDogR29sZGVuTGF5b3V0LCBjb21wb25lbnRJbml0Q2FsbGJhY2tGYWN0b3J5OiBDb21wb25lbnRJbml0Q2FsbGJhY2tGYWN0b3J5KSB7XG4gICAgdGhpcy5fbGF5b3V0ID0gZ29sZGVuTGF5b3V0O1xuICAgIHRoaXMuY29uZmlnLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50Q29uZmlnOiBDb21wb25lbnRDb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICBjb25zdCBjb21wb25lbnRJbml0Q2FsbGJhY2sgPSBjb21wb25lbnRJbml0Q2FsbGJhY2tGYWN0b3J5LmNyZWF0ZUNvbXBvbmVudEluaXRDYWxsYmFjayhjb21wb25lbnRDb25maWcuY29tcG9uZW50KTtcbiAgICAgIGdvbGRlbkxheW91dC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnRDb25maWcuY29tcG9uZW50TmFtZSwgY29tcG9uZW50SW5pdENhbGxiYWNrKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnN0YXRlU3RvcmUpIHtcbiAgICAgICg8R29sZGVuTGF5b3V0LkV2ZW50RW1pdHRlcj4oPGFueT5nb2xkZW5MYXlvdXQpKS5vbignc3RhdGVDaGFuZ2VkJywgKCkgPT4ge1xuICAgICAgICB0aGlzLl9zYXZlU3RhdGUoZ29sZGVuTGF5b3V0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NhdmVTdGF0ZShnb2xkZW5MYXlvdXQ6IEdvbGRlbkxheW91dCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0YXRlU3RvcmUgJiYgZ29sZGVuTGF5b3V0LmlzSW5pdGlhbGlzZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc3RhdGVTdG9yZS53cml0ZVN0YXRlKGdvbGRlbkxheW91dC50b0NvbmZpZygpKTtcbiAgICAgIH0gY2F0Y2goZXgpIHtcbiAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2RlZXBzdHJlYW1JTy9nb2xkZW4tbGF5b3V0L2lzc3Vlcy8xOTJcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0U3RhdGUoKTogUHJvbWlzZTxhbnk+e1xuICAgIGlmICh0aGlzLnN0YXRlU3RvcmUpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlU3RvcmUubG9hZFN0YXRlKCkuY2F0Y2goKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdExheW91dDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5jb25maWcuZGVmYXVsdExheW91dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVnaXN0ZXJlZENvbXBvbmVudHMoKTogQ29tcG9uZW50Q29uZmlndXJhdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuY29tcG9uZW50cztcbiAgfVxuXG4gIHB1YmxpYyBnZXRSZWdpc3RlcmVkQ29tcG9uZW50KG5hbWU6IHN0cmluZyk6IENvbXBvbmVudENvbmZpZ3VyYXRpb24ge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmNvbmZpZy5jb21wb25lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jb25maWcuY29tcG9uZW50c1tpbmRleF07XG4gICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudE5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgY2hpbGRPZlJvb3QoKTogR29sZGVuTGF5b3V0LkNvbnRlbnRJdGVtIHtcbiAgICBpZiAodGhpcy5fbGF5b3V0ID09IG51bGwgfHwgdGhpcy5fbGF5b3V0LnJvb3QgPT0gbnVsbCB8fCB0aGlzLl9sYXlvdXQucm9vdC5jb250ZW50SXRlbXMgPT0gbnVsbCB8fCB0aGlzLl9sYXlvdXQucm9vdC5jb250ZW50SXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBjaGlsZCBpbiByb290IFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2xheW91dC5yb290LmNvbnRlbnRJdGVtc1swXTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdGFjayhwYXJlbnQ6IEdvbGRlbkxheW91dC5Db250ZW50SXRlbSwgb3B0PzogR29sZGVuTGF5b3V0Lkl0ZW1Db25maWcpOiBHb2xkZW5MYXlvdXQuQ29udGVudEl0ZW0ge1xuICAgIFxuICAgIGlmIChwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGFkZCBzdGFjayB0byBudWxsIGl0ZW1cIik7XG4gICAgfVxuXG4gICAgaWYgKG9wdCAhPSBudWxsICYmIG9wdC5pZCAhPSBudWxsICYmIHBhcmVudC5nZXRJdGVtc0J5SWQob3B0LmlkKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRoZXJlIGFscmVhZHkgZXhpc3RzIGEgaXRlbSB3aXRoIHNhbWUgaWQ6ICR7b3B0LmlkfSBpbiBwYXJlbnQhYCk7XG4gICAgfVxuICAgIFxuICAgIC8vIGNyZWF0ZSBzdGFjayBpdGVtXG4gICAgY29uc3Qgc3RhY2sgPSB0aGlzLl9sYXlvdXQuY3JlYXRlQ29udGVudEl0ZW0oT2JqZWN0LmFzc2lnbih7dHlwZTogJ3N0YWNrJ30sIG9wdCBhcyBhbnkpKSBhcyBhbnk7XG5cbiAgICBwYXJlbnQuYWRkQ2hpbGQoc3RhY2spO1xuICAgIHJldHVybiBzdGFjaztcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21wb25lbnQocGFyZW50OiBHb2xkZW5MYXlvdXQuQ29udGVudEl0ZW0sIGNvbXA6IENvbXBvbmVudENvbmZpZ3VyYXRpb24sIG9wdD86IEdvbGRlbkxheW91dC5JdGVtQ29uZmlnKSA6IEdvbGRlbkxheW91dC5Db250ZW50SXRlbSB7XG4gICAgXG4gICAgaWYgKHBhcmVudCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW5ub3QgYWRkIGNvbXBvbmVudCB0byBudWxsIGl0ZW1cIik7XG4gICAgfVxuXG4gICAgaWYgKG9wdCAhPSBudWxsICYmIG9wdC5pZCAhPSBudWxsICYmIHBhcmVudC5nZXRJdGVtc0J5SWQob3B0LmlkKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRoZXJlIGFscmVhZHkgZXhpc3RzIGEgaXRlbSB3aXRoIHNhbWUgaWQ6ICR7b3B0LmlkfSBpbiBwYXJlbnQhYCk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGNvbnRlbnQgaXRlbVxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLl9sYXlvdXQuY3JlYXRlQ29udGVudEl0ZW0oT2JqZWN0LmFzc2lnbih7dHlwZTogJ2NvbXBvbmVudCcsIGNvbXBvbmVudE5hbWU6IGNvbXAuY29tcG9uZW50TmFtZSB9LCBvcHQgYXMgYW55KSkgYXMgYW55O1xuXG4gICAgcGFyZW50LmFkZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBwdWJsaWMgY3VycmVudENvbmZpZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl9sYXlvdXQudG9Db25maWcoKSwgbnVsbCwgMilcbiAgfVxuXG4gIHB1YmxpYyBpc0NoaWxkV2luZG93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXdpbmRvdy5vcGVuZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0Um9vdFdpbmRvdygpOiBXaW5kb3cge1xuICAgIHJldHVybiB3aW5kb3cub3BlbmVyIHx8IHdpbmRvdztcbiAgfVxufVxuIl19