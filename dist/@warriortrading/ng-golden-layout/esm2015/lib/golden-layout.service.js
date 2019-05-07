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
    isInited() {
        return this._layout != null && this._layout.isInitialised;
    }
    /**
     * @param {?} timeoutInSeconds
     * @return {?}
     */
    waitForInited(timeoutInSeconds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let nms = 10;
            /** @type {?} */
            let times = Math.floor(timeoutInSeconds * 1000 / nms);
            times = (times < 1) ? 1 : times;
            for (let index = 0; index < times; index++) {
                if (this.isInited()) {
                    return true;
                }
                yield this.delay(nms);
            }
            return false;
        });
    }
    /**
     * @param {?} ms
     * @return {?}
     */
    delay(ms) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, ms));
        });
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
        if (this._layout == null || this._layout.root == null) {
            throw new Error("no root in layout");
        }
        if (this._layout.root.contentItems == null || this._layout.root.contentItems.length === 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZGVuLWxheW91dC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdhcnJpb3J0cmFkaW5nL25nLWdvbGRlbi1sYXlvdXQvIiwic291cmNlcyI6WyJsaWIvZ29sZGVuLWxheW91dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQVEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25FLE9BQU8sRUFBRSx5QkFBeUIsRUFBMEIsTUFBTSxVQUFVLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFzQyxNQUFNLFNBQVMsQ0FBQzs7Ozs7QUFNckYsMkNBRUM7Ozs7QUFFRCxrREFFQzs7Ozs7O0lBREMsOEZBQXlFOztBQUkzRSxNQUFNLE9BQU8sbUJBQW1COzs7OztJQUc5QixZQUErRCxNQUFpQyxFQUN2QixVQUFzQjtRQURoQyxXQUFNLEdBQU4sTUFBTSxDQUEyQjtRQUN2QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSHZGLFlBQU8sR0FBaUIsSUFBSSxDQUFDO0lBRzZELENBQUM7Ozs7OztJQUU1RixVQUFVLENBQUMsWUFBMEIsRUFBRSw0QkFBMEQ7UUFDdEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBdUMsRUFBRSxFQUFFOztrQkFDbkUscUJBQXFCLEdBQUcsNEJBQTRCLENBQUMsMkJBQTJCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztZQUNqSCxZQUFZLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZGLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLENBQUMsbUJBQTJCLENBQUMsbUJBQUssWUFBWSxFQUFBLENBQUMsRUFBQSxDQUFDLENBQUMsRUFB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QyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLEdBQUcsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ25GOzs7Y0FHSyxPQUFPLEdBQUcsbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLG1CQUFBLEdBQUcsRUFBTyxDQUFDLENBQUMsRUFBTztRQUV6SSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFTSxhQUFhO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN6RCxDQUFDOzs7O0lBRU0sYUFBYTtRQUNsQixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFTSxhQUFhO1FBQ2xCLE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7SUFDakMsQ0FBQzs7O1lBdElGLFVBQVU7Ozs7WUFmRix5QkFBeUIsdUJBbUJuQixNQUFNLFNBQUMseUJBQXlCOzRDQUNoQyxRQUFRLFlBQUksTUFBTSxTQUFDLHNCQUFzQjs7OztJQUh0RCxzQ0FBcUM7O0lBRXpCLHFDQUFvRjs7SUFDcEYseUNBQW1GIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBUeXBlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIEdvbGRlbkxheW91dCBmcm9tICdnb2xkZW4tbGF5b3V0JztcbmltcG9ydCB7IEdvbGRlbkxheW91dENvbmZpZ3VyYXRpb24sIENvbXBvbmVudENvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBHb2xkZW5MYXlvdXRTdGF0ZVN0b3JlLCBTdGF0ZVN0b3JlLCBMb2NhbFN0b3JhZ2VTdGF0ZVN0b3JlIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBzZXRJbnRlcnZhbCB9IGZyb20gJ3RpbWVycyc7XG5cbi8qKlxuICogZ29sZGVuLWxheW91dCBjb21wb25lbnQgaW5pdGlhbGl6YXRpb24gY2FsbGJhY2sgdHlwZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnRJbml0Q2FsbGJhY2sgZXh0ZW5kcyBGdW5jdGlvbiB7XG4gIChjb250YWluZXI6IEdvbGRlbkxheW91dC5Db250YWluZXIsIGNvbXBvbmVudFN0YXRlOiBhbnkpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvbmVudEluaXRDYWxsYmFja0ZhY3Rvcnkge1xuICBjcmVhdGVDb21wb25lbnRJbml0Q2FsbGJhY2soY29tcG9uZW50OiBUeXBlPGFueT4pOiBDb21wb25lbnRJbml0Q2FsbGJhY2s7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHb2xkZW5MYXlvdXRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfbGF5b3V0OiBHb2xkZW5MYXlvdXQgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoR29sZGVuTGF5b3V0Q29uZmlndXJhdGlvbikgcHVibGljIHJlYWRvbmx5IGNvbmZpZzogR29sZGVuTGF5b3V0Q29uZmlndXJhdGlvbixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChHb2xkZW5MYXlvdXRTdGF0ZVN0b3JlKSBwcml2YXRlIHJlYWRvbmx5IHN0YXRlU3RvcmU6IFN0YXRlU3RvcmUpIHt9XG5cbiAgcHVibGljIGluaXRpYWxpemUoZ29sZGVuTGF5b3V0OiBHb2xkZW5MYXlvdXQsIGNvbXBvbmVudEluaXRDYWxsYmFja0ZhY3Rvcnk6IENvbXBvbmVudEluaXRDYWxsYmFja0ZhY3RvcnkpIHtcbiAgICB0aGlzLl9sYXlvdXQgPSBnb2xkZW5MYXlvdXQ7XG4gICAgdGhpcy5jb25maWcuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnRDb25maWc6IENvbXBvbmVudENvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEluaXRDYWxsYmFjayA9IGNvbXBvbmVudEluaXRDYWxsYmFja0ZhY3RvcnkuY3JlYXRlQ29tcG9uZW50SW5pdENhbGxiYWNrKGNvbXBvbmVudENvbmZpZy5jb21wb25lbnQpO1xuICAgICAgZ29sZGVuTGF5b3V0LnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudENvbmZpZy5jb21wb25lbnROYW1lLCBjb21wb25lbnRJbml0Q2FsbGJhY2spO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuc3RhdGVTdG9yZSkge1xuICAgICAgKDxHb2xkZW5MYXlvdXQuRXZlbnRFbWl0dGVyPig8YW55PmdvbGRlbkxheW91dCkpLm9uKCdzdGF0ZUNoYW5nZWQnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NhdmVTdGF0ZShnb2xkZW5MYXlvdXQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2F2ZVN0YXRlKGdvbGRlbkxheW91dDogR29sZGVuTGF5b3V0KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RhdGVTdG9yZSAmJiBnb2xkZW5MYXlvdXQuaXNJbml0aWFsaXNlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5zdGF0ZVN0b3JlLndyaXRlU3RhdGUoZ29sZGVuTGF5b3V0LnRvQ29uZmlnKCkpO1xuICAgICAgfSBjYXRjaChleCkge1xuICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vZGVlcHN0cmVhbUlPL2dvbGRlbi1sYXlvdXQvaXNzdWVzLzE5MlxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRTdGF0ZSgpOiBQcm9taXNlPGFueT57XG4gICAgaWYgKHRoaXMuc3RhdGVTdG9yZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGVTdG9yZS5sb2FkU3RhdGUoKS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5kZWZhdWx0TGF5b3V0O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmNvbmZpZy5kZWZhdWx0TGF5b3V0KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0luaXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbGF5b3V0ICE9IG51bGwgJiYgdGhpcy5fbGF5b3V0LmlzSW5pdGlhbGlzZWQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgd2FpdEZvckluaXRlZCh0aW1lb3V0SW5TZWNvbmRzOiBudW1iZXIpIHtcbiAgICBsZXQgbm1zID0gMTA7XG4gICAgbGV0IHRpbWVzID0gTWF0aC5mbG9vcih0aW1lb3V0SW5TZWNvbmRzICogMTAwMCAvIG5tcyk7XG4gICAgdGltZXMgPSAodGltZXMgPCAxKSA/IDEgOiB0aW1lcztcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aW1lczsgaW5kZXgrKykge1xuICAgICAgaWYgKHRoaXMuaXNJbml0ZWQoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5kZWxheShubXMpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkZWxheShtczogbnVtYmVyKSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoIHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSZWdpc3RlcmVkQ29tcG9uZW50cygpOiBDb21wb25lbnRDb25maWd1cmF0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb21wb25lbnRzO1xuICB9XG5cbiAgcHVibGljIGdldFJlZ2lzdGVyZWRDb21wb25lbnQobmFtZTogc3RyaW5nKTogQ29tcG9uZW50Q29uZmlndXJhdGlvbiB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuY29uZmlnLmNvbXBvbmVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNvbmZpZy5jb21wb25lbnRzW2luZGV4XTtcbiAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBjaGlsZE9mUm9vdCgpOiBHb2xkZW5MYXlvdXQuQ29udGVudEl0ZW0ge1xuICAgIGlmICh0aGlzLl9sYXlvdXQgPT0gbnVsbCB8fCB0aGlzLl9sYXlvdXQucm9vdCA9PSBudWxsICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gcm9vdCBpbiBsYXlvdXRcIik7XG4gICAgfVxuICAgIGlmICh0aGlzLl9sYXlvdXQucm9vdC5jb250ZW50SXRlbXMgPT0gbnVsbCB8fCB0aGlzLl9sYXlvdXQucm9vdC5jb250ZW50SXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBjaGlsZCBpbiByb290IFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2xheW91dC5yb290LmNvbnRlbnRJdGVtc1swXTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRTdGFjayhwYXJlbnQ6IEdvbGRlbkxheW91dC5Db250ZW50SXRlbSwgb3B0PzogR29sZGVuTGF5b3V0Lkl0ZW1Db25maWcpOiBHb2xkZW5MYXlvdXQuQ29udGVudEl0ZW0ge1xuICAgIFxuICAgIGlmIChwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGFkZCBzdGFjayB0byBudWxsIGl0ZW1cIik7XG4gICAgfVxuXG4gICAgaWYgKG9wdCAhPSBudWxsICYmIG9wdC5pZCAhPSBudWxsICYmIHBhcmVudC5nZXRJdGVtc0J5SWQob3B0LmlkKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRoZXJlIGFscmVhZHkgZXhpc3RzIGEgaXRlbSB3aXRoIHNhbWUgaWQ6ICR7b3B0LmlkfSBpbiBwYXJlbnQhYCk7XG4gICAgfVxuICAgIFxuICAgIC8vIGNyZWF0ZSBzdGFjayBpdGVtXG4gICAgY29uc3Qgc3RhY2sgPSB0aGlzLl9sYXlvdXQuY3JlYXRlQ29udGVudEl0ZW0oT2JqZWN0LmFzc2lnbih7dHlwZTogJ3N0YWNrJ30sIG9wdCBhcyBhbnkpKSBhcyBhbnk7XG5cbiAgICBwYXJlbnQuYWRkQ2hpbGQoc3RhY2spO1xuICAgIHJldHVybiBzdGFjaztcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb21wb25lbnQocGFyZW50OiBHb2xkZW5MYXlvdXQuQ29udGVudEl0ZW0sIGNvbXA6IENvbXBvbmVudENvbmZpZ3VyYXRpb24sIG9wdD86IEdvbGRlbkxheW91dC5JdGVtQ29uZmlnKSA6IEdvbGRlbkxheW91dC5Db250ZW50SXRlbSB7XG4gICAgXG4gICAgaWYgKHBhcmVudCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW5ub3QgYWRkIGNvbXBvbmVudCB0byBudWxsIGl0ZW1cIik7XG4gICAgfVxuXG4gICAgaWYgKG9wdCAhPSBudWxsICYmIG9wdC5pZCAhPSBudWxsICYmIHBhcmVudC5nZXRJdGVtc0J5SWQob3B0LmlkKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRoZXJlIGFscmVhZHkgZXhpc3RzIGEgaXRlbSB3aXRoIHNhbWUgaWQ6ICR7b3B0LmlkfSBpbiBwYXJlbnQhYCk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGNvbnRlbnQgaXRlbVxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLl9sYXlvdXQuY3JlYXRlQ29udGVudEl0ZW0oT2JqZWN0LmFzc2lnbih7dHlwZTogJ2NvbXBvbmVudCcsIGNvbXBvbmVudE5hbWU6IGNvbXAuY29tcG9uZW50TmFtZSB9LCBvcHQgYXMgYW55KSkgYXMgYW55O1xuXG4gICAgcGFyZW50LmFkZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBwdWJsaWMgY3VycmVudENvbmZpZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl9sYXlvdXQudG9Db25maWcoKSwgbnVsbCwgMilcbiAgfVxuXG4gIHB1YmxpYyBpc0NoaWxkV2luZG93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXdpbmRvdy5vcGVuZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0Um9vdFdpbmRvdygpOiBXaW5kb3cge1xuICAgIHJldHVybiB3aW5kb3cub3BlbmVyIHx8IHdpbmRvdztcbiAgfVxufVxuIl19