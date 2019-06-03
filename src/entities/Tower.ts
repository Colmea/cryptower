import TowerStatus from "../components/TowerStatus";
import TowerInfo from "./TowerInfo";
import AttackEvent from "../events/AttackEvent";
import UIPanel from './UIPanel';

export default class Tower {

  MODEL_PATH: string = "models/tower.gltf";

  MODEL_SCALE: Vector3 =  new Vector3(0.1, 0.1, 0.1);

  eventManager: EventManager;

  id: string;

  entity = new Entity();

  infos: {
    activated: TowerInfo,
    health: TowerInfo,
    owner: TowerInfo,
    team: TowerInfo,
  };

  constructor(eventManager: EventManager, id: string, position: Vector3, rotation: Vector3) {
    this.eventManager = eventManager;
    this.id = id;

    // Load model
    let shape = new GLTFShape(this.MODEL_PATH);
    this.entity.addComponent(shape);

    // Position and rotation
    let transform = new Transform();
    transform.position = position;
    transform.rotation = Quaternion.Euler(rotation.x, rotation.y, rotation.z);

    // Scale
    transform.scale = this.MODEL_SCALE;

    this.entity.addComponent(transform);


    // Tower status
    const towerStatus = new TowerStatus(this.id)
    this.entity.addComponent(towerStatus);


    // TowerInfo
    this.infos = {
      health: new TowerInfo(this.entity, "Loading...", 1, Color3.Red()),
      activated: new TowerInfo(this.entity, "Activated", 2),
      owner: new TowerInfo(this.entity, "Owner: /", 3),
      team: new TowerInfo(this.entity, "Team: /", 4),
    };

    // Board
    const board = new UIPanel({
      text: "\nTower #452\n\nThis Tower can be attacked.\n\n(You need to be part\n of a team)",
      position: new Vector3(-15, 7, 0),
      textButton: 'ATTACK',
      onClick: this.handleClickBoard,
      scale: new Vector3(5, 5, 0.1),
  });
    board.entity.setParent(this.entity);


    // Add to engine
    engine.addEntity(this.entity);
  }

  handleClickBoard = () => {
    this.eventManager.fireEvent(new AttackEvent(this.id, '001'));
  }
}