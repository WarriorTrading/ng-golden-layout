import * as GoldenLayout from 'golden-layout';
import { InjectionToken, Inject, Injectable, Optional, isDevMode, ComponentFactoryResolver, HostListener, ViewContainerRef, Component, ApplicationRef, NgZone, Injector, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { __spread, __awaiter, __generator, __values } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
// WARNING: interface has both a type and a value, skipping emit
/** @type {?} */
var GoldenLayoutConfiguration = new InjectionToken('GoldenLayoutConfiguration');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var GoldenLayoutStateStore = new InjectionToken('GoldenLayoutStateStore');
/** @type {?} */
var DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY = '$ng-golden-layout-state';
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
/**
 * @return {?}
 */
function DEFAULT_LOCAL_STORAGE_STATE_STORE_FACTORY() {
    return new LocalStorageStateStore(DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY);
}
/** @type {?} */
var DEFAULT_LOCAL_STORAGE_STATE_STORE = new LocalStorageStateStore(DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY);
/** @type {?} */
var DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER = {
    provide: GoldenLayoutStateStore,
    useFactory: DEFAULT_LOCAL_STORAGE_STATE_STORE_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
        return __awaiter(this, void 0, void 0, function () {
            var nms, times, index;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var GoldenLayoutContainer = new InjectionToken('GoldenLayoutContainer');
/** @type {?} */
var GoldenLayoutComponentState = new InjectionToken('GoldenLayoutComponentState');
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
                for (var _b = __values(((/** @type {?} */ (_this.topWindow))).__apprefs), _c = _b.next(); !_c.done; _c = _b.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var GoldenLayoutModule = /** @class */ (function () {
    function GoldenLayoutModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    GoldenLayoutModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: GoldenLayoutModule,
            providers: [
                GoldenLayoutService,
                { provide: GoldenLayoutConfiguration, useValue: config }
            ]
        };
    };
    GoldenLayoutModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [GoldenLayoutComponent],
                    exports: [GoldenLayoutComponent],
                    imports: [CommonModule]
                },] }
    ];
    return GoldenLayoutModule;
}());

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
                rootWindow.__services.set(constr.name, new (storedConstr.bind.apply(storedConstr, __spread([void 0], args)))());
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