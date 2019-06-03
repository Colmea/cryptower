import EthProxy from "../EthProxy";
import AttackEvent from './AttackEvent';
import { Tower as TowerSmartContract, ContractEvent } from "../mock/SmartContract";
import TowerStatusUpdateEvent from "./TowerStatusUpdateEvent";
import RegisterEvent from "./RegisterEvent";

export default class GameEventManager {

  eventManager: EventManager;
  ethProxy: EthProxy;

  constructor() {
    this.eventManager = new EventManager();

    // Initialize Ethereum (Smart Contract) proxy
    // This allow us to interact with the smart contract and listen to events
    this.ethProxy = new EthProxy(this.onEthEvent);

    this.registerEventsListener();
  }

  private registerEventsListener() {
    // Attack event
    this.eventManager.addListener(AttackEvent, null, ({ towerId, attackerId }) => {
      log('Event attack', towerId, attackerId);
      this.ethProxy.attack(towerId, attackerId);
    });

    // Register event
    this.eventManager.addListener(RegisterEvent, null, ({ userId, team }) => {
      log('Event Register', userId, team);
      this.ethProxy.register(userId, team);
    });
  }

  public loadInitialState() {
    // Fetch current state from Smart Contract
    const towers = this.ethProxy.getTowers();

    // Trigger Tower Status Update event
    log('update status', towers);
    this.eventManager.fireEvent(new TowerStatusUpdateEvent(towers));
  }

  private onEthEvent = (eventName: string, eventData?: any) => {
    log('ETH event received', eventName, eventData);

    switch(eventName) {
      case ContractEvent.TOWER_STATUS_UPDATE:
        this.eventManager.fireEvent(new TowerStatusUpdateEvent(eventData));
    }
  }

}