import {expect} from 'chai';
import {List, Map} from 'immutable';

import {validate} from '../src/actions/actionValidator.js';

describe('actionValidator', () => {
  describe('User Validations', () => {
    it('validates a correct new session action', () => {
      let action = {type: "newSession"};
      let valid = validate({},action);

      expect(valid).to.be.true;
    });

    it('validates a wrong new session action', () => {
      let action = {type: "neswSession"};
      let valid = validate({},action);

      expect(valid).to.be.false;
    });
  });

  describe('Story Validations', () => {
    describe('New Stories', () => {
      it('allows a new story action if user exists', () => {
        let action = {type: "newStory", user: "h12jklwelkjc"};
        let state = {
          users: {
            "h12jklwelkjc":{}
          }
        };
        let valid = validate(state, action);

        expect(valid).to.be.true;
      });

      it('Does not allows a new story action if no matching user exists', () => {
        let action = {type: "newStory", user: "h12jklwelkjc"};
        let state = {
          users: {
            "h12jddcewklwelkjc":{}
          }
        };
        let valid = validate(state, action);

        expect(valid).to.be.false;
      });

      it('allows a new story action if user does not have a currentStory', () => {
        let action = {type: "newStory", user: "h12jklwelkjc"};
        let state = {
          users: {
            "h12jklwelkjc":{}
          }
        };

        let valid = validate(state, action);

        expect(valid).to.be.true;
      });

      it('disallows a new story action if user has a currentStory', () => {
        let action = {type: "newStory", user: "h12jklwelkjc"};
        let state = {
          users: {
            "h12jklwelkjc":{
              currentStory: {
                id: 23,
                turn: false
              }
            }
          }
        };

        let valid = validate(state, action);

        expect(valid).to.be.false;
      });
    });

    describe('Update stories', () => {
      it('does not allow an unknown user to update a story', () => {
        let action = {
          type: "updateStory",
          user: "random",
          storyId: 1,
          sentence: 'my story now!'
        };
        let state = {
          users: {
            "notrandom":{currentStory: {id: 1, turn: false}},
            "other":{currentStory: {id: 1, turn: true}},
          },
          stories: {
            1: ['what up dawg', 'not much homie'],
          }
        };
        let valid = validate(state, action);

        expect(valid).to.be.false;
      });

      it('fails if no such story exists', () => {
        let action = {
          type: "updateStory",
          user: "random",
          storyId: 1,
          sentence: 'my story now!'
        };
        let state = {
          users: {
            "notrandom":{currentStory: {id: 1, turn: false}},
            "other":{currentStory: {id: 1, turn: true}},
          },
          stories: {
            34: ['what up dawg', 'not much homie'],
          }
        };
        let valid = validate(state, action);

        expect(valid).to.be.false;
      });

      it('does not allow an user to update a story when its not their turn', () => {
        let action = {
          type: "updateStory",
          user: "bob",
          storyId: 1,
          sentence: 'but I want to add another sentence!'
        };
        let state = {
          users: {
            "bob":{currentStory: {id: 1, turn: false}},
            "other":{currentStory: {id: 1, turn: true}},
          },
          stories: {
            1: ['what up dawg', 'not much homie'],
          }
        };
        let valid = validate(state, action);

        expect(valid).to.be.false;
      });

      it('validates a correct request', () => {
        let action = {
          type: "updateStory",
          user: "bob",
          storyId: 1,
          sentence: 'but I want to add another sentence!'
        };
        let state = {
          users: {
            "bob":{currentStory: {id: 1, turn: true}},
            "other":{currentStory: {id: 1, turn: false}},
          },
          stories: {
            1: ['what up dawg', 'not much homie'],
          }
        };
        let valid = validate(state, action);

        expect(valid).to.be.true;
      });
    });
  });
});
