/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @return {?}
 */
export function MultiWindowInit() {
    if (!window.opener) {
        ((/** @type {?} */ (window))).__services = new ((/** @type {?} */ (window))).Map();
        ((/** @type {?} */ (window))).__serviceConstructors = new ((/** @type {?} */ (window))).Map();
    }
}
/**
 * @template T
 * @return {?}
 */
export function MultiWindowService() {
    return function (constructor) {
        /** @type {?} */
        var constr = (/** @type {?} */ (constructor));
        return (/** @type {?} */ (((/** @type {?} */ ((function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            /** @type {?} */
            var rootWindow = (/** @type {?} */ ((window.opener || window)));
            /** @type {?} */
            var hasInstance = rootWindow.__services.has(constr.name);
            if (!hasInstance) {
                /** @type {?} */
                var storedConstr = rootWindow.__serviceConstructors.get(constr.name) || constr;
                rootWindow.__services.set(constr.name, new (storedConstr.bind.apply(storedConstr, tslib_1.__spread([void 0], args)))());
            }
            return rootWindow.__services.get(constr.name);
        }))))));
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGl3aW5kb3ctc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B3YXJyaW9ydHJhZGluZy9uZy1nb2xkZW4tbGF5b3V0LyIsInNvdXJjZXMiOlsibGliL211bHRpd2luZG93LXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxNQUFNLFVBQVUsZUFBZTtJQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNsQixDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZELENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNuRTtBQUNILENBQUM7Ozs7O0FBTUQsTUFBTSxVQUFVLGtCQUFrQjtJQUNoQyxPQUFPLFVBQVUsV0FBMkI7O1lBQ3BDLE1BQU0sR0FBRyxtQkFBQSxXQUFXLEVBQU87UUFDakMsT0FBTyxtQkFBQSxDQUFDLG1CQUFBLENBQUM7WUFBUyxjQUFjO2lCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7Z0JBQWQseUJBQWM7OztnQkFDeEIsVUFBVSxHQUFHLG1CQUFBLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsRUFBTzs7Z0JBQzdDLFdBQVcsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzFELElBQUksQ0FBQyxXQUFXLEVBQUU7O29CQUNWLFlBQVksR0FBRyxVQUFVLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNO2dCQUNoRixVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFNLFlBQVksWUFBWixZQUFZLDZCQUFJLElBQUksTUFBRSxDQUFDO2FBQ25FO1lBQ0QsT0FBTyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLEVBQU8sQ0FBQyxFQUFrQixDQUFDO0lBQy9CLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gTXVsdGlXaW5kb3dJbml0KCk6IHZvaWQge1xuICBpZiAoIXdpbmRvdy5vcGVuZXIpIHtcbiAgICAod2luZG93IGFzIGFueSkuX19zZXJ2aWNlcyA9IG5ldyAod2luZG93IGFzIGFueSkuTWFwKCk7XG4gICAgKHdpbmRvdyBhcyBhbnkpLl9fc2VydmljZUNvbnN0cnVjdG9ycyA9IG5ldyAod2luZG93IGFzIGFueSkuTWFwKCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgQ29uc3RydWN0b3I8VD4gPSB7XG4gIG5ldyAoLi4uYXJnczogYW55W10pOiBUO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIE11bHRpV2luZG93U2VydmljZTxUPigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjb25zdHJ1Y3RvcjogQ29uc3RydWN0b3I8VD4pOiBDb25zdHJ1Y3RvcjxUPiB7XG4gICAgY29uc3QgY29uc3RyID0gY29uc3RydWN0b3IgYXMgYW55O1xuICAgIHJldHVybiAoKGZ1bmN0aW9uKC4uLmFyZ3M6IGFueVtdKTogVCB7XG4gICAgICBjb25zdCByb290V2luZG93ID0gKHdpbmRvdy5vcGVuZXIgfHwgd2luZG93KSBhcyBhbnk7XG4gICAgICBjb25zdCBoYXNJbnN0YW5jZSA9IHJvb3RXaW5kb3cuX19zZXJ2aWNlcy5oYXMoY29uc3RyLm5hbWUpO1xuICAgICAgaWYgKCFoYXNJbnN0YW5jZSkge1xuICAgICAgICBjb25zdCBzdG9yZWRDb25zdHIgPSByb290V2luZG93Ll9fc2VydmljZUNvbnN0cnVjdG9ycy5nZXQoY29uc3RyLm5hbWUpIHx8IGNvbnN0cjtcbiAgICAgICAgcm9vdFdpbmRvdy5fX3NlcnZpY2VzLnNldChjb25zdHIubmFtZSwgbmV3IHN0b3JlZENvbnN0ciguLi5hcmdzKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcm9vdFdpbmRvdy5fX3NlcnZpY2VzLmdldChjb25zdHIubmFtZSk7XG4gICAgfSkgYXMgYW55KSBhcyBDb25zdHJ1Y3RvcjxUPjtcbiAgfTtcbn1cbiJdfQ==