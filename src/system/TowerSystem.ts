import TowerStatus from "../components/TowerStatus";
import { Tower as TowerSmartContract } from '../mock/SmartContract';
import Tower from "../entities/Tower";
import TowerStatusUpdateEvent from "../events/TowerStatusUpdateEvent";

export default class TowerSystem {

  MAX_TOWER_HEIGHT: number = 102;

  MIN_TOWER_HEIGHT: number = 98;

  SCALING_FACTOR: float = 0.05;

  tower: Tower;
  eventManager: EventManager;

  currentHeight: number = 100;
  isIncreasing: boolean = true;

  constructor(tower: Tower, eventManager: EventManager) {
    this.tower = tower;
    this.eventManager = eventManager;

    // Listen to Tower Status update (mainly from Smart Contract)
    this.eventManager.addListener(TowerStatusUpdateEvent, null, ({ towers }) => {
      log("system received event", towers);
      if (towers[this.tower.id]) {
        this.onTowerStatusUpdate(towers[this.tower.id]);
      }
    });
  }

  update(dt: number) {
    const towerStatus = this.tower.entity.getComponent(TowerStatus);

    if (towerStatus.activated && towerStatus.health <= 0) {
      this.destroyTower();
    }

    if (towerStatus.activated) {
      this.updateScale();
    }

    this.updateTextInfo();
  }

  updateScale() {
    const transform = this.tower.entity.getComponent(Transform);

    // mutate the rotation
    transform.scale = new Vector3(0.1, this.currentHeight / 1000, 0.1);


    if (this.isIncreasing) {
      if (this.currentHeight >= this.MAX_TOWER_HEIGHT) {
        this.isIncreasing = false;
      }
      else {
        this.currentHeight += this.SCALING_FACTOR;
      }
    }
    else {
      if (this.currentHeight <= this.MIN_TOWER_HEIGHT) {
        this.isIncreasing = true;
      }
      else {
        this.currentHeight -= this.SCALING_FACTOR;
      }
    }
  }

  updateTextInfo() {
    const infos = this.tower.infos;
    const towerStatus = this.tower.entity.getComponent(TowerStatus);
    const activatedText = infos.activated.entity.getComponent(TextShape);
    const healthText = infos.health.entity.getComponent(TextShape);
    const ownerText = infos.owner.entity.getComponent(TextShape);
    const teamText = infos.team.entity.getComponent(TextShape);


    activatedText.value = towerStatus.activated ? 'Activated' : 'Inactive';
    healthText.value = this.renderHealthLabel(towerStatus.health);
    ownerText.value = towerStatus.owner ? `Owner: ${towerStatus.owner}` : 'Owner: /';
    teamText.value = towerStatus.team ? `Team: ${towerStatus.team}` : 'Team: /';
  }

  destroyTower() {
    const transform = this.tower.entity.getComponent(Transform);

    transform.scale = new Vector3(0.1, 0.05, 0.1);

    const towerStatus = this.tower.entity.getComponent(TowerStatus);

    towerStatus.owner = null;
  }

  onTowerStatusUpdate(newTowerStatus: TowerSmartContract) {
    const towerStatus = this.tower.entity.getComponent(TowerStatus);

    towerStatus.health = newTowerStatus.health;
    towerStatus.owner = newTowerStatus.owner;
    towerStatus.level = newTowerStatus.level;
    towerStatus.team = newTowerStatus.team;
  }

  private renderHealthLabel(health: number) {
    if (health <= 0) return '☠';

    let label = '';

    for (let i = 0; i < health; i++) {
      label += '❤';
    }

    return label;
  }
}