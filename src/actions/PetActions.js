import alt from 'MyAlt';
import legalActions from 'actions/LegalActions';

class PetActions {
  constructor() {
    // these we do not need to test as we trust alt tests `generateActions`
    this.generateActions('buyPet', 'sellPet');
  }

  // this action modifies the dispatched data AND calls another action
  buyExoticPet({pet, cost}) {
    var importCost = 1000,
        illegalAnimals = ['dragon', 'unicorn', 'cyclops'],
        // adds import charge to cost
        totalCost = importCost + cost;

    this.dispatch({
      pet,
      cost: totalCost
    });

    // checks if pet is legal
    if(illegalAnimals.indexOf(pet) >= 0) {
      legalActions.illegalPet(pet);
    }
  }
}

export default alt.createActions(PetActions);
