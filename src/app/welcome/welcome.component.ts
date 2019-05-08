import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {
  GoldenLayoutService,
} from '@warriortrading/ng-golden-layout';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private srv: GoldenLayoutService) {
    console.log("WelcomeComponent constructor")
   }

  ngOnInit() {
    console.log("WelcomeComponent ngOnInit")
  }

  addRoomList() {
    const ob = from(this.srv.waitForInited(2))
    ob.subscribe(inited => {
      if (inited) {
        this._addRoomList();
      } else {
        console.error("golden layout is not inited in 2 seconds");
      }
    })
  }

  _addRoomList() {
    const stackOpt = {
      type: 'stack',
      id: 'stack-roomlist',
    }
    const componentOpt = {
      type: 'component',
      id: 'component-roomlist',
      title: "roomlist"
    }

    const stack = this.srv.addStack(this.srv.childOfRoot(), stackOpt);
    this.srv.addComponent(stack, this.srv.getRegisteredComponent('roomlist'), componentOpt);
  }

  debugGL() {
    console.log(this.srv.currentConfig());
  }
}
