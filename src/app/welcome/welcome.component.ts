import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddMessage } from '../data/message/message.actions';

import {
  GoldenLayoutService,
} from '@warriortrading/ng-golden-layout';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private srv: GoldenLayoutService, private store: Store<{ messages: string[] }>) {
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

  saySomething() {
    let options = [
      'To read the state in another tab ...', 
      'The big difference here is that we don’t dispatch actions to rebuild the state.', 
      'We’re going to dispatch an action containing the whole state or a partial state as its payload.',
      'Knowing that our state is predictable because we’re using NgRx ...'
    ]

    let i = Math.round(Math.random() * 10000) % options.length
    let words = options[i]

    this.store.dispatch(
      new AddMessage({
        message: {text: words, sender: 'anonymous'}
      })
    );
  }
}
