(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/@warriortrading/ng-golden-layout/fesm2015/warriortrading-ng-golden-layout.js":
/*!*******************************************************************************************!*\
  !*** ./dist/@warriortrading/ng-golden-layout/fesm2015/warriortrading-ng-golden-layout.js ***!
  \*******************************************************************************************/
/*! exports provided: GoldenLayoutConfiguration, GoldenLayoutContainer, GoldenLayoutComponentState, GoldenLayoutComponent, GoldenLayoutService, GoldenLayoutModule, DEFAULT_LOCAL_STORAGE_STATE_STORE_FACTORY, GoldenLayoutStateStore, DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY, LocalStorageStateStore, DEFAULT_LOCAL_STORAGE_STATE_STORE, DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER, MultiWindowInit, MultiWindowService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoldenLayoutConfiguration", function() { return GoldenLayoutConfiguration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoldenLayoutContainer", function() { return GoldenLayoutContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoldenLayoutComponentState", function() { return GoldenLayoutComponentState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoldenLayoutComponent", function() { return GoldenLayoutComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoldenLayoutService", function() { return GoldenLayoutService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoldenLayoutModule", function() { return GoldenLayoutModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LOCAL_STORAGE_STATE_STORE_FACTORY", function() { return DEFAULT_LOCAL_STORAGE_STATE_STORE_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoldenLayoutStateStore", function() { return GoldenLayoutStateStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY", function() { return DEFAULT_LOCAL_STORAGE_STATE_STORE_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorageStateStore", function() { return LocalStorageStateStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LOCAL_STORAGE_STATE_STORE", function() { return DEFAULT_LOCAL_STORAGE_STATE_STORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER", function() { return DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiWindowInit", function() { return MultiWindowInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiWindowService", function() { return MultiWindowService; });
/* harmony import */ var golden_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! golden-layout */ "./node_modules/golden-layout/dist/goldenlayout.js");
/* harmony import */ var golden_layout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(golden_layout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
// WARNING: interface has both a type and a value, skipping emit
/** @type {?} */
const GoldenLayoutConfiguration = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('GoldenLayoutConfiguration');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const GoldenLayoutStateStore = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('GoldenLayoutStateStore');
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
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
];
/** @nocollapse */
GoldenLayoutService.ctorParameters = () => [
    { type: GoldenLayoutConfiguration, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [GoldenLayoutConfiguration,] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [GoldenLayoutStateStore,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const GoldenLayoutContainer = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('GoldenLayoutContainer');
/** @type {?} */
const GoldenLayoutComponentState = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('GoldenLayoutComponentState');
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
        if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])())
            console.log(`Create@${this.isChildWindow ? 'child' : 'root'}!`);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])())
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
        if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])())
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
        if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])())
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
        this.goldenLayout = new golden_layout__WEBPACK_IMPORTED_MODULE_0__(layout, $(this.el.nativeElement));
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
        return _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"].create([
            {
                provide: GoldenLayoutContainer,
                useValue: container
            },
            {
                provide: GoldenLayoutComponentState,
                useValue: componentState
            },
            {
                provide: golden_layout__WEBPACK_IMPORTED_MODULE_0__,
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
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
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
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ApplicationRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"] }
];
GoldenLayoutComponent.propDecorators = {
    el: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['glroot',] }],
    unloadHandler: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['window:beforeunload',] }],
    onResize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['window:resize', ['$event'],] }]
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
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                declarations: [GoldenLayoutComponent],
                exports: [GoldenLayoutComponent],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]]
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



//# sourceMappingURL=warriortrading-ng-golden-layout.js.map

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: RootComponent, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootComponent", function() { return RootComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _warriortrading_ng_golden_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @warriortrading/ng-golden-layout */ "./dist/@warriortrading/ng-golden-layout/fesm2015/warriortrading-ng-golden-layout.js");
/* harmony import */ var _roomlist_roomlist_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./roomlist/roomlist.component */ "./src/app/roomlist/roomlist.component.ts");
/* harmony import */ var _room_room_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./room/room.component */ "./src/app/room/room.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let RootComponent = class RootComponent {
    constructor() {
    }
};
RootComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        template: `<div class="spawn-new"></div><golden-layout-root></golden-layout-root>`,
        selector: `app-root`,
    }),
    __metadata("design:paramtypes", [])
], RootComponent);

