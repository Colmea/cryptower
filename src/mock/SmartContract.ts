declare var setTimeout;

export type Tower = {
  id: string;
  team: Team;
  health: number;
  owner: string;
  level: 1 | 2 | 3;
}

export type Player = {
  address: string;
  pseudo: string;
  team: Team;
}

export enum Team {
  RED = 'red',
  BLUE = 'blue',
  YELLOW = 'yellow',
}

export type EventListener = (name: string, data?: any) => void;

export enum ContractEvent {
  TOWER_STATUS_UPDATE = 'TowerStatusChanged',
}

export default class SmartContract {

  towers: { [key: string]: Tower } = {
    '001': {
      id: '001',
      team: Team.RED,
      health: 20,
      owner: 'Benoit',
      level: 1,
    }
  };

  players: { [key: string]: Player } = {};

  eventListener: EventListener;

  constructor(onEvent: EventListener = () => {}) {
    this.eventListener = onEvent;
  }

  fireOnUpdateEvent() {
    setTimeout(() => {
      this.eventListener('TowerStatusChanged', this.towers);
    }, 200);
  }

  getTowers() {
    return this.towers;
  }

  attack(towerId: string, attacker: string) {
    const tower = this.towers[towerId];
    const player = this.players[attacker];

    if (!tower || !player || (player && !player.team)) return;

    tower.health -= Math.floor(Math.random() * 10);

    if (tower.health <= 0) {
      tower.health = 0;
      tower.owner = attacker;
      tower.team = this.players[attacker].team;
    }

    this.fireOnUpdateEvent();
  }

  register(address: string, team: Team, pseudo?: string) {
    this.players[address] = {
      address,
      team,
      pseudo,
    };
  }

}