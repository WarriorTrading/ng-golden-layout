import { Inject, Injectable, Type, Optional } from '@angular/core';
import { Subject, timer } from 'rxjs';
import * as GoldenLayout from 'golden-layout';
import { GoldenLayoutConfiguration, ComponentConfiguration } from './config';
import { GoldenLayoutStateStore, StateStore, LocalStorageStateStore } from './state';
import { setInterval } from 'timers';

/**
 * golden-layout component initialization callback type.
 */
export interface ComponentInitCallback extends Function {
  (container: GoldenLayout.Container, componentState: any): void;
}

export interface ComponentInitCallbackFactory {
  createComponentInitCallback(component: Type<any>): ComponentInitCallback;
}

@Injectable()
export class GoldenLayoutService {
  private _layout: GoldenLayout = null;

  constructor(@Inject(GoldenLayoutConfiguration) public readonly config: GoldenLayoutConfiguration,
              @Optional() @Inject(GoldenLayoutStateStore) private readonly stateStore: StateStore) {}

  public initialize(goldenLayout: GoldenLayout, componentInitCallbackFactory: ComponentInitCallbackFactory) {
    this._layout = goldenLayout;
    this.config.components.forEach((componentConfig: ComponentConfiguration) => {
      const componentInitCallback = componentInitCallbackFactory.createComponentInitCallback(componentConfig.component);
      goldenLayout.registerComponent(componentConfig.componentName, componentInitCallback);
    });

    if (this.stateStore) {
      (<GoldenLayout.EventEmitter>(<any>goldenLayout)).on('stateChanged', () => {
        this._saveState(goldenLayout);
      });
    }
  }

  private _saveState(goldenLayout: GoldenLayout): void {
    if (this.stateStore && goldenLayout.isInitialised) {
      try {
        this.stateStore.writeState(goldenLayout.toConfig());
      } catch(ex) {
        // Workaround for https://github.com/deepstreamIO/golden-layout/issues/192
      }
    }
  }

  public getState(): Promise<any>{
    if (this.stateStore) {
      return this.stateStore.loadState().catch(() => {
        return this.config.defaultLayout;
      });
    }

    return Promise.resolve(this.config.defaultLayout);
  }

  public isInited(): boolean {
    return this._layout != null && this._layout.isInitialised;
  }

  public async waitForInited(timeoutInSeconds: number) {
    let nms = 10;
    let times = Math.floor(timeoutInSeconds * 1000 / nms);
    times = (times < 1) ? 1 : times;

    for (let index = 0; index < times; index++) {
      if (this.isInited()) {
        return true;
      }

      await this.delay(nms)
    }

    return false;
  }

  private async delay(ms: number) {
    await new Promise( resolve => setTimeout(resolve, ms) );
  }

  public getRegisteredComponents(): ComponentConfiguration[] {
    return this.config.components;
  }

  public getRegisteredComponent(name: string): ComponentConfiguration {
    for (let index = 0; index < this.config.components.length; index++) {
      const component = this.config.components[index];
      if (component.componentName === name) {
        return component;
      }
    }
    return null;
  }

  public childOfRoot(): GoldenLayout.ContentItem {
    if (this._layout == null || this._layout.root == null ) {
      throw new Error("no root in layout");
    }
    if (this._layout.root.contentItems == null || this._layout.root.contentItems.length === 0) {
      throw new Error("no child in root ");
    }
    return this._layout.root.contentItems[0];
  }

  public addStack(parent: GoldenLayout.ContentItem, opt?: GoldenLayout.ItemConfig): GoldenLayout.ContentItem {
    
    if (parent == null) {
      throw new Error("cannot add stack to null item");
    }

    if (opt != null && opt.id != null && parent.getItemsById(opt.id).length > 0) {
      throw new Error(`there already exists a item with same id: ${opt.id} in parent!`);
    }
    
    // create stack item
    const stack = this._layout.createContentItem(Object.assign({type: 'stack'}, opt as any)) as any;

    parent.addChild(stack);
    return stack;
  }

  public addComponent(parent: GoldenLayout.ContentItem, comp: ComponentConfiguration, opt?: GoldenLayout.ItemConfig) : GoldenLayout.ContentItem {
    
    if (parent == null) {
      throw new Error("cannot add component to null item");
    }

    if (opt != null && opt.id != null && parent.getItemsById(opt.id).length > 0) {
      throw new Error(`there already exists a item with same id: ${opt.id} in parent!`);
    }

    // create content item
    const content = this._layout.createContentItem(Object.assign({type: 'component', componentName: comp.componentName }, opt as any)) as any;

    parent.addChild(content);

    return content;
  }

  public currentConfig(): string {
    return JSON.stringify(this._layout.toConfig(), null, 2)
  }

  public isChildWindow(): boolean {
    return !!window.opener;
  }

  public getRootWindow(): Window {
    return window.opener || window;
  }
}
