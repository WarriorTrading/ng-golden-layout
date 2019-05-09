import { MessageActions, MessageActionTypes } from './message.actions';
import { Message } from './message.model';
import * as _ from 'lodash';

export const initialState: Message[] = [];

export function reducer(
  state = initialState,
  action: MessageActions
): Message[] {
  switch (action.type) {
    case MessageActionTypes.AddMessage:
    case MessageActionTypes.AddMessageFromStorage: {
      const {message} = action.payload;
      state.push(message);

      return state;
    }

    default: {
      return state;
    }
  }
}