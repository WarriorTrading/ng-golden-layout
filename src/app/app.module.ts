import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component, Injectable } from '@angular/core';
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
          // {
          //   type: 'component',
          //   componentName: 'roomlist',
          //   id: "app-roomlist",
          //   title: 'roomlist'
          // }
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
  ],
  providers: [GoldenLayoutService],
  bootstrap: [RootComponent]
})
export class AppModule {
}
