import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Message } from '../data/message/message.model';

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
  messages$ = this.store.select(state => state.messages )
  constructor(private srv: GoldenLayoutService, private store: Store<{ messages: Message[] }>) {
    console.log("RoomComponent constructor")
    this.createdTime = new Date()
  }

  ngOnInit() {
    console.log("RoomComponent ngOnInit")
    console.info(`Room inited at ${this.createdTime}`)
    const ob = from(this.srv.waitForInited(2))
    ob.subscribe(inited => {
      if (inited) {
        let item = this.srv.newestItem('component', 'room-');
        if (item != null) {
          console.debug('My id is', item.config.id, ', name is', item.config.title)
        }
      } else {
        console.error("golden layout is not inited in 2 seconds");
      }
    })
  }

  ngOnDestroy() {
    console.info(`Will destroy room inited at ${this.createdTime}`)
  }
}
