import { Type } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { GoldenLayoutConfiguration, ComponentConfiguration } from './config';
import { StateStore } from './state';
/**
 * golden-layout component initialization callback type.
 */
export interface ComponentInitCallback extends Function {
    (container: GoldenLayout.Container, componentState: any): void;
}
export interface ComponentInitCallbackFactory {
    createComponentInitCallback(component: Type<any>): ComponentInitCallback;
}
export declare class GoldenLayoutService {
    readonly config: GoldenLayoutConfiguration;
    private readonly stateStore;
    private _layout;
    constructor(config: GoldenLayoutConfiguration, stateStore: StateStore);
    initialize(goldenLayout: GoldenLayout, componentInitCallbackFactory: ComponentInitCallbackFactory): void;
    private _saveState;
    getState(): Promise<any>;
    getRegisteredComponents(): ComponentConfiguration[];
    getRegisteredComponent(name: string): ComponentConfiguration;
    childOfRoot(): GoldenLayout.ContentItem;
    addStack(parent: GoldenLayout.ContentItem, opt?: GoldenLayout.ItemConfig): GoldenLayout.ContentItem;
    addComponent(parent: GoldenLayout.ContentItem, comp: ComponentConfiguration, opt?: GoldenLayout.ItemConfig): GoldenLayout.ContentItem;
    currentConfig(): string;
    isChildWindow(): boolean;
    getRootWindow(): Window;
}
