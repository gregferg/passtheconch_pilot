import {expect} from 'chai';
import {List, Map} from 'immutable';

import {createSession, removeSession} from '../src/actions/session.js';

describe('Session Logic', () => {
  describe('Create Session', () => {
    it('creates a new user session', () => {
      let state = {users: {}};
      let nextState = createSession(state);

      expect(Object.keys(nextState.users)[0]).to.be.a('string');
    });

    it('preserves others sessions', () => {
      let state = {users: {'hello': {} }};
      let nextState = createSession(state);

      expect(nextState.users['hello']).to.deep.equal({});
    });
  });

  describe('Remove Session', () => {
    it('removes a user session', () => {
      let state = {users: { 'hello': {} }};
      let nextState = removeSession(state, 'hello');

      expect(nextState.users).to.deep.equal({});
    });

    it('preserves others sessions', () => {
      let state = {users: { 'hello': {}, 'goodbye': {} }};
      let nextState = removeSession(state, 'goodbye');

      expect(nextState.users['hello']).to.deep.equal({});
    });
  });
});
