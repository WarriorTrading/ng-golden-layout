/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isDevMode, ComponentFactoryResolver, HostListener, ViewContainerRef, ElementRef, Component, ApplicationRef, NgZone, InjectionToken, Injector, ViewChild } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { GoldenLayoutService } from './golden-layout.service';
/** @type {?} */
export var GoldenLayoutContainer = new InjectionToken('GoldenLayoutContainer');
/** @type {?} */
export var GoldenLayoutComponentState = new InjectionToken('GoldenLayoutComponentState');
/**
 * Type guard which determines if a component implements the GlOnResize interface.
 * @param {?} obj
 * @return {?}
 */
function implementsGlOnResize(obj) {
    return typeof obj === 'object' && typeof obj.glOnResize === 'function';
}
/**
 * Type guard which determines if a component implements the GlOnShow interface.
 * @param {?} obj
 * @return {?}
 */
function implementsGlOnShow(obj) {
    return typeof obj === 'object' && typeof obj.glOnShow === 'function';
}
/**
 * Type guard which determines if a component implements the GlOnHide interface.
 * @param {?} obj
 * @return {?}
 */
function implementsGlOnHide(obj) {
    return typeof obj === 'object' && typeof obj.glOnHide === 'function';
}
/**
 * Type guard which determines if a component implements the GlOnTab interface.
 * @param {?} obj
 * @return {?}
 */
