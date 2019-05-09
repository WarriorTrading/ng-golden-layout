import { Action } from '@ngrx/store';
import { Message } from './message.model';

export enum MessageActionTypes {
  AddMessage = '[Message] Add Message',
  AddMessageFromStorage = '[Message] Add Message from local storage',
}

export class AddMessage implements Action {
  readonly type = MessageActionTypes.AddMessage;
  constructor(public payload: { message: Message}) {}
}

export class AddMessageFromStorage implements Action {
  readonly type = MessageActionTypes.AddMessageFromStorage;
  constructor(public payload: { message: Message}) {}
}

export type MessageActions = 
  | AddMessage
  | AddMessageFromStorage

