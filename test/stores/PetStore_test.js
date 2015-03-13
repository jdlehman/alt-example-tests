import alt from 'MyAlt';
// wrappedPetStore is alt store, UnwrappedPetStore is UnwrappedPetStore class
import wrappedPetStore, {UnwrappedPetStore} from 'stores/PetStore';
import petActions from 'actions/PetActions';
 // you can use any assertion library you want
import {assert} from 'chai';

describe('PetStore', () => {
  it('listens for buy a pet action', () => {
    // get initial state of store
    var oldRevenue = wrappedPetStore.getState().revenue,
        oldDogs = wrappedPetStore.getInventory().dogs;

    // create action to be dispatched
    var data = {cost: 10.223, pet: 'dogs'},
        action = petActions.BUY_PET;

    // dispatch action (store is listening for action)
    // NOTE: FB's dispatcher expects keys "action" and "data"
    alt.dispatcher.dispatch({action, data});

    // assertions
    assert.equal(wrappedPetStore.getState().revenue, oldRevenue - 10.22);
    assert.equal(wrappedPetStore.getInventory().dogs, oldDogs + 1);
  });

  it('listens for sell a pet action', () => {
    // get initial state of store
    var oldRevenue = wrappedPetStore.getState().revenue,
        oldDogs = wrappedPetStore.getInventory().dogs;

    // create action to be dispatched
    var data = {price: 40.125, pet: 'dogs'},
        action = petActions.SELL_PET;

    // dispatch action (store is listening for action)
    // NOTE: FB's dispatcher expects keys "action" and "data"
    alt.dispatcher.dispatch({action, data});

    // assertions
    assert.equal(wrappedPetStore.getState().revenue, oldRevenue + 40.13);
    assert.equal(wrappedPetStore.getInventory().dogs, oldDogs - 1);
  });

  // though we can see that this method is working from our tests above,
  // lets use this inaccessible method to show how we can test
  // non static methods if we desire/need to
  it('rounds money to 2 decimal places', function() {

    class TestPetStore extends UnwrappedPetStore {
      constructor() {
        super();
      }
      bindActions() {}
    }
    var unwrappedStore = new TestPetStore();
    assert.equal(unwrappedStore.roundMoney(21.221234), 21.22);
    assert.equal(unwrappedStore.roundMoney(11.2561341), 11.26);
  });
});
