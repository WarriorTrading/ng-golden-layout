/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/** @type {?} */
export var GoldenLayoutStateStore = new InjectionToken('GoldenLayoutStateStore');
/**
 * @record
 */
export function StateStore() { }
if (false) {
    /**
     * @param {?} state
     * @return {?}
     */
    StateStore.prototype.writeState = function (state) { };
    /**
     * @return {?}
     */
    StateStore.prototype.loadState = function () { };
}
/** @type {?} */
export var DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY = '$ng-golden-layout-state';
var LocalStorageStateStore = /** @class */ (function () {
    function LocalStorageStateStore(key) {
        this.key = key;
    }
    /**
     * @param {?} state
     * @return {?}
     */
    LocalStorageStateStore.prototype.writeState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        localStorage.setItem(this.key, JSON.stringify(state));
    };
    /**
     * @return {?}
     */
    LocalStorageStateStore.prototype.loadState = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var state = localStorage.getItem(this.key);
        return state
            ? Promise.resolve(JSON.parse(state))
            : Promise.reject("No state found using key: " + this.key);
    };
    return LocalStorageStateStore;
}());
export { LocalStorageStateStore };
if (false) {
    /** @type {?} */
    LocalStorageStateStore.prototype.key;
}
/**
 * @return {?}
 */
export function DEFAULT_LOCAL_STORAGE_STATE_STORE_FACTORY() {
    return new LocalStorageStateStore(DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY);
}
/** @type {?} */
export var DEFAULT_LOCAL_STORAGE_STATE_STORE = new LocalStorageStateStore(DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY);
/** @type {?} */
export var DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER = {
    provide: GoldenLayoutStateStore,
    useFactory: DEFAULT_LOCAL_STORAGE_STATE_STORE_FACTORY
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2FycmlvcnRyYWRpbmcvbmctZ29sZGVuLWxheW91dC8iLCJzb3VyY2VzIjpbImxpYi9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBWSxNQUFNLGVBQWUsQ0FBQzs7QUFFekQsTUFBTSxLQUFPLHNCQUFzQixHQUFHLElBQUksY0FBYyxDQUFDLHdCQUF3QixDQUFDOzs7O0FBRWxGLGdDQUlDOzs7Ozs7SUFIQyx1REFBNEI7Ozs7SUFFNUIsaURBQXlCOzs7QUFHM0IsTUFBTSxLQUFPLHFDQUFxQyxHQUFHLHlCQUF5QjtBQUU5RTtJQUNFLGdDQUE2QixHQUFXO1FBQVgsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUFHLENBQUM7Ozs7O0lBRXJDLDJDQUFVOzs7O0lBQWpCLFVBQWtCLEtBQVU7UUFDMUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7O0lBRU0sMENBQVM7OztJQUFoQjs7WUFDUSxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFFO1FBQzlDLE9BQU8sS0FBSztZQUNWLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsK0JBQTZCLElBQUksQ0FBQyxHQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQzs7OztJQVphLHFDQUE0Qjs7Ozs7QUFjMUMsTUFBTSxVQUFVLHlDQUF5QztJQUN2RCxPQUFPLElBQUksc0JBQXNCLENBQUMscUNBQXFDLENBQUMsQ0FBQztBQUMzRSxDQUFDOztBQUVELE1BQU0sS0FBTyxpQ0FBaUMsR0FBRyxJQUFJLHNCQUFzQixDQUFDLHFDQUFxQyxDQUFDOztBQUVsSCxNQUFNLEtBQU8sMENBQTBDLEdBQWE7SUFDbEUsT0FBTyxFQUFFLHNCQUFzQjtJQUMvQixVQUFVLEVBQUUseUNBQXlDO0NBQ3REIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBHb2xkZW5MYXlvdXRTdGF0ZVN0b3JlID0gbmV3IEluamVjdGlvblRva2VuKCdHb2xkZW5MYXlvdXRTdGF0ZVN0b3JlJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGVTdG9yZSB7XG4gIHdyaXRlU3RhdGUoc3RhdGU6YW55KTogdm9pZDtcblxuICBsb2FkU3RhdGUoKTogUHJvbWlzZTxhbnk+XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xPQ0FMX1NUT1JBR0VfU1RBVEVfU1RPUkVfS0VZID0gJyRuZy1nb2xkZW4tbGF5b3V0LXN0YXRlJztcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVN0YXRlU3RvcmUgaW1wbGVtZW50cyBTdGF0ZVN0b3JlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBrZXk6IHN0cmluZykge31cblxuICBwdWJsaWMgd3JpdGVTdGF0ZShzdGF0ZTogYW55KTogdm9pZCB7IFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMua2V5LCBKU09OLnN0cmluZ2lmeShzdGF0ZSkpO1xuICB9XG5cbiAgcHVibGljIGxvYWRTdGF0ZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHN0YXRlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oIHRoaXMua2V5ICk7XG4gICAgcmV0dXJuIHN0YXRlIFxuICAgICAgPyBQcm9taXNlLnJlc29sdmUoSlNPTi5wYXJzZShzdGF0ZSkpIFxuICAgICAgOiBQcm9taXNlLnJlamVjdChgTm8gc3RhdGUgZm91bmQgdXNpbmcga2V5OiAke3RoaXMua2V5fWApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBERUZBVUxUX0xPQ0FMX1NUT1JBR0VfU1RBVEVfU1RPUkVfRkFDVE9SWSgpIHtcbiAgcmV0dXJuIG5ldyBMb2NhbFN0b3JhZ2VTdGF0ZVN0b3JlKERFRkFVTFRfTE9DQUxfU1RPUkFHRV9TVEFURV9TVE9SRV9LRVkpO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9MT0NBTF9TVE9SQUdFX1NUQVRFX1NUT1JFID0gbmV3IExvY2FsU3RvcmFnZVN0YXRlU3RvcmUoREVGQVVMVF9MT0NBTF9TVE9SQUdFX1NUQVRFX1NUT1JFX0tFWSk7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xPQ0FMX1NUT1JBR0VfU1RBVEVfU1RPUkVfUFJPVklERVI6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBHb2xkZW5MYXlvdXRTdGF0ZVN0b3JlLFxuICB1c2VGYWN0b3J5OiBERUZBVUxUX0xPQ0FMX1NUT1JBR0VfU1RBVEVfU1RPUkVfRkFDVE9SWVxufTtcbiJdfQ==