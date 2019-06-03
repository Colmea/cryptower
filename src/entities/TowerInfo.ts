export default class TowerInfo {

  entity = new Entity();

  constructor(towerEntity: Entity, text: string, position: number = 1, color: Color3 = Color3.White()) {

    // Text
    let textShape = new TextShape(text);
    textShape.width = 20;
    textShape.fontSize = 40;
    textShape.fontWeight = 'bolder';
    textShape.color = color;
    this.entity.addComponent(textShape);

    // Position and scale
    let transform = new Transform();
    transform.position = new Vector3(0, 10 - position, 0);
    this.entity.addComponent(transform);

    engine.addEntity(this.entity);
    this.entity.setParent(towerEntity);
  }
}