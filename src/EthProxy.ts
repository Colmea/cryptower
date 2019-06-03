import SmartContract, { EventListener, Team } from "./mock/SmartContract";

export default class EthProxy {

  smartContract: SmartContract;

  constructor(eventListener: EventListener) {
    this.smartContract = new SmartContract(eventListener);
  }

  public getTowers() {
    return this.smartContract.getTowers();
  }

  attack(towerId: string, attacker: string) {
    this.smartContract.attack(towerId, attacker);
  }

  register(userId: string, team: Team) {
    const pseudo = `Player#` + Math.floor(Math.random() * 100);

    this.smartContract.register(userId, team, pseudo);
  }
}