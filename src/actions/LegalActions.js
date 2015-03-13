import alt from 'MyAlt';

export class LegalActions {
  constructor() {
    this.generateActions('illegalPet');
  }
}

export default alt.createActions(LegalActions);
