/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
        const constr = (/** @type {?} */ (constructor));
        return (/** @type {?} */ (((/** @type {?} */ ((function (...args) {
            /** @type {?} */
            const rootWindow = (/** @type {?} */ ((window.opener || window)));
            /** @type {?} */
            const hasInstance = rootWindow.__services.has(constr.name);
            if (!hasInstance) {
                /** @type {?} */
                const storedConstr = rootWindow.__serviceConstructors.get(constr.name) || constr;
                rootWindow.__services.set(constr.name, new storedConstr(...args));
            }
            return rootWindow.__services.get(constr.name);
        }))))));
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGl3aW5kb3ctc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B3YXJyaW9ydHJhZGluZy9uZy1nb2xkZW4tbGF5b3V0LyIsInNvdXJjZXMiOlsibGliL211bHRpd2luZG93LXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQU0sVUFBVSxlQUFlO0lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQ2xCLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkQsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ25FO0FBQ0gsQ0FBQzs7Ozs7QUFNRCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLE9BQU8sVUFBVSxXQUEyQjs7Y0FDcEMsTUFBTSxHQUFHLG1CQUFBLFdBQVcsRUFBTztRQUNqQyxPQUFPLG1CQUFBLENBQUMsbUJBQUEsQ0FBQyxVQUFTLEdBQUcsSUFBVzs7a0JBQ3hCLFVBQVUsR0FBRyxtQkFBQSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEVBQU87O2tCQUM3QyxXQUFXLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUMxRCxJQUFJLENBQUMsV0FBVyxFQUFFOztzQkFDVixZQUFZLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTTtnQkFDaEYsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbkU7WUFDRCxPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsRUFBTyxDQUFDLEVBQWtCLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBNdWx0aVdpbmRvd0luaXQoKTogdm9pZCB7XG4gIGlmICghd2luZG93Lm9wZW5lcikge1xuICAgICh3aW5kb3cgYXMgYW55KS5fX3NlcnZpY2VzID0gbmV3ICh3aW5kb3cgYXMgYW55KS5NYXAoKTtcbiAgICAod2luZG93IGFzIGFueSkuX19zZXJ2aWNlQ29uc3RydWN0b3JzID0gbmV3ICh3aW5kb3cgYXMgYW55KS5NYXAoKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBDb25zdHJ1Y3RvcjxUPiA9IHtcbiAgbmV3ICguLi5hcmdzOiBhbnlbXSk6IFQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gTXVsdGlXaW5kb3dTZXJ2aWNlPFQ+KCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbnN0cnVjdG9yOiBDb25zdHJ1Y3RvcjxUPik6IENvbnN0cnVjdG9yPFQ+IHtcbiAgICBjb25zdCBjb25zdHIgPSBjb25zdHJ1Y3RvciBhcyBhbnk7XG4gICAgcmV0dXJuICgoZnVuY3Rpb24oLi4uYXJnczogYW55W10pOiBUIHtcbiAgICAgIGNvbnN0IHJvb3RXaW5kb3cgPSAod2luZG93Lm9wZW5lciB8fCB3aW5kb3cpIGFzIGFueTtcbiAgICAgIGNvbnN0IGhhc0luc3RhbmNlID0gcm9vdFdpbmRvdy5fX3NlcnZpY2VzLmhhcyhjb25zdHIubmFtZSk7XG4gICAgICBpZiAoIWhhc0luc3RhbmNlKSB7XG4gICAgICAgIGNvbnN0IHN0b3JlZENvbnN0ciA9IHJvb3RXaW5kb3cuX19zZXJ2aWNlQ29uc3RydWN0b3JzLmdldChjb25zdHIubmFtZSkgfHwgY29uc3RyO1xuICAgICAgICByb290V2luZG93Ll9fc2VydmljZXMuc2V0KGNvbnN0ci5uYW1lLCBuZXcgc3RvcmVkQ29uc3RyKC4uLmFyZ3MpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByb290V2luZG93Ll9fc2VydmljZXMuZ2V0KGNvbnN0ci5uYW1lKTtcbiAgICB9KSBhcyBhbnkpIGFzIENvbnN0cnVjdG9yPFQ+O1xuICB9O1xufVxuIl19