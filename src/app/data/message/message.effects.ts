import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { fromEvent, EMPTY } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { MessageActions, MessageActionTypes } from './message.actions';

export const LocalStorageKey = '__bus.__message';

@Injectable()
export class MessageEffects {

  @Effect({ dispatch: true })
  onChange = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter(evt => evt.key === LocalStorageKey),
    filter(evt => evt.newValue !== null),
    map(evt => {
      const [{ type, payload }] = JSON.parse(evt.newValue);
      switch (type) {
        case MessageActionTypes.AddMessage:
          return { type: MessageActionTypes.AddMessageFromStorage, payload };
        default:
          return EMPTY;
      }
    }),
  );

  @Effect({ dispatch: false })
  storeActions = this.actions.pipe(
    ofType(
      MessageActionTypes.AddMessage
    ),
    tap(action => {
      const storedActions = window.localStorage.getItem(LocalStorageKey);
      
      console.log('storeActions =======', storedActions.length, action.type)
      const actions = storedActions ? JSON.parse(storedActions) : [];
      const newActions = (storedActions.length > 10000) ? [action] : [action, ...actions];
      window.localStorage.setItem(LocalStorageKey, JSON.stringify(newActions));
    }),
  );

  constructor(private actions: Actions<MessageActions>) {}
}