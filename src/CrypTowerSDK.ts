import TowerSystem from './system/TowerSystem';
import Tower from './entities/Tower';
import GameEventManager from "./events/GameEventManager";
import UIPanel from "./entities/UIPanel";
import { Team } from "./mock/SmartContract";
import RegisterEvent from "./events/RegisterEvent";

export default class CrypTowerSDK {

  gameEventManager: GameEventManager;

  constructor() {
    this.gameEventManager = new GameEventManager();

    // Board Register Player
    // RED team
    const boardRed = new UIPanel({
      text: "\n\nJoin Team RED",
      position: new Vector3(12, 2, 5),
      rotation: new Vector3(0, 90, 0),
      textButton: 'JOIN',
      onClick: this.handleRegister.bind(null, Team.RED),
      scale: new Vector3(0.7, 0.7, 0.7),
    });

    // BLUE team
    const boardBlue = new UIPanel({
      text: "\n\nJoin Team BLUE",
      position: new Vector3(12, 2, 3),
      rotation: new Vector3(0, 90, 0),
      textButton: 'JOIN',
      onClick: this.handleRegister.bind(null, Team.BLUE),
      scale: new Vector3(0.7, 0.7, 0.7),
    });

    // YELLOW team
    const boardYellow = new UIPanel({
      text: "\n\nJoin Team YELLOW",
      position: new Vector3(12, 2, 7),
      rotation: new Vector3(0, 90, 0),
      textButton: 'JOIN',
      onClick: this.handleRegister.bind(null, Team.YELLOW),
      scale: new Vector3(0.7, 0.7, 0.7),
    });



    engine.addEntity(boardRed.entity);
    engine.addEntity(boardBlue.entity);
    engine.addEntity(boardYellow.entity);
  }

  addTower(id: string, position: Vector3, rotation: Vector3) {
    const tower1 = new Tower(this.gameEventManager.eventManager, id, position, rotation);

    engine.addSystem(new TowerSystem(tower1, this.gameEventManager.eventManager));

    this.gameEventManager.loadInitialState();
  }

  private handleRegister = (team: Team) => {
    log('join team ', team);
    this.gameEventManager.eventManager.fireEvent(new RegisterEvent('001', team));
  }
}