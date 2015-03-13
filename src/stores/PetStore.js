import alt from 'MyAlt';
import petActions from 'actions/PetActions';

// named export
export class UnwrappedPetStore {
  constructor() {
    this.bindActions(petActions); // buyPet, sellPet

    this.pets = {hamsters: 2, dogs: 0, cats: 3};
    this.storeName = "Pete's Pets";
    this.revenue = 0;
  }

  onBuyPet({cost, pet}) {
    this.pets[pet]++;
    this.revenue -= this.roundMoney(cost);
  }

  onSellPet({price, pet}) {
    this.pets[pet]--;
    this.revenue += this.roundMoney(price);
  }

  // this is inaccessible from our alt wrapped store
  roundMoney(money) {
    // rounds to cents
    return Math.round(money * 100) / 100;
  }

  static getInventory() {
    return this.getState().pets;
  }
}

// default export
export default alt.createStore(UnwrappedPetStore, 'PetStore');
