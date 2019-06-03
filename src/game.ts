import UIPanel from './entities/UIPanel';

// Tower
const entity = new Entity();
let shape = new GLTFShape("models/tower.gltf");
entity.addComponent(shape);

const transform = new Transform();
transform.position =  new Vector3(8, 0, 8);
transform.scale = new Vector3(0.1, 0.1, 0.1);

entity.addComponent(transform);
engine.addEntity(entity);

// Panels
// RED team
const panelRedTeam = new UIPanel({
  text: "\n\nJoin Team RED",
  position: new Vector3(12, 2, 5),
  rotation: new Vector3(0, 90, 0),
  textButton: 'JOIN',
  onClick: () => log('Join RED team'),
  scale: new Vector3(0.7, 0.7, 0.7),
});

// BLUE team
const panelBlueTeam = new UIPanel({
  text: "\n\nJoin Team BLUE",
  position: new Vector3(12, 2, 3),
  rotation: new Vector3(0, 90, 0),
  textButton: 'JOIN',
  onClick: () => log('Join Blue team'),
  scale: new Vector3(0.7, 0.7, 0.7),
});

// YELLOW team
const panelYellowTeam = new UIPanel({
  text: "\n\nJoin Team YELLOW",
  position: new Vector3(12, 2, 7),
  rotation: new Vector3(0, 90, 0),
  textButton: 'JOIN',
  onClick: () => log('Join Yellow team'),
  scale: new Vector3(0.7, 0.7, 0.7),
});
