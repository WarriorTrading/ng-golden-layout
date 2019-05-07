/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    GoldenLayoutService.prototype.isInited = /**
     * @return {?}
     */
    function () {
        return this._layout != null && this._layout.isInitialised;
    };
    /**
     * @param {?} timeoutInSeconds
     * @return {?}
     */
    GoldenLayoutService.prototype.waitForInited = /**
     * @param {?} timeoutInSeconds
     * @return {?}
     */
    function (timeoutInSeconds) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nms, times, index;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nms = 10;
                        times = Math.floor(timeoutInSeconds * 1000 / nms);
                        times = (times < 1) ? 1 : times;
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < times)) return [3 /*break*/, 4];
                        if (this.isInited()) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this.delay(nms)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * @param {?} ms
     * @return {?}
     */
    GoldenLayoutService.prototype.delay = /**
     * @param {?} ms
     * @return {?}
     */
    function (ms) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
        if (this._layout == null || this._layout.root == null) {
            throw new Error("no root in layout");
        }
        if (this._layout.root.contentItems == null || this._layout.root.contentItems.length === 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZGVuLWxheW91dC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdhcnJpb3J0cmFkaW5nL25nLWdvbGRlbi1sYXlvdXQvIiwic291cmNlcyI6WyJsaWIvZ29sZGVuLWxheW91dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQVEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25FLE9BQU8sRUFBRSx5QkFBeUIsRUFBMEIsTUFBTSxVQUFVLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFzQyxNQUFNLFNBQVMsQ0FBQzs7Ozs7QUFNckYsMkNBRUM7Ozs7QUFFRCxrREFFQzs7Ozs7O0lBREMsOEZBQXlFOztBQUczRTtJQUlFLDZCQUErRCxNQUFpQyxFQUN2QixVQUFzQjtRQURoQyxXQUFNLEdBQU4sTUFBTSxDQUEyQjtRQUN2QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSHZGLFlBQU8sR0FBaUIsSUFBSSxDQUFDO0lBRzZELENBQUM7Ozs7OztJQUU1Rix3Q0FBVTs7Ozs7SUFBakIsVUFBa0IsWUFBMEIsRUFBRSw0QkFBMEQ7UUFBeEcsaUJBWUM7UUFYQyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxlQUF1Qzs7Z0JBQy9ELHFCQUFxQixHQUFHLDRCQUE0QixDQUFDLDJCQUEyQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7WUFDakgsWUFBWSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUN2RixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixDQUFDLG1CQUEyQixDQUFDLG1CQUFLLFlBQVksRUFBQSxDQUFDLEVBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxj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QixxQ0FBb0Y7O0lBQ3BGLHlDQUFtRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgVHlwZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBHb2xkZW5MYXlvdXQgZnJvbSAnZ29sZGVuLWxheW91dCc7XG5pbXBvcnQgeyBHb2xkZW5MYXlvdXRDb25maWd1cmF0aW9uLCBDb21wb25lbnRDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgR29sZGVuTGF5b3V0U3RhdGVTdG9yZSwgU3RhdGVTdG9yZSwgTG9jYWxTdG9yYWdlU3RhdGVTdG9yZSB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgc2V0SW50ZXJ2YWwgfSBmcm9tICd0aW1lcnMnO1xuXG4vKipcbiAqIGdvbGRlbi1sYXlvdXQgY29tcG9uZW50IGluaXRpYWxpemF0aW9uIGNhbGxiYWNrIHR5cGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50SW5pdENhbGxiYWNrIGV4dGVuZHMgRnVuY3Rpb24ge1xuICAoY29udGFpbmVyOiBHb2xkZW5MYXlvdXQuQ29udGFpbmVyLCBjb21wb25lbnRTdGF0ZTogYW55KTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnRJbml0Q2FsbGJhY2tGYWN0b3J5IHtcbiAgY3JlYXRlQ29tcG9uZW50SW5pdENhbGxiYWNrKGNvbXBvbmVudDogVHlwZTxhbnk+KTogQ29tcG9uZW50SW5pdENhbGxiYWNrO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29sZGVuTGF5b3V0U2VydmljZSB7XG4gIHByaXZhdGUgX2xheW91dDogR29sZGVuTGF5b3V0ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEdvbGRlbkxheW91dENvbmZpZ3VyYXRpb24pIHB1YmxpYyByZWFkb25seSBjb25maWc6IEdvbGRlbkxheW91dENvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoR29sZGVuTGF5b3V0U3RhdGVTdG9yZSkgcHJpdmF0ZSByZWFkb25seSBzdGF0ZVN0b3JlOiBTdGF0ZVN0b3JlKSB7fVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKGdvbGRlbkxheW91dDogR29sZGVuTGF5b3V0LCBjb21wb25lbnRJbml0Q2FsbGJhY2tGYWN0b3J5OiBDb21wb25lbnRJbml0Q2FsbGJhY2tGYWN0b3J5KSB7XG4gICAgdGhpcy5fbGF5b3V0ID0gZ29sZGVuTGF5b3V0O1xuICAgIHRoaXMuY29uZmlnLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50Q29uZmlnOiBDb21wb25lbnRDb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICBjb25zdCBjb21wb25lbnRJbml0Q2FsbGJhY2sgPSBjb21wb25lbnRJbml0Q2FsbGJhY2tGYWN0b3J5LmNyZWF0ZUNvbXBvbmVudEluaXRDYWxsYmFjayhjb21wb25lbnRDb25maWcuY29tcG9uZW50KTtcbiAgICAgIGdvbGRlbkxheW91dC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnRDb25maWcuY29tcG9uZW50TmFtZSwgY29tcG9uZW50SW5pdENhbGxiYWNrKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnN0YXRlU3RvcmUpIHtcbiAgICAgICg8R29sZGVuTGF5b3V0LkV2ZW50RW1pdHRlcj4oPGFueT5nb2xkZW5MYXlvdXQpKS5vbignc3RhdGVDaGFuZ2VkJywgKCkgPT4ge1xuICAgICAgICB0aGlzLl9zYXZlU3RhdGUoZ29sZGVuTGF5b3V0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NhdmVTdGF0ZShnb2xkZW5MYXlvdXQ6IEdvbGRlbkxheW91dCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0YXRlU3RvcmUgJiYgZ29sZGVuTGF5b3V0LmlzSW5pdGlhbGlzZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc3RhdGVTdG9yZS53cml0ZVN0YXRlKGdvbGRlbkxheW91dC50b0NvbmZpZygpKTtcbiAgICAgIH0gY2F0Y2goZXgpIHtcbiAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2RlZXBzdHJlYW1JTy9nb2xkZW4tbGF5b3V0L2lzc3Vlcy8xOTJcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0U3RhdGUoKTogUHJvbWlzZTxhbnk+e1xuICAgIGlmICh0aGlzLnN0YXRlU3RvcmUpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlU3RvcmUubG9hZFN0YXRlKCkuY2F0Y2goKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdExheW91dDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5jb25maWcuZGVmYXVsdExheW91dCk7XG4gIH1cblxuICBwdWJsaWMgaXNJbml0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xheW91dCAhPSBudWxsICYmIHRoaXMuX2xheW91dC5pc0luaXRpYWxpc2VkO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHdhaXRGb3JJbml0ZWQodGltZW91dEluU2Vjb25kczogbnVtYmVyKSB7XG4gICAgbGV0IG5tcyA9IDEwO1xuICAgIGxldCB0aW1lcyA9IE1hdGguZmxvb3IodGltZW91dEluU2Vjb25kcyAqIDEwMDAgLyBubXMpO1xuICAgIHRpbWVzID0gKHRpbWVzIDwgMSkgPyAxIDogdGltZXM7XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGltZXM7IGluZGV4KyspIHtcbiAgICAgIGlmICh0aGlzLmlzSW5pdGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuZGVsYXkobm1zKVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZGVsYXkobXM6IG51bWJlcikge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVnaXN0ZXJlZENvbXBvbmVudHMoKTogQ29tcG9uZW50Q29uZmlndXJhdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuY29tcG9uZW50cztcbiAgfVxuXG4gIHB1YmxpYyBnZXRSZWdpc3RlcmVkQ29tcG9uZW50KG5hbWU6IHN0cmluZyk6IENvbXBvbmVudENvbmZpZ3VyYXRpb24ge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmNvbmZpZy5jb21wb25lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jb25maWcuY29tcG9uZW50c1tpbmRleF07XG4gICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudE5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgY2hpbGRPZlJvb3QoKTogR29sZGVuTGF5b3V0LkNvbnRlbnRJdGVtIHtcbiAgICBpZiAodGhpcy5fbGF5b3V0ID09IG51bGwgfHwgdGhpcy5fbGF5b3V0LnJvb3QgPT0gbnVsbCApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIHJvb3QgaW4gbGF5b3V0XCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbGF5b3V0LnJvb3QuY29udGVudEl0ZW1zID09IG51bGwgfHwgdGhpcy5fbGF5b3V0LnJvb3QuY29udGVudEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gY2hpbGQgaW4gcm9vdCBcIik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9sYXlvdXQucm9vdC5jb250ZW50SXRlbXNbMF07XG4gIH1cblxuICBwdWJsaWMgYWRkU3RhY2socGFyZW50OiBHb2xkZW5MYXlvdXQuQ29udGVudEl0ZW0sIG9wdD86IEdvbGRlbkxheW91dC5JdGVtQ29uZmlnKTogR29sZGVuTGF5b3V0LkNvbnRlbnRJdGVtIHtcbiAgICBcbiAgICBpZiAocGFyZW50ID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBhZGQgc3RhY2sgdG8gbnVsbCBpdGVtXCIpO1xuICAgIH1cblxuICAgIGlmIChvcHQgIT0gbnVsbCAmJiBvcHQuaWQgIT0gbnVsbCAmJiBwYXJlbnQuZ2V0SXRlbXNCeUlkKG9wdC5pZCkubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0aGVyZSBhbHJlYWR5IGV4aXN0cyBhIGl0ZW0gd2l0aCBzYW1lIGlkOiAke29wdC5pZH0gaW4gcGFyZW50IWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBjcmVhdGUgc3RhY2sgaXRlbVxuICAgIGNvbnN0IHN0YWNrID0gdGhpcy5fbGF5b3V0LmNyZWF0ZUNvbnRlbnRJdGVtKE9iamVjdC5hc3NpZ24oe3R5cGU6ICdzdGFjayd9LCBvcHQgYXMgYW55KSkgYXMgYW55O1xuXG4gICAgcGFyZW50LmFkZENoaWxkKHN0YWNrKTtcbiAgICByZXR1cm4gc3RhY2s7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29tcG9uZW50KHBhcmVudDogR29sZGVuTGF5b3V0LkNvbnRlbnRJdGVtLCBjb21wOiBDb21wb25lbnRDb25maWd1cmF0aW9uLCBvcHQ/OiBHb2xkZW5MYXlvdXQuSXRlbUNvbmZpZykgOiBHb2xkZW5MYXlvdXQuQ29udGVudEl0ZW0ge1xuICAgIFxuICAgIGlmIChwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGFkZCBjb21wb25lbnQgdG8gbnVsbCBpdGVtXCIpO1xuICAgIH1cblxuICAgIGlmIChvcHQgIT0gbnVsbCAmJiBvcHQuaWQgIT0gbnVsbCAmJiBwYXJlbnQuZ2V0SXRlbXNCeUlkKG9wdC5pZCkubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0aGVyZSBhbHJlYWR5IGV4aXN0cyBhIGl0ZW0gd2l0aCBzYW1lIGlkOiAke29wdC5pZH0gaW4gcGFyZW50IWApO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBjb250ZW50IGl0ZW1cbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5fbGF5b3V0LmNyZWF0ZUNvbnRlbnRJdGVtKE9iamVjdC5hc3NpZ24oe3R5cGU6ICdjb21wb25lbnQnLCBjb21wb25lbnROYW1lOiBjb21wLmNvbXBvbmVudE5hbWUgfSwgb3B0IGFzIGFueSkpIGFzIGFueTtcblxuICAgIHBhcmVudC5hZGRDaGlsZChjb250ZW50KTtcblxuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgcHVibGljIGN1cnJlbnRDb25maWcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fbGF5b3V0LnRvQ29uZmlnKCksIG51bGwsIDIpXG4gIH1cblxuICBwdWJsaWMgaXNDaGlsZFdpbmRvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF3aW5kb3cub3BlbmVyO1xuICB9XG5cbiAgcHVibGljIGdldFJvb3RXaW5kb3coKTogV2luZG93IHtcbiAgICByZXR1cm4gd2luZG93Lm9wZW5lciB8fCB3aW5kb3c7XG4gIH1cbn1cbiJdfQ==