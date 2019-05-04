import * as GoldenLayout from 'golden-layout';
import { InjectionToken, Inject, Injectable, Optional, isDevMode, ComponentFactoryResolver, HostListener, ViewContainerRef, Component, ApplicationRef, NgZone, Injector, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
// WARNING: interface has both a type and a value, skipping emit
/** @type {?} */
const GoldenLayoutConfiguration = new InjectionToken('GoldenLayoutConfiguration');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const GoldenLayoutStateStore = new InjectionToken('GoldenLayoutStateStore');
/** @type {?} */
const DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY = '$ng-golden-layout-state';
class LocalStorageStateStore {
    /**
     * @param {?} key
     */
    constructor(key) {
        this.key = key;
    }
    /**
     * @param {?} state
     * @return {?}
     */
    writeState(state) {
        localStorage.setItem(this.key, JSON.stringify(state));
    }
    /**
     * @return {?}
     */
    loadState() {
        /** @type {?} */
        const state = localStorage.getItem(this.key);
        return state
            ? Promise.resolve(JSON.parse(state))
            : Promise.reject(`No state found using key: ${this.key}`);
    }
}
/**
 * @return {?}
 */
function DEFAULT_LOCAL_STORAGE_STATE_STORE_FACTORY() {
    return new LocalStorageStateStore(DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY);
}
/** @type {?} */
const DEFAULT_LOCAL_STORAGE_STATE_STORE = new LocalStorageStateStore(DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY);
/** @type {?} */
const DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER = {
    provide: GoldenLayoutStateStore,
    useFactory: DEFAULT_LOCAL_STORAGE_STATE_STORE_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class GoldenLayoutService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const GoldenLayoutContainer = new InjectionToken('GoldenLayoutContainer');
/** @type {?} */
const GoldenLayoutComponentState = new InjectionToken('GoldenLayoutComponentState');
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
class GoldenLayoutComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class GoldenLayoutModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: GoldenLayoutModule,
            providers: [
                GoldenLayoutService,
                { provide: GoldenLayoutConfiguration, useValue: config }
            ]
        };
    }
}
GoldenLayoutModule.decorators = [
    { type: NgModule, args: [{
                declarations: [GoldenLayoutComponent],
                exports: [GoldenLayoutComponent],
                imports: [CommonModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function MultiWindowInit() {
    if (!window.opener) {
        ((/** @type {?} */ (window))).__services = new ((/** @type {?} */ (window))).Map();
        ((/** @type {?} */ (window))).__serviceConstructors = new ((/** @type {?} */ (window))).Map();
    }
}
/**
 * @template T
 * @return {?}
 */
function MultiWindowService() {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { GoldenLayoutConfiguration, GoldenLayoutContainer, GoldenLayoutComponentState, GoldenLayoutComponent, GoldenLayoutService, GoldenLayoutModule, DEFAULT_LOCAL_STORAGE_STATE_STORE_FACTORY, GoldenLayoutStateStore, DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY, LocalStorageStateStore, DEFAULT_LOCAL_STORAGE_STATE_STORE, DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER, MultiWindowInit, MultiWindowService };

//# sourceMappingURL=warriortrading-ng-golden-layout.js.map