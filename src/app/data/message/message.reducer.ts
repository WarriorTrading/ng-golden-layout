import { MessageActions, MessageActionTypes } from './message.actions';
import { Message } from './message.model';
import { MessageState } from './message.state';
import * as _ from 'lodash';

export const initialState: MessageState = { messages: [] };

export function reducer(
  state = initialState,
  action: MessageActions
): MessageState {
  switch (action.type) {
    case MessageActionTypes.AddMessage:
    case MessageActionTypes.AddMessageFromStorage: {
      const {message} = action.payload;
      state.messages.push(message);

      return state;
    }

    default: {
      return state;
    }
  }
}