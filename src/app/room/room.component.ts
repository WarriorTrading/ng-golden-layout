import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  createdTime: Date;
  constructor() {
    this.createdTime = new Date()
  }

  ngOnInit() {
    console.info(`Room inited at ${this.createdTime}`)
  }

  ngOnDestroy() {
    console.info(`Will destroy room inited at ${this.createdTime}`)
  }
}
