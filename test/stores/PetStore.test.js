import alt from 'MyAlt';
// wrappedPetStore is alt store, UnwrappedPetStore is UnwrappedPetStore class
import wrappedPetStore, {UnwrappedPetStore} from 'stores/PetStore';
import petActions from 'actions/PetActions';

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
    expect(wrappedPetStore.getState().revenue).toBe(oldRevenue - 10.22);
    expect(wrappedPetStore.getInventory().dogs).toBe(oldDogs + 1);
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
    expect(wrappedPetStore.getState().revenue).toBe(oldRevenue + 40.13);
    expect(wrappedPetStore.getInventory().dogs).toBe(oldDogs - 1);
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
    expect(unwrappedStore.roundMoney(21.221234)).toBe(21.22);
    expect(unwrappedStore.roundMoney(11.2561341)).toBe(11.26);
  });
});
