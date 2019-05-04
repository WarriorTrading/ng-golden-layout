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
var GoldenLayoutService = /** @class */ (function () {
    function GoldenLayoutService(config, stateStore) {
        this.config = config;
        this.stateStore = stateStore;
        this._layout = null;
    }
    /**
     * @param {?} goldenLayout
     * @param {?} componentInitCallbackFactory
     * @return {?}
     */
    GoldenLayoutService.prototype.initialize = /**
     * @param {?} goldenLayout
     * @param {?} componentInitCallbackFactory
     * @return {?}
     */
    function (goldenLayout, componentInitCallbackFactory) {
        var _this = this;
        this._layout = goldenLayout;
        this.config.components.forEach(function (componentConfig) {
            /** @type {?} */
            var componentInitCallback = componentInitCallbackFactory.createComponentInitCallback(componentConfig.component);
            goldenLayout.registerComponent(componentConfig.componentName, componentInitCallback);
        });
        if (this.stateStore) {
            ((/** @type {?} */ (((/** @type {?} */ (goldenLayout)))))).on('stateChanged', function () {
                _this._saveState(goldenLayout);
            });
        }
    };
    /**
     * @param {?} goldenLayout
     * @return {?}
     */
    GoldenLayoutService.prototype._saveState = /**
     * @param {?} goldenLayout
     * @return {?}
     */
    function (goldenLayout) {
        if (this.stateStore && goldenLayout.isInitialised) {
            try {
                this.stateStore.writeState(goldenLayout.toConfig());
            }
            catch (ex) {
                // Workaround for https://github.com/deepstreamIO/golden-layout/issues/192
            }
        }
    };
    /**
     * @return {?}
     */
    GoldenLayoutService.prototype.getState = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.stateStore) {
            return this.stateStore.loadState().catch(function () {
                return _this.config.defaultLayout;
            });
        }
        return Promise.resolve(this.config.defaultLayout);
    };
    /**
     * @return {?}
     */
    GoldenLayoutService.prototype.getRegisteredComponents = /**
     * @return {?}
     */
    function () {
        return this.config.components;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    GoldenLayoutService.prototype.getRegisteredComponent = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        for (var index = 0; index < this.config.components.length; index++) {
            /** @type {?} */
            var component = this.config.components[index];
            if (component.componentName === name) {
                return component;
            }
        }
        return null;
    };
    /**
     * @return {?}
     */
    GoldenLayoutService.prototype.childOfRoot = /**
     * @return {?}
     */
    function () {
        if (this._layout == null || this._layout.root == null || this._layout.root.contentItems == null || this._layout.root.contentItems.length === 0) {
            throw new Error("no child in root ");
        }
        return this._layout.root.contentItems[0];
    };
    /**
     * @param {?} parent
     * @param {?=} opt
     * @return {?}
     */
    GoldenLayoutService.prototype.addStack = /**
     * @param {?} parent
     * @param {?=} opt
     * @return {?}
     */
    function (parent, opt) {
        if (parent == null) {
            throw new Error("cannot add stack to null item");
        }
        if (opt != null && opt.id != null && parent.getItemsById(opt.id).length > 0) {
            throw new Error("there already exists a item with same id: " + opt.id + " in parent!");
        }
        // create stack item
        /** @type {?} */
        var stack = (/** @type {?} */ (this._layout.createContentItem(Object.assign({ type: 'stack' }, (/** @type {?} */ (opt))))));
        parent.addChild(stack);
        return stack;
    };
    /**
     * @param {?} parent
     * @param {?} comp
     * @param {?=} opt
     * @return {?}
     */
    GoldenLayoutService.prototype.addComponent = /**
     * @param {?} parent
     * @param {?} comp
     * @param {?=} opt
     * @return {?}
     */
    function (parent, comp, opt) {
        if (parent == null) {
            throw new Error("cannot add component to null item");
        }
        if (opt != null && opt.id != null && parent.getItemsById(opt.id).length > 0) {
            throw new Error("there already exists a item with same id: " + opt.id + " in parent!");
        }
        // create content item
        /** @type {?} */
        var content = (/** @type {?} */ (this._layout.createContentItem(Object.assign({ type: 'component', componentName: comp.componentName }, (/** @type {?} */ (opt))))));
        parent.addChild(content);
        return content;
    };
    /**
     * @return {?}
     */
    GoldenLayoutService.prototype.currentConfig = /**
     * @return {?}
     */
    function () {
        return JSON.stringify(this._layout.toConfig(), null, 2);
    };
    /**
     * @return {?}
     */
    GoldenLayoutService.prototype.isChildWindow = /**
     * @return {?}
     */
    function () {
        return !!window.opener;
    };
    /**
     * @return {?}
     */
    GoldenLayoutService.prototype.getRootWindow = /**
     * @return {?}
     */
    function () {
        return window.opener || window;
    };
    GoldenLayoutService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GoldenLayoutService.ctorParameters = function () { return [
        { type: GoldenLayoutConfiguration, decorators: [{ type: Inject, args: [GoldenLayoutConfiguration,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [GoldenLayoutStateStore,] }] }
    ]; };
    return GoldenLayoutService;
}());
export { GoldenLayoutService };
if (false) {
    /** @type {?} */
    GoldenLayoutService.prototype._layout;
    /** @type {?} */
    GoldenLayoutService.prototype.config;
    /** @type {?} */
    GoldenLayoutService.prototype.stateStore;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZGVuLWxheW91dC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdhcnJpb3J0cmFkaW5nL25nLWdvbGRlbi1sYXlvdXQvIiwic291cmNlcyI6WyJsaWIvZ29sZGVuLWxheW91dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBUSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbkUsT0FBTyxFQUFFLHlCQUF5QixFQUEwQixNQUFNLFVBQVUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQXNDLE1BQU0sU0FBUyxDQUFDOzs7OztBQUtyRiwyQ0FFQzs7OztBQUVELGtEQUVDOzs7Ozs7SUFEQyw4RkFBeUU7O0FBRzNFO0lBSUUsNkJBQStELE1BQWlDLEVBQ3ZCLFVBQXNCO1FBRGhDLFdBQU0sR0FBTixNQUFNLENBQTJCO1FBQ3ZCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFIdkYsWUFBTyxHQUFpQixJQUFJLENBQUM7SUFHNkQsQ0FBQzs7Ozs7O0lBRTVGLHdDQUFVOzs7OztJQUFqQixVQUFrQixZQUEwQixFQUFFLDRCQUEwRDtRQUF4RyxpQkFZQztRQVhDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLGVBQXVDOztnQkFDL0QscUJBQXFCLEdBQUcsNEJBQTRCLENBQUMsMkJBQTJCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztZQUNqSCxZQUFZLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZGLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLENBQUMsbUJBQTJCLENBQUMsbUJBQUssWUFBWSxFQUFBLENBQUMsRUFBQSxDQUFDLENBQUMsRUFBRSxDQUFDLGNB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U0FBQyx5QkFBeUI7Z0RBQ2hDLFFBQVEsWUFBSSxNQUFNLFNBQUMsc0JBQXNCOztJQXVHeEQsMEJBQUM7Q0FBQSxBQTVHRCxJQTRHQztTQTNHWSxtQkFBbUI7OztJQUM5QixzQ0FBcUM7O0lBRXpCLHFDQUFvRjs7SUFDcEYseUNBQW1GIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBUeXBlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgR29sZGVuTGF5b3V0IGZyb20gJ2dvbGRlbi1sYXlvdXQnO1xuaW1wb3J0IHsgR29sZGVuTGF5b3V0Q29uZmlndXJhdGlvbiwgQ29tcG9uZW50Q29uZmlndXJhdGlvbiB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IEdvbGRlbkxheW91dFN0YXRlU3RvcmUsIFN0YXRlU3RvcmUsIExvY2FsU3RvcmFnZVN0YXRlU3RvcmUgfSBmcm9tICcuL3N0YXRlJztcblxuLyoqXG4gKiBnb2xkZW4tbGF5b3V0IGNvbXBvbmVudCBpbml0aWFsaXphdGlvbiBjYWxsYmFjayB0eXBlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvbmVudEluaXRDYWxsYmFjayBleHRlbmRzIEZ1bmN0aW9uIHtcbiAgKGNvbnRhaW5lcjogR29sZGVuTGF5b3V0LkNvbnRhaW5lciwgY29tcG9uZW50U3RhdGU6IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50SW5pdENhbGxiYWNrRmFjdG9yeSB7XG4gIGNyZWF0ZUNvbXBvbmVudEluaXRDYWxsYmFjayhjb21wb25lbnQ6IFR5cGU8YW55Pik6IENvbXBvbmVudEluaXRDYWxsYmFjaztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdvbGRlbkxheW91dFNlcnZpY2Uge1xuICBwcml2YXRlIF9sYXlvdXQ6IEdvbGRlbkxheW91dCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChHb2xkZW5MYXlvdXRDb25maWd1cmF0aW9uKSBwdWJsaWMgcmVhZG9ubHkgY29uZmlnOiBHb2xkZW5MYXlvdXRDb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEdvbGRlbkxheW91dFN0YXRlU3RvcmUpIHByaXZhdGUgcmVhZG9ubHkgc3RhdGVTdG9yZTogU3RhdGVTdG9yZSkge31cblxuICBwdWJsaWMgaW5pdGlhbGl6ZShnb2xkZW5MYXlvdXQ6IEdvbGRlbkxheW91dCwgY29tcG9uZW50SW5pdENhbGxiYWNrRmFjdG9yeTogQ29tcG9uZW50SW5pdENhbGxiYWNrRmFjdG9yeSkge1xuICAgIHRoaXMuX2xheW91dCA9IGdvbGRlbkxheW91dDtcbiAgICB0aGlzLmNvbmZpZy5jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudENvbmZpZzogQ29tcG9uZW50Q29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgY29uc3QgY29tcG9uZW50SW5pdENhbGxiYWNrID0gY29tcG9uZW50SW5pdENhbGxiYWNrRmFjdG9yeS5jcmVhdGVDb21wb25lbnRJbml0Q2FsbGJhY2soY29tcG9uZW50Q29uZmlnLmNvbXBvbmVudCk7XG4gICAgICBnb2xkZW5MYXlvdXQucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50Q29uZmlnLmNvbXBvbmVudE5hbWUsIGNvbXBvbmVudEluaXRDYWxsYmFjayk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5zdGF0ZVN0b3JlKSB7XG4gICAgICAoPEdvbGRlbkxheW91dC5FdmVudEVtaXR0ZXI+KDxhbnk+Z29sZGVuTGF5b3V0KSkub24oJ3N0YXRlQ2hhbmdlZCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5fc2F2ZVN0YXRlKGdvbGRlbkxheW91dCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zYXZlU3RhdGUoZ29sZGVuTGF5b3V0OiBHb2xkZW5MYXlvdXQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdGF0ZVN0b3JlICYmIGdvbGRlbkxheW91dC5pc0luaXRpYWxpc2VkKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnN0YXRlU3RvcmUud3JpdGVTdGF0ZShnb2xkZW5MYXlvdXQudG9Db25maWcoKSk7XG4gICAgICB9IGNhdGNoKGV4KSB7XG4gICAgICAgIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWVwc3RyZWFtSU8vZ29sZGVuLWxheW91dC9pc3N1ZXMvMTkyXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldFN0YXRlKCk6IFByb21pc2U8YW55PntcbiAgICBpZiAodGhpcy5zdGF0ZVN0b3JlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZVN0b3JlLmxvYWRTdGF0ZSgpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmRlZmF1bHRMYXlvdXQ7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuY29uZmlnLmRlZmF1bHRMYXlvdXQpO1xuICB9XG5cbiAgcHVibGljIGdldFJlZ2lzdGVyZWRDb21wb25lbnRzKCk6IENvbXBvbmVudENvbmZpZ3VyYXRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmNvbXBvbmVudHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVnaXN0ZXJlZENvbXBvbmVudChuYW1lOiBzdHJpbmcpOiBDb21wb25lbnRDb25maWd1cmF0aW9uIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5jb25maWcuY29tcG9uZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuY29uZmlnLmNvbXBvbmVudHNbaW5kZXhdO1xuICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnROYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGNoaWxkT2ZSb290KCk6IEdvbGRlbkxheW91dC5Db250ZW50SXRlbSB7XG4gICAgaWYgKHRoaXMuX2xheW91dCA9PSBudWxsIHx8IHRoaXMuX2xheW91dC5yb290ID09IG51bGwgfHwgdGhpcy5fbGF5b3V0LnJvb3QuY29udGVudEl0ZW1zID09IG51bGwgfHwgdGhpcy5fbGF5b3V0LnJvb3QuY29udGVudEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gY2hpbGQgaW4gcm9vdCBcIik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9sYXlvdXQucm9vdC5jb250ZW50SXRlbXNbMF07XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhY2socGFyZW50OiBHb2xkZW5MYXlvdXQuQ29udGVudEl0ZW0sIG9wdD86IEdvbGRlbkxheW91dC5JdGVtQ29uZmlnKTogR29sZGVuTGF5b3V0LkNvbnRlbnRJdGVtIHtcbiAgICBcbiAgICBpZiAocGFyZW50ID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBhZGQgc3RhY2sgdG8gbnVsbCBpdGVtXCIpO1xuICAgIH1cblxuICAgIGlmIChvcHQgIT0gbnVsbCAmJiBvcHQuaWQgIT0gbnVsbCAmJiBwYXJlbnQuZ2V0SXRlbXNCeUlkKG9wdC5pZCkubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0aGVyZSBhbHJlYWR5IGV4aXN0cyBhIGl0ZW0gd2l0aCBzYW1lIGlkOiAke29wdC5pZH0gaW4gcGFyZW50IWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBjcmVhdGUgc3RhY2sgaXRlbVxuICAgIGNvbnN0IHN0YWNrID0gdGhpcy5fbGF5b3V0LmNyZWF0ZUNvbnRlbnRJdGVtKE9iamVjdC5hc3NpZ24oe3R5cGU6ICdzdGFjayd9LCBvcHQgYXMgYW55KSkgYXMgYW55O1xuXG4gICAgcGFyZW50LmFkZENoaWxkKHN0YWNrKTtcbiAgICByZXR1cm4gc3RhY2s7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcG9uZW50KHBhcmVudDogR29sZGVuTGF5b3V0LkNvbnRlbnRJdGVtLCBjb21wOiBDb21wb25lbnRDb25maWd1cmF0aW9uLCBvcHQ/OiBHb2xkZW5MYXlvdXQuSXRlbUNvbmZpZykgOiBHb2xkZW5MYXlvdXQuQ29udGVudEl0ZW0ge1xuICAgIFxuICAgIGlmIChwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGFkZCBjb21wb25lbnQgdG8gbnVsbCBpdGVtXCIpO1xuICAgIH1cblxuICAgIGlmIChvcHQgIT0gbnVsbCAmJiBvcHQuaWQgIT0gbnVsbCAmJiBwYXJlbnQuZ2V0SXRlbXNCeUlkKG9wdC5pZCkubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0aGVyZSBhbHJlYWR5IGV4aXN0cyBhIGl0ZW0gd2l0aCBzYW1lIGlkOiAke29wdC5pZH0gaW4gcGFyZW50IWApO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBjb250ZW50IGl0ZW1cbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5fbGF5b3V0LmNyZWF0ZUNvbnRlbnRJdGVtKE9iamVjdC5hc3NpZ24oe3R5cGU6ICdjb21wb25lbnQnLCBjb21wb25lbnROYW1lOiBjb21wLmNvbXBvbmVudE5hbWUgfSwgb3B0IGFzIGFueSkpIGFzIGFueTtcblxuICAgIHBhcmVudC5hZGRDaGlsZChjb250ZW50KTtcblxuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgcHVibGljIGN1cnJlbnRDb25maWcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fbGF5b3V0LnRvQ29uZmlnKCksIG51bGwsIDIpXG4gIH1cblxuICBwdWJsaWMgaXNDaGlsZFdpbmRvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF3aW5kb3cub3BlbmVyO1xuICB9XG5cbiAgcHVibGljIGdldFJvb3RXaW5kb3coKTogV2luZG93IHtcbiAgICByZXR1cm4gd2luZG93Lm9wZW5lciB8fCB3aW5kb3c7XG4gIH1cbn1cbiJdfQ==