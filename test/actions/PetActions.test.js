import alt from 'MyAlt';
import petActions from 'actions/PetActions';
import legalActions from 'actions/LegalActions';
// you can use any assertion lib you want
import {assert} from 'chai';
// we will use [sinon](http://sinonjs.org/docs/) for spying, but you can use any similar lib
import sinon from 'sinon';

describe('PetActions', function() {
  beforeEach(function() {
    // here we use sinon to create a spy on the alt.dispatcher.dispatch function
    this.dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
    this.illegalSpy = sinon.spy(legalActions, 'illegalPet');
  });

  afterEach(function() {
    // clean up our sinon spy so we do not affect other tests
    alt.dispatcher.dispatch.restore();
    legalActions.illegalPet.restore();
  });

  describe('#buyExoticPet', function() {
    it('dispatches correct data', function() {
      var pet = 'moose',
          cost = 18.20,
          totalCost = 1000 + cost,
          action = petActions.BUY_EXOTIC_PET;

      // fire the action
      petActions.buyExoticPet({pet, cost});
      // use our spy to see what payload the dispatcher was called with
      // this lets us ensure that the expected payload (with US dollars) was fired
      var dispatcherArgs = this.dispatcherSpy.args[0];
      var firstArg = dispatcherArgs[0];
      assert.equal(firstArg.action, action);
      assert.deepEqual(firstArg.data, {pet, cost: totalCost});
    });

    it('does not fire illegal action for legal pets', function() {
      var pet = 'dog',
          cost = 18.20;

      // fire the action
      petActions.buyExoticPet({pet, cost});
      // use our spy to ensure that the illegal action was NOT called
      assert.equal(this.illegalSpy.callCount, 0);
    });

    it('fires illegal action for illegal pets', function() {
      var pet = 'unicorn',
          cost = 18.20;

      // fire the action
      petActions.buyExoticPet({pet, cost});
      // use our spy to ensure that the illegal action was called
      assert(this.illegalSpy.calledOnce, 'the illegal action was not fired');
    });
  });
});