function implementsGlOnTab(obj) {
    return typeof obj === 'object' && typeof obj.glOnTab === 'function';
}
/** @type {?} */
var COMPONENT_REF_KEY = '$componentRef';
var GoldenLayoutComponent = /** @class */ (function () {
    function GoldenLayoutComponent(glService, viewContainer, appref, componentFactoryResolver, ngZone, injector) {
        this.glService = glService;
        this.viewContainer = viewContainer;
        this.appref = appref;
        this.componentFactoryResolver = componentFactoryResolver;
        this.ngZone = ngZone;
        this.injector = injector;
        this.unloaded = false;
        this.topWindow = glService.getRootWindow();
        this.isChildWindow = glService.isChildWindow();
        if (this.isChildWindow) {
            window.document.title = window.document.URL;
            ((/** @type {?} */ (console))).__log = console.log;
            console.log = this.topWindow.console.log;
        }
        if (isDevMode())
            console.log("Create@" + (this.isChildWindow ? 'child' : 'root') + "!");
    }
    /**
     * @return {?}
     */
    GoldenLayoutComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (isDevMode())
            console.log("Init@" + (this.isChildWindow ? 'child' : 'root') + "!");
        /** @type {?} */
        var anyWin = (/** @type {?} */ (this.topWindow));
        if (!this.isChildWindow) {
            anyWin.__apprefs = [];
            anyWin.__injector = this.injector;
        }
        // attach the application reference to the root window, save the original 'tick' method
        anyWin.__apprefs.push(this.appref);
        ((/** @type {?} */ (this.appref))).__tick = this.appref.tick;
        this.appref.tick = function () {
            var e_1, _a;
            var _loop_1 = function (ar) {
                ar._zone.run(function () { return ar.__tick(); });
            };
            try {
                for (var _b = tslib_1.__values(((/** @type {?} */ (_this.topWindow))).__apprefs), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var ar = _c.value;
                    _loop_1(ar);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        this.glService.getState().then(function (layout) {
            _this._createLayout(layout);
        });
    };
    /**
     * @return {?}
     */
    GoldenLayoutComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (isDevMode())
            console.log("Destroy@" + (this.isChildWindow ? 'child' : 'root') + "!");
        if (this.isChildWindow) {
            console.log = ((/** @type {?} */ (console))).__log;
        }
        this.unloaded = true;
        // restore the original tick method.
        // this appens in two cases:
        // either the window is closed, after that it's not important to restore the tick method
        // or within the root window, where we HAVE to restore the original tick method
        this.appref.tick = ((/** @type {?} */ (this.appref))).__tick;
    };
    /**
     * @return {?}
     */
    GoldenLayoutComponent.prototype.unloadHandler = /**
     * @return {?}
     */
    function () {
        if (isDevMode())
            console.log("Unload@" + (this.isChildWindow ? 'child' : 'root'));
        if (this.unloaded) {
            return;
        }
        this.unloaded = true;
        if (this.isChildWindow) { // if the top window is unloaded, the whole application is destroyed.
            // if the top window is unloaded, the whole application is destroyed.
            /** @type {?} */
            var index = ((/** @type {?} */ (this.topWindow))).__apprefs.indexOf(this.appref);
            ((/** @type {?} */ (this.topWindow))).__apprefs.splice(index, 1);
        }
    };
    /**
     * @param {?} layout
     * @return {?}
     */
    GoldenLayoutComponent.prototype._createLayout = /**
     * @param {?} layout
     * @return {?}
     */
    function (layout) {
        this.goldenLayout = new GoldenLayout(layout, $(this.el.nativeElement));
        // Register all golden-layout components.
        this.glService.initialize(this.goldenLayout, this);
        // Initialize the layout.
        this.goldenLayout.init();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    GoldenLayoutComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.goldenLayout) {
            this.goldenLayout.updateSize();
        }
    };
    /**
     * @param {?} componentType
     * @return {?}
     */
    GoldenLayoutComponent.prototype.createComponentInitCallback = /**
     * @param {?} componentType
     * @return {?}
     */
    function (componentType) {
        // Can't use an ES6 lambda here, since it is not a constructor
        /** @type {?} */
        var self = this;
        return function (container, componentState) {
            self.ngZone.run(function () {
                // Create an instance of the angular component.
                /** @type {?} */
                var factory = self.componentFactoryResolver.resolveComponentFactory(componentType);
                /** @type {?} */
                var injector = self._createComponentInjector(container, componentState);
                /** @type {?} */
                var componentRef = self.viewContainer.createComponent(factory, undefined, injector);
                // Bind the new component to container's client DOM element.
                container.getElement().append($(componentRef.location.nativeElement));
                self._bindEventHooks(container, componentRef.instance);
                container.on('destroy', function () {
                    $(componentRef.location.nativeElement).remove();
                    componentRef.destroy();
                });
            });
        };
    };
    /**
     * Creates an injector capable of injecting the GoldenLayout object,
     * component container, and initial component state.
     */
    /**
     * Creates an injector capable of injecting the GoldenLayout object,
     * component container, and initial component state.
     * @param {?} container
     * @param {?} componentState
     * @return {?}
     */
    GoldenLayoutComponent.prototype._createComponentInjector = /**
     * Creates an injector capable of injecting the GoldenLayout object,
     * component container, and initial component state.
     * @param {?} container
     * @param {?} componentState
     * @return {?}
     */
    function (container, componentState) {
        return Injector.create([
            {
                provide: GoldenLayoutContainer,
                useValue: container
            },
            {
                provide: GoldenLayoutComponentState,
                useValue: componentState
            },
            {
                provide: GoldenLayout,
                useValue: this.goldenLayout
            },
        ], this.injector);
    };
    /**
     * Registers an event handler for each implemented hook.
     * @param container Golden Layout component container.
     * @param component Angular component instance.
     */
    /**
     * Registers an event handler for each implemented hook.
     * @param {?} container Golden Layout component container.
     * @param {?} component Angular component instance.
     * @return {?}
     */
    GoldenLayoutComponent.prototype._bindEventHooks = /**
     * Registers an event handler for each implemented hook.
     * @param {?} container Golden Layout component container.
     * @param {?} component Angular component instance.
     * @return {?}
     */
    function (container, component) {
        if (implementsGlOnResize(component)) {
            container.on('resize', function () {
                component.glOnResize();
            });
        }
        if (implementsGlOnShow(component)) {
            container.on('show', function () {
                component.glOnShow();
            });
        }
        if (implementsGlOnHide(component)) {
            container.on('hide', function () {
                component.glOnHide();
            });
        }
        if (implementsGlOnTab(component)) {
            container.on('tab', function (tab) {
                component.glOnTab(tab);
            });
        }
    };
    GoldenLayoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'golden-layout-root',
                    template: "<div class=\"ng-golden-layout-root\" #glroot></div>",
                    styles: ["\n    .ng-golden-layout-root {\n      width:100%;\n      height:100%;\n    }"]
                }] }
    ];
    /** @nocollapse */
    GoldenLayoutComponent.ctorParameters = function () { return [
        { type: GoldenLayoutService },
        { type: ViewContainerRef },
        { type: ApplicationRef },
        { type: ComponentFactoryResolver },
        { type: NgZone },
        { type: Injector }
    ]; };
    GoldenLayoutComponent.propDecorators = {
        el: [{ type: ViewChild, args: ['glroot',] }],
        unloadHandler: [{ type: HostListener, args: ['window:beforeunload',] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return GoldenLayoutComponent;
}());
export { GoldenLayoutComponent };
if (false) {
    /** @type {?} */
    GoldenLayoutComponent.prototype.goldenLayout;
    /** @type {?} */
    GoldenLayoutComponent.prototype.topWindow;
    /** @type {?} */
    GoldenLayoutComponent.prototype.isChildWindow;
    /** @type {?} */
    GoldenLayoutComponent.prototype.unloaded;
    /** @type {?} */
    GoldenLayoutComponent.prototype.el;
    /** @type {?} */
    GoldenLayoutComponent.prototype.glService;
    /** @type {?} */
    GoldenLayoutComponent.prototype.viewContainer;
    /** @type {?} */
    GoldenLayoutComponent.prototype.appref;
    /** @type {?} */
    GoldenLayoutComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    GoldenLayoutComponent.prototype.ngZone;
    /** @type {?} */
    GoldenLayoutComponent.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZGVuLWxheW91dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2FycmlvcnRyYWRpbmcvbmctZ29sZGVuLWxheW91dC8iLCJzb3VyY2VzIjpbImxpYi9nb2xkZW4tbGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLFNBQVMsRUFHVCxjQUFjLEVBR2QsTUFBTSxFQUNOLGNBQWMsRUFDZCxRQUFRLEVBQ1IsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBRzlDLE9BQU8sRUFDTCxtQkFBbUIsRUFHcEIsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFakMsTUFBTSxLQUFPLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUFDLHVCQUF1QixDQUFDOztBQUNoRixNQUFNLEtBQU8sMEJBQTBCLEdBQUcsSUFBSSxjQUFjLENBQUMsNEJBQTRCLENBQUM7Ozs7OztBQUkxRixTQUFTLG9CQUFvQixDQUFDLEdBQVE7SUFDcEMsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQztBQUN6RSxDQUFDOzs7Ozs7QUFLRCxTQUFTLGtCQUFrQixDQUFDLEdBQVE7SUFDbEMsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQztBQUN2RSxDQUFDOzs7Ozs7QUFLRCxTQUFTLGtCQUFrQixDQUFDLEdBQVE7SUFDbEMsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQztBQUN2RSxDQUFDOzs7Ozs7QUFLRCxTQUFTLGlCQUFpQixDQUFDLEdBQVE7SUFDakMsT0FB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O1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2hDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQUMsR0FBRztnQkFDdEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Z0JBM0tGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQU85QixRQUFRLEVBQUUscURBQW1EOzZCQU5wRCw4RUFJTDtpQkFHTDs7OztnQkE5Q0MsbUJBQW1CO2dCQWpCbkIsZ0JBQWdCO2dCQUtoQixjQUFjO2dCQVBkLHdCQUF3QjtnQkFVeEIsTUFBTTtnQkFFTixRQUFROzs7cUJBNERQLFNBQVMsU0FBQyxRQUFRO2dDQXNEbEIsWUFBWSxTQUFDLHFCQUFxQjsyQkF1QmxDLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBK0UzQyw0QkFBQztDQUFBLEFBNUtELElBNEtDO1NBbEtZLHFCQUFxQjs7O0lBQ2hDLDZDQUFtQzs7SUFDbkMsMENBQTBCOztJQUMxQiw4Q0FBK0I7O0lBQy9CLHlDQUF5Qjs7SUFFekIsbUNBQTRDOztJQUVoQywwQ0FBc0M7O0lBQ3RDLDhDQUF1Qzs7SUFDdkMsdUNBQThCOztJQUM5Qix5REFBMEQ7O0lBQzFELHVDQUFzQjs7SUFDdEIseUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgaXNEZXZNb2RlLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRWxlbWVudFJlZixcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgQXBwbGljYXRpb25SZWYsXG4gIFR5cGUsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3RvcixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgR29sZGVuTGF5b3V0IGZyb20gJ2dvbGRlbi1sYXlvdXQnO1xuXG5pbXBvcnQgeyBHbE9uUmVzaXplLCBHbE9uU2hvdywgR2xPbkhpZGUsIEdsT25UYWIgfSBmcm9tICcuL2hvb2tzJztcbmltcG9ydCB7XG4gIEdvbGRlbkxheW91dFNlcnZpY2UsXG4gIENvbXBvbmVudEluaXRDYWxsYmFja0ZhY3RvcnksXG4gIENvbXBvbmVudEluaXRDYWxsYmFja1xufSBmcm9tICcuL2dvbGRlbi1sYXlvdXQuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBHb2xkZW5MYXlvdXRDb250YWluZXIgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0dvbGRlbkxheW91dENvbnRhaW5lcicpO1xuZXhwb3J0IGNvbnN0IEdvbGRlbkxheW91dENvbXBvbmVudFN0YXRlID0gbmV3IEluamVjdGlvblRva2VuKCdHb2xkZW5MYXlvdXRDb21wb25lbnRTdGF0ZScpO1xuLyoqXG4gKiBUeXBlIGd1YXJkIHdoaWNoIGRldGVybWluZXMgaWYgYSBjb21wb25lbnQgaW1wbGVtZW50cyB0aGUgR2xPblJlc2l6ZSBpbnRlcmZhY2UuXG4gKi9cbmZ1bmN0aW9uIGltcGxlbWVudHNHbE9uUmVzaXplKG9iajogYW55KTogb2JqIGlzIEdsT25SZXNpemUge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5nbE9uUmVzaXplID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIFR5cGUgZ3VhcmQgd2hpY2ggZGV0ZXJtaW5lcyBpZiBhIGNvbXBvbmVudCBpbXBsZW1lbnRzIHRoZSBHbE9uU2hvdyBpbnRlcmZhY2UuXG4gKi9cbmZ1bmN0aW9uIGltcGxlbWVudHNHbE9uU2hvdyhvYmo6IGFueSk6IG9iaiBpcyBHbE9uU2hvdyB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmdsT25TaG93ID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIFR5cGUgZ3VhcmQgd2hpY2ggZGV0ZXJtaW5lcyBpZiBhIGNvbXBvbmVudCBpbXBsZW1lbnRzIHRoZSBHbE9uSGlkZSBpbnRlcmZhY2UuXG4gKi9cbmZ1bmN0aW9uIGltcGxlbWVudHNHbE9uSGlkZShvYmo6IGFueSk6IG9iaiBpcyBHbE9uSGlkZSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmdsT25IaWRlID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIFR5cGUgZ3VhcmQgd2hpY2ggZGV0ZXJtaW5lcyBpZiBhIGNvbXBvbmVudCBpbXBsZW1lbnRzIHRoZSBHbE9uVGFiIGludGVyZmFjZS5cbiAqL1xuZnVuY3Rpb24gaW1wbGVtZW50c0dsT25UYWIob2JqOiBhbnkpOiBvYmogaXMgR2xPblRhYiB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmdsT25UYWIgPT09ICdmdW5jdGlvbic7XG59XG5cbmNvbnN0IENPTVBPTkVOVF9SRUZfS0VZID0gJyRjb21wb25lbnRSZWYnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnb2xkZW4tbGF5b3V0LXJvb3QnLFxuICBzdHlsZXM6IFtgXG4gICAgLm5nLWdvbGRlbi1sYXlvdXQtcm9vdCB7XG4gICAgICB3aWR0aDoxMDAlO1xuICAgICAgaGVpZ2h0OjEwMCU7XG4gICAgfWBcbiAgXSxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmctZ29sZGVuLWxheW91dC1yb290XCIgI2dscm9vdD48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEdvbGRlbkxheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb21wb25lbnRJbml0Q2FsbGJhY2tGYWN0b3J5IHtcbiAgcHJpdmF0ZSBnb2xkZW5MYXlvdXQ6IEdvbGRlbkxheW91dDtcbiAgcHJpdmF0ZSB0b3BXaW5kb3c6IFdpbmRvdztcbiAgcHJpdmF0ZSBpc0NoaWxkV2luZG93OiBib29sZWFuO1xuICBwcml2YXRlIHVubG9hZGVkID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgnZ2xyb290JykgcHJpdmF0ZSBlbDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdsU2VydmljZTogR29sZGVuTGF5b3V0U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGFwcHJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy50b3BXaW5kb3cgPSBnbFNlcnZpY2UuZ2V0Um9vdFdpbmRvdygpO1xuICAgIHRoaXMuaXNDaGlsZFdpbmRvdyA9IGdsU2VydmljZS5pc0NoaWxkV2luZG93KCk7XG4gICAgaWYgKHRoaXMuaXNDaGlsZFdpbmRvdykge1xuICAgICAgd2luZG93LmRvY3VtZW50LnRpdGxlID0gd2luZG93LmRvY3VtZW50LlVSTDtcbiAgICAgIChjb25zb2xlIGFzIGFueSkuX19sb2cgPSBjb25zb2xlLmxvZztcbiAgICAgIGNvbnNvbGUubG9nID0gdGhpcy50b3BXaW5kb3cuY29uc29sZS5sb2c7XG4gICAgfVxuICAgIGlmIChpc0Rldk1vZGUoKSkgY29uc29sZS5sb2coYENyZWF0ZUAke3RoaXMuaXNDaGlsZFdpbmRvdyA/ICdjaGlsZCcgOiAncm9vdCd9IWApO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmIChpc0Rldk1vZGUoKSkgY29uc29sZS5sb2coYEluaXRAJHt0aGlzLmlzQ2hpbGRXaW5kb3cgPyAnY2hpbGQnIDogJ3Jvb3QnfSFgKTtcbiAgICBsZXQgYW55V2luID0gdGhpcy50b3BXaW5kb3cgYXMgYW55O1xuICAgIGlmICghdGhpcy5pc0NoaWxkV2luZG93KSB7XG4gICAgICBhbnlXaW4uX19hcHByZWZzID0gW107XG4gICAgICBhbnlXaW4uX19pbmplY3RvciA9IHRoaXMuaW5qZWN0b3I7XG4gICAgfVxuXG4gICAgLy8gYXR0YWNoIHRoZSBhcHBsaWNhdGlvbiByZWZlcmVuY2UgdG8gdGhlIHJvb3Qgd2luZG93LCBzYXZlIHRoZSBvcmlnaW5hbCAndGljaycgbWV0aG9kXG4gICAgYW55V2luLl9fYXBwcmVmcy5wdXNoKHRoaXMuYXBwcmVmKTtcbiAgICAodGhpcy5hcHByZWYgYXMgYW55KS5fX3RpY2sgPSB0aGlzLmFwcHJlZi50aWNrO1xuXG4gICAgdGhpcy5hcHByZWYudGljayA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGZvciAoY29uc3QgYXIgb2YgKHRoaXMudG9wV2luZG93IGFzIGFueSkuX19hcHByZWZzKSB7XG4gICAgICAgIGFyLl96b25lLnJ1bigoKSA9PiBhci5fX3RpY2soKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZ2xTZXJ2aWNlLmdldFN0YXRlKCkudGhlbigobGF5b3V0OiBhbnkpID0+IHtcbiAgICAgIHRoaXMuX2NyZWF0ZUxheW91dChsYXlvdXQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmIChpc0Rldk1vZGUoKSkgY29uc29sZS5sb2coYERlc3Ryb3lAJHt0aGlzLmlzQ2hpbGRXaW5kb3cgPyAnY2hpbGQnIDogJ3Jvb3QnfSFgKTtcbiAgICBpZiAodGhpcy5pc0NoaWxkV2luZG93KSB7XG4gICAgICBjb25zb2xlLmxvZyA9IChjb25zb2xlIGFzIGFueSkuX19sb2c7XG4gICAgfVxuICAgIHRoaXMudW5sb2FkZWQgPSB0cnVlO1xuICAgIC8vIHJlc3RvcmUgdGhlIG9yaWdpbmFsIHRpY2sgbWV0aG9kLlxuICAgIC8vIHRoaXMgYXBwZW5zIGluIHR3byBjYXNlczpcbiAgICAvLyBlaXRoZXIgdGhlIHdpbmRvdyBpcyBjbG9zZWQsIGFmdGVyIHRoYXQgaXQncyBub3QgaW1wb3J0YW50IHRvIHJlc3RvcmUgdGhlIHRpY2sgbWV0aG9kXG4gICAgLy8gb3Igd2l0aGluIHRoZSByb290IHdpbmRvdywgd2hlcmUgd2UgSEFWRSB0byByZXN0b3JlIHRoZSBvcmlnaW5hbCB0aWNrIG1ldGhvZFxuICAgIHRoaXMuYXBwcmVmLnRpY2sgPSAodGhpcy5hcHByZWYgYXMgYW55KS5fX3RpY2s7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6YmVmb3JldW5sb2FkJylcbiAgcHVibGljIHVubG9hZEhhbmRsZXIoKTogdm9pZCB7XG4gICAgaWYgKGlzRGV2TW9kZSgpKSBjb25zb2xlLmxvZyhgVW5sb2FkQCR7dGhpcy5pc0NoaWxkV2luZG93ID8gJ2NoaWxkJyA6ICdyb290J31gKTtcbiAgICBpZiAodGhpcy51bmxvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVubG9hZGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5pc0NoaWxkV2luZG93KSB7IC8vIGlmIHRoZSB0b3Agd2luZG93IGlzIHVubG9hZGVkLCB0aGUgd2hvbGUgYXBwbGljYXRpb24gaXMgZGVzdHJveWVkLlxuICAgICAgY29uc3QgaW5kZXggPSAodGhpcy50b3BXaW5kb3cgYXMgYW55KS5fX2FwcHJlZnMuaW5kZXhPZih0aGlzLmFwcHJlZik7XG4gICAgICAodGhpcy50b3BXaW5kb3cgYXMgYW55KS5fX2FwcHJlZnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVMYXlvdXQobGF5b3V0OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmdvbGRlbkxheW91dCA9IG5ldyBHb2xkZW5MYXlvdXQobGF5b3V0LCAkKHRoaXMuZWwubmF0aXZlRWxlbWVudCkpO1xuXG4gICAgLy8gUmVnaXN0ZXIgYWxsIGdvbGRlbi1sYXlvdXQgY29tcG9uZW50cy5cbiAgICB0aGlzLmdsU2VydmljZS5pbml0aWFsaXplKHRoaXMuZ29sZGVuTGF5b3V0LCB0aGlzKTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGxheW91dC5cbiAgICB0aGlzLmdvbGRlbkxheW91dC5pbml0KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uUmVzaXplKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5nb2xkZW5MYXlvdXQpIHtcbiAgICAgIHRoaXMuZ29sZGVuTGF5b3V0LnVwZGF0ZVNpemUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQ29tcG9uZW50SW5pdENhbGxiYWNrKGNvbXBvbmVudFR5cGU6IFR5cGU8YW55Pik6IENvbXBvbmVudEluaXRDYWxsYmFjayB7XG4gICAgLy8gQ2FuJ3QgdXNlIGFuIEVTNiBsYW1iZGEgaGVyZSwgc2luY2UgaXQgaXMgbm90IGEgY29uc3RydWN0b3JcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnRhaW5lcjogR29sZGVuTGF5b3V0LkNvbnRhaW5lciwgY29tcG9uZW50U3RhdGU6IGFueSkge1xuICAgICAgc2VsZi5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBhbmd1bGFyIGNvbXBvbmVudC5cbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHNlbGYuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudFR5cGUpO1xuICAgICAgICBjb25zdCBpbmplY3RvciA9IHNlbGYuX2NyZWF0ZUNvbXBvbmVudEluamVjdG9yKGNvbnRhaW5lciwgY29tcG9uZW50U3RhdGUpO1xuICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSBzZWxmLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIHVuZGVmaW5lZCwgaW5qZWN0b3IpO1xuXG4gICAgICAgIC8vIEJpbmQgdGhlIG5ldyBjb21wb25lbnQgdG8gY29udGFpbmVyJ3MgY2xpZW50IERPTSBlbGVtZW50LlxuICAgICAgICBjb250YWluZXIuZ2V0RWxlbWVudCgpLmFwcGVuZCgkKGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KSk7XG4gICAgICAgIHNlbGYuX2JpbmRFdmVudEhvb2tzKGNvbnRhaW5lciwgY29tcG9uZW50UmVmLmluc3RhbmNlKTtcbiAgICAgICAgY29udGFpbmVyLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICAgICQoY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpLnJlbW92ZSgpO1xuICAgICAgICAgIGNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluamVjdG9yIGNhcGFibGUgb2YgaW5qZWN0aW5nIHRoZSBHb2xkZW5MYXlvdXQgb2JqZWN0LFxuICAgKiBjb21wb25lbnQgY29udGFpbmVyLCBhbmQgaW5pdGlhbCBjb21wb25lbnQgc3RhdGUuXG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVDb21wb25lbnRJbmplY3Rvcihjb250YWluZXI6IEdvbGRlbkxheW91dC5Db250YWluZXIsIGNvbXBvbmVudFN0YXRlOiBhbnkpOiBJbmplY3RvciB7XG4gICAgcmV0dXJuIEluamVjdG9yLmNyZWF0ZShbXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGU6IEdvbGRlbkxheW91dENvbnRhaW5lcixcbiAgICAgICAgdXNlVmFsdWU6IGNvbnRhaW5lclxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogR29sZGVuTGF5b3V0Q29tcG9uZW50U3RhdGUsXG4gICAgICAgIHVzZVZhbHVlOiBjb21wb25lbnRTdGF0ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogR29sZGVuTGF5b3V0LFxuICAgICAgICB1c2VWYWx1ZTogdGhpcy5nb2xkZW5MYXlvdXRcbiAgICAgIH0sXG4gICAgXSwgdGhpcy5pbmplY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgZm9yIGVhY2ggaW1wbGVtZW50ZWQgaG9vay5cbiAgICogQHBhcmFtIGNvbnRhaW5lciBHb2xkZW4gTGF5b3V0IGNvbXBvbmVudCBjb250YWluZXIuXG4gICAqIEBwYXJhbSBjb21wb25lbnQgQW5ndWxhciBjb21wb25lbnQgaW5zdGFuY2UuXG4gICAqL1xuICBwcml2YXRlIF9iaW5kRXZlbnRIb29rcyhjb250YWluZXI6IEdvbGRlbkxheW91dC5Db250YWluZXIsIGNvbXBvbmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKGltcGxlbWVudHNHbE9uUmVzaXplKGNvbXBvbmVudCkpIHtcbiAgICAgIGNvbnRhaW5lci5vbigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnQuZ2xPblJlc2l6ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGltcGxlbWVudHNHbE9uU2hvdyhjb21wb25lbnQpKSB7XG4gICAgICBjb250YWluZXIub24oJ3Nob3cnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudC5nbE9uU2hvdygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGltcGxlbWVudHNHbE9uSGlkZShjb21wb25lbnQpKSB7XG4gICAgICBjb250YWluZXIub24oJ2hpZGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudC5nbE9uSGlkZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGltcGxlbWVudHNHbE9uVGFiKGNvbXBvbmVudCkpIHtcbiAgICAgIGNvbnRhaW5lci5vbigndGFiJywgKHRhYikgPT4ge1xuICAgICAgICBjb21wb25lbnQuZ2xPblRhYih0YWIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=