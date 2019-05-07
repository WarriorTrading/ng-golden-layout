import { Component, OnInit } from '@angular/core';
import {
  GoldenLayoutService,
} from '@warriortrading/ng-golden-layout';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  createdTime: Date;
  constructor(private srv: GoldenLayoutService) {
    this.createdTime = new Date()
  }

  ngOnInit() {
    console.info(`Room inited at ${this.createdTime}`)
    let item = this.srv.newestItem('component', 'room-');
    if (item != null) {
      console.debug('My id is', item.config.id, ', name is', item.config.title)
    }
  }

  ngOnDestroy() {
    console.info(`Will destroy room inited at ${this.createdTime}`)
  }
}
