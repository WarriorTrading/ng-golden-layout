import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { MessageEffects } from './data/message/message.effects';
import * as MessageReducer from './data/message/message.reducer';

import { NgModule, Component, Injectable } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as $ from 'jquery';
import {
  GoldenLayoutModule,
  GoldenLayoutService,
  GoldenLayoutConfiguration,
  MultiWindowService,
} from '@warriortrading/ng-golden-layout';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { RoomComponent } from './room/room.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  template: `<app-welcome></app-welcome>
  <golden-layout-root></golden-layout-root>`,
  selector: `app-root`,
})
export class RootComponent {
  constructor() {
    console.log("RootComponent constructor")
  }
}

const config: GoldenLayoutConfiguration = {
  components: [
    {
      component: RoomlistComponent,
      componentName: 'roomlist',
    },
    {
      component: RoomComponent,
      componentName: 'room',
    }
  ],
  defaultLayout: {
    content: [
      {
        type: "row",
        isClosable: false,
        content: [
        ]
      }
    ]
  }
}

@NgModule({
  declarations: [RootComponent, RoomlistComponent, RoomComponent, WelcomeComponent],
  entryComponents: [RoomlistComponent, RoomComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GoldenLayoutModule.forRoot(config),
    StoreModule.forRoot({}),
    StoreModule.forFeature('message', MessageReducer.reducer),
    EffectsModule.forRoot([MessageEffects]),
  ],
  providers: [GoldenLayoutService],
  bootstrap: [RootComponent]
})
export class AppModule {
}