const config = {
    components: [
        {
            component: _roomlist_roomlist_component__WEBPACK_IMPORTED_MODULE_4__["RoomlistComponent"],
            componentName: 'roomlist',
        },
        {
            component: _room_room_component__WEBPACK_IMPORTED_MODULE_5__["RoomComponent"],
            componentName: 'room',
        }
    ],
    defaultLayout: {
        content: [
            {
                type: "row",
                isClosable: false,
                content: [
                    {
                        type: 'component',
                        componentName: 'roomlist',
                        id: "app-roomlist",
                        title: 'roomlist'
                    }
                ]
            }
        ]
    }
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [RootComponent, _roomlist_roomlist_component__WEBPACK_IMPORTED_MODULE_4__["RoomlistComponent"], _room_room_component__WEBPACK_IMPORTED_MODULE_5__["RoomComponent"]],
        entryComponents: [_roomlist_roomlist_component__WEBPACK_IMPORTED_MODULE_4__["RoomlistComponent"], _room_room_component__WEBPACK_IMPORTED_MODULE_5__["RoomComponent"]],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
            _warriortrading_ng_golden_layout__WEBPACK_IMPORTED_MODULE_3__["GoldenLayoutModule"].forRoot(config),
        ],
        providers: [_warriortrading_ng_golden_layout__WEBPACK_IMPORTED_MODULE_3__["GoldenLayoutService"]],
        bootstrap: [RootComponent]
    })
], AppModule);



/***/ }),

/***/ "./src/app/room/room.component.html":
/*!******************************************!*\
  !*** ./src/app/room/room.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  room inited at {{ createdTime }}\n</p>\n"

/***/ }),

/***/ "./src/app/room/room.component.scss":
/*!******************************************!*\
  !*** ./src/app/room/room.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Jvb20vcm9vbS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/room/room.component.ts":
/*!****************************************!*\
  !*** ./src/app/room/room.component.ts ***!
  \****************************************/
/*! exports provided: RoomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomComponent", function() { return RoomComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let RoomComponent = class RoomComponent {
    constructor() {
        this.createdTime = new Date();
    }
    ngOnInit() {
        console.info(`Room inited at ${this.createdTime}`);
    }
    ngOnDestroy() {
        console.info(`Will destroy room inited at ${this.createdTime}`);
    }
};
RoomComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-room',
        template: __webpack_require__(/*! ./room.component.html */ "./src/app/room/room.component.html"),
        styles: [__webpack_require__(/*! ./room.component.scss */ "./src/app/room/room.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], RoomComponent);



/***/ }),

/***/ "./src/app/roomlist/roomlist.component.html":
/*!**************************************************!*\
  !*** ./src/app/roomlist/roomlist.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  roomlist works!\n  <ul>\n    <li (click)=\"openRoom(1)\">\n      <div>room01</div>\n    </li>\n  </ul>\n  <ul>\n    <li (click)=\"openRoom(2)\">\n      <div>room02</div>\n    </li>\n  </ul>\n  <ul>\n    <li (click)=\"openRoom(3)\">\n      <div>room03</div>\n    </li>\n  </ul>\n\n  <ul>\n    <li (click)=\"debugGL()\">\n      <div>LogGLConfig</div>\n    </li>\n  </ul>\n</div>\n"

/***/ }),

/***/ "./src/app/roomlist/roomlist.component.scss":
/*!**************************************************!*\
  !*** ./src/app/roomlist/roomlist.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Jvb21saXN0L3Jvb21saXN0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/roomlist/roomlist.component.ts":
/*!************************************************!*\
  !*** ./src/app/roomlist/roomlist.component.ts ***!
  \************************************************/
/*! exports provided: RoomlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomlistComponent", function() { return RoomlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _warriortrading_ng_golden_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @warriortrading/ng-golden-layout */ "./dist/@warriortrading/ng-golden-layout/fesm2015/warriortrading-ng-golden-layout.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let RoomlistComponent = class RoomlistComponent {
    constructor(srv) {
        this.srv = srv;
    }
    openRoom(roomId) {
        const stackOpt = {
            type: 'stack',
            id: 'stack-room-' + roomId,
        };
        const componentOpt = {
            type: 'component',
            id: 'room-' + roomId,
            title: "room-" + roomId
        };
        const stack = this.srv.addStack(this.srv.childOfRoot(), stackOpt);
        this.srv.addComponent(stack, this.srv.getRegisteredComponent('room'), componentOpt);
    }
    debugGL() {
        console.log(this.srv.currentConfig());
    }
    ngOnInit() {
    }
};
RoomlistComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-roomlist',
        template: __webpack_require__(/*! ./roomlist.component.html */ "./src/app/roomlist/roomlist.component.html"),
        styles: [__webpack_require__(/*! ./roomlist.component.scss */ "./src/app/roomlist/roomlist.component.scss")]
    }),
    __metadata("design:paramtypes", [_warriortrading_ng_golden_layout__WEBPACK_IMPORTED_MODULE_1__["GoldenLayoutService"]])
], RoomlistComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false,
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _warriortrading_ng_golden_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @warriortrading/ng-golden-layout */ "./dist/@warriortrading/ng-golden-layout/fesm2015/warriortrading-ng-golden-layout.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_5__);






if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_warriortrading_ng_golden_layout__WEBPACK_IMPORTED_MODULE_4__["MultiWindowInit"])();
window['$'] = jquery__WEBPACK_IMPORTED_MODULE_5__;
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.log(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/liuleidong/Wt/Hermes/ng-golden-layout/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map