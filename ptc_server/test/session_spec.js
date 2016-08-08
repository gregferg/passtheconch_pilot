import {expect} from 'chai';

import {createSession, removeSession} from '../src/actions/session.js';

describe('Session Logic', () => {
  describe('Create Session', () => {
    it('creates a new user session', () => {
      let state = {users: {}};
      let action = { type: 'newSession', id: '1234'};
      let nextState = createSession(state, action);

      expect(nextState.users).to.deep.equal({
        '1234': {}
      });
    });

    it('preserves others sessions', () => {
      let state = {users: {'1234': {} }};
      let action = { type: 'newSession', id: '5678'};
      let nextState = createSession(state, action);

      expect(nextState.users).to.deep.equal({
        '1234': {},
        '5678': {}
      });
    });
  });

  describe('Remove Session', () => {
    it('removes a user session', () => {
      let state = {users: { '1234': {} }};
      let action = { type: 'removeSession', user: '1234'};

      let nextState = removeSession(state, action);

      expect(nextState.users).to.deep.equal({});
    });

    it('preserves others sessions', () => {
      let state = {users: { 'hello': {}, 'goodbye': {} }};
      let action = { type: 'removeSession', user: 'goodbye'};

      let nextState = removeSession(state, action);

      expect(nextState.users).to.deep.equal({
        'hello': {}
      });
    });
  });
});
