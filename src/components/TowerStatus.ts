import { Team } from "../mock/SmartContract";

@Component('towerStatus')
export default class TowerStatus {

  id: string;

  level: 1 | 2 | 3;

  activated: boolean = false;

  owner: string;

  health: number;

  team: Team;

  constructor(id: string) {
    this.id = id;
    this.level = 1;
    this.activated = true;
    this.health = 0;
    this.owner = null;
    this.team = null;
  }
}