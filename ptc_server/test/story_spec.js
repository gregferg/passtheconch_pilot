import {expect} from 'chai';

import {createStory, updateStory, removeStory} from '../src/actions/story.js';


describe('Story Logic', () => {
  describe('createStory', () => {
    it('increases the story counter', () => {
      let state = {'storyCounter': 0};
      let action = { users: ['h12jklwelkjc', 'c'] };
      let nextState = createStory(state, action);


      expect(nextState.storyCounter).to.equal(1);
    });

    it('adds a story to the state', () => {
      let state = {'storyCounter': 0};
      let action = { users: ['h12jklwelkjc', 'c'] };
      let nextState = createStory(state, action);

      expect(nextState.stories).to.deep.equal(
        {1: { users: ['h12jklwelkjc', 'c'], story: [] } }
      );
    });

    it('adds storyID to each users currentStory', () => {
      let state = {'storyCounter': 0, users: {"h12jklwelkjc":{}, "c":{}}};
      let action = { users: ['h12jklwelkjc', 'c'] };
      let nextState = createStory(state, action);

      expect(nextState.users).to.deep.equal(
        {
          "h12jklwelkjc": {currentStory: {id: 1, turn: false}},
          "c": {currentStory: {id: 1, turn: true}}
        }
      );
    });

    it('works when there is already data in state', () => {
      let state = {
        'storyCounter': 8,
        users: {
          "h12jklwelkjc":{},
          "c":{},
          "h12jkelkjc":{},
          "d":{},
        },
        stories: {
          1: [],
          2: [],
          5: []
        }
      };
      let action = { users: ['h12jklwelkjc', 'c'] };
      let nextState = createStory(state, action);

      expect(nextState).to.deep.equal(
        {
          'storyCounter': 9,
          users: {
            "h12jklwelkjc":{currentStory: {id: 9, turn: false}},
            "c":{currentStory: {id: 9, turn: true}},
            "h12jkelkjc":{},
            "d":{},
          },
          stories: {
            1: [],
            2: [],
            5: [],
            9: { users: ['h12jklwelkjc', 'c'], story: [] }
          }
        }
      );
    });
  });

  describe('Update Story', () => {
    it('updates the story', () => {
      let state = {
        'storyCounter': 1,
        users: {
          "hello":{currentStory: {id: 1, turn: false}},
          "goodbye":{currentStory: {id: 1, turn: true}},
        },
        stories: {
          1: { users: ['hello', 'goodbye'], story: [] },
        }
      };
      let action = {
        user: 'hello',
        sentence: 'oh god',
        storyId: 1
      };
      let nextState = updateStory(state, action);

      expect(nextState.stories[1].story).to.deep.equal(['oh god']);
    });

    it('updates the story more!', () => {
      let state = {
        users: {
          "hello":{currentStory: {id: 1, turn: false}},
          "goodbye":{currentStory: {id: 1, turn: true}},
        },
        stories: {
          1: { users: ['hello', 'goodbye'], story: ['what up dawg', 'not much homie'] },
        }
      };
      let action = {
        user: 'hello',
        sentence: 'oh god',
        storyId: 1
      };
      let nextState = updateStory(state, action);

      expect(nextState.stories[1].story).to.deep.equal(['what up dawg', 'not much homie','oh god']);
    });

    it('Switches User\'s turns', () => {
      let state = {
        users: {
          "hello":{currentStory: {id: 1, turn: true}},
          "goodbye":{currentStory: {id: 1, turn: false}},
        },
        stories: {
          1: { users: ['hello', 'goodbye'], story: [] },
        }
      };
      let action = {
        user: 'hello',
        sentence: 'oh god',
        storyId: 1
      };
      let nextState = updateStory(state, action);

      expect(nextState.users).to.deep.equal({
        "hello":{currentStory: {id: 1, turn: false}},
        "goodbye":{currentStory: {id: 1, turn: true}},
      });
    });
  });

  describe('Remove Story', () => {
    it('removes the story', () => {
      let state = {
        'storyCounter': 1,
        users: {
          "hello":{currentStory: {id: 1, turn: false}},
          "goodbye":{currentStory: {id: 1, turn: true}},
        },
        stories: {
          1: { users: ['hello', 'goodbye'], story: [] },
        }
      };
      let action = {
        type: 'removeStory',
        storyId: 1
      };
      let nextState = removeStory(state, action);

      expect(nextState.stories).to.deep.equal({});
    });

    it('removes currentStory from both users', () => {
      let state = {
        users: {
          "hello":{currentStory: {id: 1, turn: false}},
          "goodbye":{currentStory: {id: 1, turn: true}},
        },
        stories: {
          1: { users: ['hello', 'goodbye'], story: [] },
        }
      };
      let action = {
        type: 'removeStory',
        storyId: 1
      };
      let nextState = removeStory(state, action);

      expect(nextState.users).to.deep.equal({
          "hello":{},
          "goodbye":{}
      });
    });
  });
});
