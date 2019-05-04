/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { isDevMode, ComponentFactoryResolver, HostListener, ViewContainerRef, ElementRef, Component, ApplicationRef, NgZone, InjectionToken, Injector, ViewChild } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { GoldenLayoutService } from './golden-layout.service';
/** @type {?} */
export const GoldenLayoutContainer = new InjectionToken('GoldenLayoutContainer');
/** @type {?} */
export const GoldenLayoutComponentState = new InjectionToken('GoldenLayoutComponentState');
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
const COMPONENT_REF_KEY = '$componentRef';
export class GoldenLayoutComponent {
    /**
     * @param {?} glService
     * @param {?} viewContainer
     * @param {?} appref
     * @param {?} componentFactoryResolver
     * @param {?} ngZone
     * @param {?} injector
     */
    constructor(glService, viewContainer, appref, componentFactoryResolver, ngZone, injector) {
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
            console.log(`Create@${this.isChildWindow ? 'child' : 'root'}!`);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isDevMode())
            console.log(`Init@${this.isChildWindow ? 'child' : 'root'}!`);
        /** @type {?} */
        let anyWin = (/** @type {?} */ (this.topWindow));
        if (!this.isChildWindow) {
            anyWin.__apprefs = [];
            anyWin.__injector = this.injector;
        }
        // attach the application reference to the root window, save the original 'tick' method
        anyWin.__apprefs.push(this.appref);
        ((/** @type {?} */ (this.appref))).__tick = this.appref.tick;
        this.appref.tick = () => {
            for (const ar of ((/** @type {?} */ (this.topWindow))).__apprefs) {
                ar._zone.run(() => ar.__tick());
            }
        };
        this.glService.getState().then((layout) => {
            this._createLayout(layout);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (isDevMode())
            console.log(`Destroy@${this.isChildWindow ? 'child' : 'root'}!`);
        if (this.isChildWindow) {
            console.log = ((/** @type {?} */ (console))).__log;
        }
        this.unloaded = true;
        // restore the original tick method.
        // this appens in two cases:
        // either the window is closed, after that it's not important to restore the tick method
        // or within the root window, where we HAVE to restore the original tick method
        this.appref.tick = ((/** @type {?} */ (this.appref))).__tick;
    }
    /**
     * @return {?}
     */
    unloadHandler() {
        if (isDevMode())
            console.log(`Unload@${this.isChildWindow ? 'child' : 'root'}`);
        if (this.unloaded) {
            return;
        }
        this.unloaded = true;
        if (this.isChildWindow) { // if the top window is unloaded, the whole application is destroyed.
            // if the top window is unloaded, the whole application is destroyed.
            /** @type {?} */
            const index = ((/** @type {?} */ (this.topWindow))).__apprefs.indexOf(this.appref);
            ((/** @type {?} */ (this.topWindow))).__apprefs.splice(index, 1);
        }
    }
    /**
     * @param {?} layout
     * @return {?}
     */
    _createLayout(layout) {
        this.goldenLayout = new GoldenLayout(layout, $(this.el.nativeElement));
        // Register all golden-layout components.
        this.glService.initialize(this.goldenLayout, this);
        // Initialize the layout.
        this.goldenLayout.init();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        if (this.goldenLayout) {
            this.goldenLayout.updateSize();
        }
    }
    /**
     * @param {?} componentType
     * @return {?}
     */
    createComponentInitCallback(componentType) {
        // Can't use an ES6 lambda here, since it is not a constructor
        /** @type {?} */
        const self = this;
        return function (container, componentState) {
            self.ngZone.run(() => {
                // Create an instance of the angular component.
                /** @type {?} */
                const factory = self.componentFactoryResolver.resolveComponentFactory(componentType);
                /** @type {?} */
                const injector = self._createComponentInjector(container, componentState);
                /** @type {?} */
                const componentRef = self.viewContainer.createComponent(factory, undefined, injector);
                // Bind the new component to container's client DOM element.
                container.getElement().append($(componentRef.location.nativeElement));
                self._bindEventHooks(container, componentRef.instance);
                container.on('destroy', () => {
                    $(componentRef.location.nativeElement).remove();
                    componentRef.destroy();
                });
            });
        };
    }
    /**
     * Creates an injector capable of injecting the GoldenLayout object,
     * component container, and initial component state.
     * @param {?} container
     * @param {?} componentState
     * @return {?}
     */
    _createComponentInjector(container, componentState) {
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
    }
    /**
     * Registers an event handler for each implemented hook.
     * @param {?} container Golden Layout component container.
     * @param {?} component Angular component instance.
     * @return {?}
     */
    _bindEventHooks(container, component) {
        if (implementsGlOnResize(component)) {
            container.on('resize', () => {
                component.glOnResize();
            });
        }
        if (implementsGlOnShow(component)) {
            container.on('show', () => {
                component.glOnShow();
            });
        }
        if (implementsGlOnHide(component)) {
            container.on('hide', () => {
                component.glOnHide();
            });
        }
        if (implementsGlOnTab(component)) {
            container.on('tab', (tab) => {
                component.glOnTab(tab);
            });
        }
    }
}
GoldenLayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'golden-layout-root',
                template: `<div class="ng-golden-layout-root" #glroot></div>`,
                styles: [`
    .ng-golden-layout-root {
      width:100%;
      height:100%;
    }`]
            }] }
];
/** @nocollapse */
GoldenLayoutComponent.ctorParameters = () => [
    { type: GoldenLayoutService },
    { type: ViewContainerRef },
    { type: ApplicationRef },
    { type: ComponentFactoryResolver },
    { type: NgZone },
    { type: Injector }
];
GoldenLayoutComponent.propDecorators = {
    el: [{ type: ViewChild, args: ['glroot',] }],
    unloadHandler: [{ type: HostListener, args: ['window:beforeunload',] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29sZGVuLWxheW91dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2FycmlvcnRyYWRpbmcvbmctZ29sZGVuLWxheW91dC8iLCJzb3VyY2VzIjpbImxpYi9nb2xkZW4tbGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsU0FBUyxFQUdULGNBQWMsRUFHZCxNQUFNLEVBQ04sY0FBYyxFQUNkLFFBQVEsRUFDUixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLFlBQVksTUFBTSxlQUFlLENBQUM7QUFHOUMsT0FBTyxFQUNMLG1CQUFtQixFQUdwQixNQUFNLHlCQUF5QixDQUFDOztBQUVqQyxNQUFNLE9BQU8scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQUMsdUJBQXVCLENBQUM7O0FBQ2hGLE1BQU0sT0FBTywwQkFBMEIsR0FBRyxJQUFJLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBQzs7Ozs7O0FBSTFGLFNBQVMsb0JBQW9CLENBQUMsR0FBUTtJQUNwQyxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDO0FBQ3pFLENBQUM7Ozs7OztBQUtELFNBQVMsa0JBQWtCLENBQUMsR0FBUTtJQUNsQyxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDO0FBQ3ZFLENBQUM7Ozs7OztBQUtELFNBQVMsa0JBQWtCLENBQUMsR0FBUTtJQUNsQyxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDO0FBQ3ZFLENBQUM7Ozs7OztBQUtELFNBQVMsaUJBQWlCLENBQUMsR0FBUTtJQUNqQyxPQUFP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LEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDMUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7O1lBM0tGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQU85QixRQUFRLEVBQUUsbURBQW1EO3lCQU5wRDs7OztNQUlMO2FBR0w7Ozs7WUE5Q0MsbUJBQW1CO1lBakJuQixnQkFBZ0I7WUFLaEIsY0FBYztZQVBkLHdCQUF3QjtZQVV4QixNQUFNO1lBRU4sUUFBUTs7O2lCQTREUCxTQUFTLFNBQUMsUUFBUTs0QkFzRGxCLFlBQVksU0FBQyxxQkFBcUI7dUJBdUJsQyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBbEZ6Qyw2Q0FBbUM7O0lBQ25DLDBDQUEwQjs7SUFDMUIsOENBQStCOztJQUMvQix5Q0FBeUI7O0lBRXpCLG1DQUE0Qzs7SUFFaEMsMENBQXNDOztJQUN0Qyw4Q0FBdUM7O0lBQ3ZDLHVDQUE4Qjs7SUFDOUIseURBQTBEOztJQUMxRCx1Q0FBc0I7O0lBQ3RCLHlDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGlzRGV2TW9kZSxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIEFwcGxpY2F0aW9uUmVmLFxuICBUeXBlLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEdvbGRlbkxheW91dCBmcm9tICdnb2xkZW4tbGF5b3V0JztcblxuaW1wb3J0IHsgR2xPblJlc2l6ZSwgR2xPblNob3csIEdsT25IaWRlLCBHbE9uVGFiIH0gZnJvbSAnLi9ob29rcyc7XG5pbXBvcnQge1xuICBHb2xkZW5MYXlvdXRTZXJ2aWNlLFxuICBDb21wb25lbnRJbml0Q2FsbGJhY2tGYWN0b3J5LFxuICBDb21wb25lbnRJbml0Q2FsbGJhY2tcbn0gZnJvbSAnLi9nb2xkZW4tbGF5b3V0LnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgR29sZGVuTGF5b3V0Q29udGFpbmVyID0gbmV3IEluamVjdGlvblRva2VuKCdHb2xkZW5MYXlvdXRDb250YWluZXInKTtcbmV4cG9ydCBjb25zdCBHb2xkZW5MYXlvdXRDb21wb25lbnRTdGF0ZSA9IG5ldyBJbmplY3Rpb25Ub2tlbignR29sZGVuTGF5b3V0Q29tcG9uZW50U3RhdGUnKTtcbi8qKlxuICogVHlwZSBndWFyZCB3aGljaCBkZXRlcm1pbmVzIGlmIGEgY29tcG9uZW50IGltcGxlbWVudHMgdGhlIEdsT25SZXNpemUgaW50ZXJmYWNlLlxuICovXG5mdW5jdGlvbiBpbXBsZW1lbnRzR2xPblJlc2l6ZShvYmo6IGFueSk6IG9iaiBpcyBHbE9uUmVzaXplIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmouZ2xPblJlc2l6ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBUeXBlIGd1YXJkIHdoaWNoIGRldGVybWluZXMgaWYgYSBjb21wb25lbnQgaW1wbGVtZW50cyB0aGUgR2xPblNob3cgaW50ZXJmYWNlLlxuICovXG5mdW5jdGlvbiBpbXBsZW1lbnRzR2xPblNob3cob2JqOiBhbnkpOiBvYmogaXMgR2xPblNob3cge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5nbE9uU2hvdyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBUeXBlIGd1YXJkIHdoaWNoIGRldGVybWluZXMgaWYgYSBjb21wb25lbnQgaW1wbGVtZW50cyB0aGUgR2xPbkhpZGUgaW50ZXJmYWNlLlxuICovXG5mdW5jdGlvbiBpbXBsZW1lbnRzR2xPbkhpZGUob2JqOiBhbnkpOiBvYmogaXMgR2xPbkhpZGUge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5nbE9uSGlkZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBUeXBlIGd1YXJkIHdoaWNoIGRldGVybWluZXMgaWYgYSBjb21wb25lbnQgaW1wbGVtZW50cyB0aGUgR2xPblRhYiBpbnRlcmZhY2UuXG4gKi9cbmZ1bmN0aW9uIGltcGxlbWVudHNHbE9uVGFiKG9iajogYW55KTogb2JqIGlzIEdsT25UYWIge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5nbE9uVGFiID09PSAnZnVuY3Rpb24nO1xufVxuXG5jb25zdCBDT01QT05FTlRfUkVGX0tFWSA9ICckY29tcG9uZW50UmVmJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ29sZGVuLWxheW91dC1yb290JyxcbiAgc3R5bGVzOiBbYFxuICAgIC5uZy1nb2xkZW4tbGF5b3V0LXJvb3Qge1xuICAgICAgd2lkdGg6MTAwJTtcbiAgICAgIGhlaWdodDoxMDAlO1xuICAgIH1gXG4gIF0sXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5nLWdvbGRlbi1sYXlvdXQtcm9vdFwiICNnbHJvb3Q+PC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBHb2xkZW5MYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ29tcG9uZW50SW5pdENhbGxiYWNrRmFjdG9yeSB7XG4gIHByaXZhdGUgZ29sZGVuTGF5b3V0OiBHb2xkZW5MYXlvdXQ7XG4gIHByaXZhdGUgdG9wV2luZG93OiBXaW5kb3c7XG4gIHByaXZhdGUgaXNDaGlsZFdpbmRvdzogYm9vbGVhbjtcbiAgcHJpdmF0ZSB1bmxvYWRlZCA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2dscm9vdCcpIHByaXZhdGUgZWw6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBnbFNlcnZpY2U6IEdvbGRlbkxheW91dFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhcHByZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMudG9wV2luZG93ID0gZ2xTZXJ2aWNlLmdldFJvb3RXaW5kb3coKTtcbiAgICB0aGlzLmlzQ2hpbGRXaW5kb3cgPSBnbFNlcnZpY2UuaXNDaGlsZFdpbmRvdygpO1xuICAgIGlmICh0aGlzLmlzQ2hpbGRXaW5kb3cpIHtcbiAgICAgIHdpbmRvdy5kb2N1bWVudC50aXRsZSA9IHdpbmRvdy5kb2N1bWVudC5VUkw7XG4gICAgICAoY29uc29sZSBhcyBhbnkpLl9fbG9nID0gY29uc29sZS5sb2c7XG4gICAgICBjb25zb2xlLmxvZyA9IHRoaXMudG9wV2luZG93LmNvbnNvbGUubG9nO1xuICAgIH1cbiAgICBpZiAoaXNEZXZNb2RlKCkpIGNvbnNvbGUubG9nKGBDcmVhdGVAJHt0aGlzLmlzQ2hpbGRXaW5kb3cgPyAnY2hpbGQnIDogJ3Jvb3QnfSFgKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIGNvbnNvbGUubG9nKGBJbml0QCR7dGhpcy5pc0NoaWxkV2luZG93ID8gJ2NoaWxkJyA6ICdyb290J30hYCk7XG4gICAgbGV0IGFueVdpbiA9IHRoaXMudG9wV2luZG93IGFzIGFueTtcbiAgICBpZiAoIXRoaXMuaXNDaGlsZFdpbmRvdykge1xuICAgICAgYW55V2luLl9fYXBwcmVmcyA9IFtdO1xuICAgICAgYW55V2luLl9faW5qZWN0b3IgPSB0aGlzLmluamVjdG9yO1xuICAgIH1cblxuICAgIC8vIGF0dGFjaCB0aGUgYXBwbGljYXRpb24gcmVmZXJlbmNlIHRvIHRoZSByb290IHdpbmRvdywgc2F2ZSB0aGUgb3JpZ2luYWwgJ3RpY2snIG1ldGhvZFxuICAgIGFueVdpbi5fX2FwcHJlZnMucHVzaCh0aGlzLmFwcHJlZik7XG4gICAgKHRoaXMuYXBwcmVmIGFzIGFueSkuX190aWNrID0gdGhpcy5hcHByZWYudGljaztcblxuICAgIHRoaXMuYXBwcmVmLnRpY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGFyIG9mICh0aGlzLnRvcFdpbmRvdyBhcyBhbnkpLl9fYXBwcmVmcykge1xuICAgICAgICBhci5fem9uZS5ydW4oKCkgPT4gYXIuX190aWNrKCkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdsU2VydmljZS5nZXRTdGF0ZSgpLnRoZW4oKGxheW91dDogYW55KSA9PiB7XG4gICAgICB0aGlzLl9jcmVhdGVMYXlvdXQobGF5b3V0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIGNvbnNvbGUubG9nKGBEZXN0cm95QCR7dGhpcy5pc0NoaWxkV2luZG93ID8gJ2NoaWxkJyA6ICdyb290J30hYCk7XG4gICAgaWYgKHRoaXMuaXNDaGlsZFdpbmRvdykge1xuICAgICAgY29uc29sZS5sb2cgPSAoY29uc29sZSBhcyBhbnkpLl9fbG9nO1xuICAgIH1cbiAgICB0aGlzLnVubG9hZGVkID0gdHJ1ZTtcbiAgICAvLyByZXN0b3JlIHRoZSBvcmlnaW5hbCB0aWNrIG1ldGhvZC5cbiAgICAvLyB0aGlzIGFwcGVucyBpbiB0d28gY2FzZXM6XG4gICAgLy8gZWl0aGVyIHRoZSB3aW5kb3cgaXMgY2xvc2VkLCBhZnRlciB0aGF0IGl0J3Mgbm90IGltcG9ydGFudCB0byByZXN0b3JlIHRoZSB0aWNrIG1ldGhvZFxuICAgIC8vIG9yIHdpdGhpbiB0aGUgcm9vdCB3aW5kb3csIHdoZXJlIHdlIEhBVkUgdG8gcmVzdG9yZSB0aGUgb3JpZ2luYWwgdGljayBtZXRob2RcbiAgICB0aGlzLmFwcHJlZi50aWNrID0gKHRoaXMuYXBwcmVmIGFzIGFueSkuX190aWNrO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmJlZm9yZXVubG9hZCcpXG4gIHB1YmxpYyB1bmxvYWRIYW5kbGVyKCk6IHZvaWQge1xuICAgIGlmIChpc0Rldk1vZGUoKSkgY29uc29sZS5sb2coYFVubG9hZEAke3RoaXMuaXNDaGlsZFdpbmRvdyA/ICdjaGlsZCcgOiAncm9vdCd9YCk7XG4gICAgaWYgKHRoaXMudW5sb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy51bmxvYWRlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuaXNDaGlsZFdpbmRvdykgeyAvLyBpZiB0aGUgdG9wIHdpbmRvdyBpcyB1bmxvYWRlZCwgdGhlIHdob2xlIGFwcGxpY2F0aW9uIGlzIGRlc3Ryb3llZC5cbiAgICAgIGNvbnN0IGluZGV4ID0gKHRoaXMudG9wV2luZG93IGFzIGFueSkuX19hcHByZWZzLmluZGV4T2YodGhpcy5hcHByZWYpO1xuICAgICAgKHRoaXMudG9wV2luZG93IGFzIGFueSkuX19hcHByZWZzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlTGF5b3V0KGxheW91dDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5nb2xkZW5MYXlvdXQgPSBuZXcgR29sZGVuTGF5b3V0KGxheW91dCwgJCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpKTtcblxuICAgIC8vIFJlZ2lzdGVyIGFsbCBnb2xkZW4tbGF5b3V0IGNvbXBvbmVudHMuXG4gICAgdGhpcy5nbFNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLmdvbGRlbkxheW91dCwgdGhpcyk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBsYXlvdXQuXG4gICAgdGhpcy5nb2xkZW5MYXlvdXQuaW5pdCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ29sZGVuTGF5b3V0KSB7XG4gICAgICB0aGlzLmdvbGRlbkxheW91dC51cGRhdGVTaXplKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNyZWF0ZUNvbXBvbmVudEluaXRDYWxsYmFjayhjb21wb25lbnRUeXBlOiBUeXBlPGFueT4pOiBDb21wb25lbnRJbml0Q2FsbGJhY2sge1xuICAgIC8vIENhbid0IHVzZSBhbiBFUzYgbGFtYmRhIGhlcmUsIHNpbmNlIGl0IGlzIG5vdCBhIGNvbnN0cnVjdG9yXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250YWluZXI6IEdvbGRlbkxheW91dC5Db250YWluZXIsIGNvbXBvbmVudFN0YXRlOiBhbnkpIHtcbiAgICAgIHNlbGYubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgYW5ndWxhciBjb21wb25lbnQuXG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSBzZWxmLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRUeXBlKTtcbiAgICAgICAgY29uc3QgaW5qZWN0b3IgPSBzZWxmLl9jcmVhdGVDb21wb25lbnRJbmplY3Rvcihjb250YWluZXIsIGNvbXBvbmVudFN0YXRlKTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gc2VsZi52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCB1bmRlZmluZWQsIGluamVjdG9yKTtcblxuICAgICAgICAvLyBCaW5kIHRoZSBuZXcgY29tcG9uZW50IHRvIGNvbnRhaW5lcidzIGNsaWVudCBET00gZWxlbWVudC5cbiAgICAgICAgY29udGFpbmVyLmdldEVsZW1lbnQoKS5hcHBlbmQoJChjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCkpO1xuICAgICAgICBzZWxmLl9iaW5kRXZlbnRIb29rcyhjb250YWluZXIsIGNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XG4gICAgICAgIGNvbnRhaW5lci5vbignZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICAkKGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KS5yZW1vdmUoKTtcbiAgICAgICAgICBjb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbmplY3RvciBjYXBhYmxlIG9mIGluamVjdGluZyB0aGUgR29sZGVuTGF5b3V0IG9iamVjdCxcbiAgICogY29tcG9uZW50IGNvbnRhaW5lciwgYW5kIGluaXRpYWwgY29tcG9uZW50IHN0YXRlLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlQ29tcG9uZW50SW5qZWN0b3IoY29udGFpbmVyOiBHb2xkZW5MYXlvdXQuQ29udGFpbmVyLCBjb21wb25lbnRTdGF0ZTogYW55KTogSW5qZWN0b3Ige1xuICAgIHJldHVybiBJbmplY3Rvci5jcmVhdGUoW1xuICAgICAge1xuICAgICAgICBwcm92aWRlOiBHb2xkZW5MYXlvdXRDb250YWluZXIsXG4gICAgICAgIHVzZVZhbHVlOiBjb250YWluZXJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGU6IEdvbGRlbkxheW91dENvbXBvbmVudFN0YXRlLFxuICAgICAgICB1c2VWYWx1ZTogY29tcG9uZW50U3RhdGVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGU6IEdvbGRlbkxheW91dCxcbiAgICAgICAgdXNlVmFsdWU6IHRoaXMuZ29sZGVuTGF5b3V0XG4gICAgICB9LFxuICAgIF0sIHRoaXMuaW5qZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIGZvciBlYWNoIGltcGxlbWVudGVkIGhvb2suXG4gICAqIEBwYXJhbSBjb250YWluZXIgR29sZGVuIExheW91dCBjb21wb25lbnQgY29udGFpbmVyLlxuICAgKiBAcGFyYW0gY29tcG9uZW50IEFuZ3VsYXIgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfYmluZEV2ZW50SG9va3MoY29udGFpbmVyOiBHb2xkZW5MYXlvdXQuQ29udGFpbmVyLCBjb21wb25lbnQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChpbXBsZW1lbnRzR2xPblJlc2l6ZShjb21wb25lbnQpKSB7XG4gICAgICBjb250YWluZXIub24oJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50LmdsT25SZXNpemUoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpbXBsZW1lbnRzR2xPblNob3coY29tcG9uZW50KSkge1xuICAgICAgY29udGFpbmVyLm9uKCdzaG93JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnQuZ2xPblNob3coKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpbXBsZW1lbnRzR2xPbkhpZGUoY29tcG9uZW50KSkge1xuICAgICAgY29udGFpbmVyLm9uKCdoaWRlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnQuZ2xPbkhpZGUoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpbXBsZW1lbnRzR2xPblRhYihjb21wb25lbnQpKSB7XG4gICAgICBjb250YWluZXIub24oJ3RhYicsICh0YWIpID0+IHtcbiAgICAgICAgY29tcG9uZW50LmdsT25UYWIodGFiKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19