import { Component, OnInit } from '@angular/core';

import {
  GoldenLayoutModule,
  GoldenLayoutService,
  GoldenLayoutConfiguration,
  MultiWindowService,
} from '@warriortrading/ng-golden-layout';

import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss']
})


export class RoomlistComponent implements OnInit {
  constructor(private srv: GoldenLayoutService) { }

  openRoom(roomId: number) {
    const stackOpt = {
      type: 'stack',
      id: 'stack-room-' + roomId,
    }
    const componentOpt = {
      type: 'component',
      id: 'room-' + roomId,
      title: "room-" + roomId
    }

    const stack = this.srv.addStack(this.srv.childOfRoot(), stackOpt);
    this.srv.addComponent(stack, this.srv.getRegisteredComponent('room'), componentOpt);
  }

  debugGL() {
    console.log(this.srv.currentConfig());
  }

  ngOnInit() {
  }

}
