export type UIPanelOptions = {
  text: string;
  position: Vector3;
  rotation?: Vector3;
  scale?: Vector3;
  textButton: string;
  onClick: () => void;
}

export default class UIPanel {

  entity = new Entity();

  constructor(options: UIPanelOptions) {
    // Position and scale
    let transform = new Transform();
    transform.position = options.position || new Vector3(1, 1, 1);
    transform.scale = options.scale || new Vector3(1, 1, 1);
    transform.rotation.eulerAngles = options.rotation || new Vector3(0, 0, 0);
    this.entity.addComponent(transform);

    this.createPanel();
    this.createButton(options.textButton, options.onClick);
    this.createText(options.text);

    engine.addEntity(this.entity);
  }

  createPanel() {
    // Panel
    let panelEntity = new Entity();

    // Shape
    let panelShape = new BoxShape();
    panelEntity.addComponent(panelShape);

    // Position and scale
    let transform = new Transform();
    transform.scale = new Vector3(2, 2, 0.1);
    transform.position = new Vector3(0, 0, 0.06);
    panelEntity.addComponent(transform);

    panelEntity.setParent(this.entity);
  }

  createText(text: string) {
    // Text
    const entity = new Entity();
    const shape = new TextShape(text);
    shape.vTextAlign = 'top';
    shape.width = 2;
    shape.height = 2;
    shape.fontSize = 8;
    shape.fontWeight = 'bolder';
    shape.color = Color3.Blue();
    entity.addComponent(shape);

    entity.setParent(this.entity);
  }

  createButton(text: string, onClick: () => void) {
    // Button
    const entity = new Entity();

    // Shape
    entity.addComponent(new BoxShape());

    // Position and scale
    const transform = new Transform();
    transform.scale = new Vector3(1, 0.3, 0.05);
    transform.position = new Vector3(0, -0.5, 0);
    entity.addComponent(transform);

    // Material
    const material = new Material();
    material.albedoColor = Color3.Purple();
    material.metallic = 0.9;
    material.roughness = 0.1;
    entity.addComponent(material);

    // Text
    const textEntity = new Entity();
    const textShape = new TextShape(text);
    textShape.width = 2;
    textShape.height = 2;
    textShape.fontSize = 9;
    textShape.color = Color3.White();
    textShape.isPickable = false;
    textEntity.addComponent(textShape);

    // Text position and scale
    const transformText = new Transform();
    transformText.position = new Vector3(0, 0, -0.6);
    transformText.scale = new Vector3(1, 3, 1);
    textEntity.addComponent(transformText);
    textEntity.setParent(entity);

    // Click event
    entity.addComponent(
      new OnClick(e => {
        onClick();
      })
    );

    entity.setParent(this.entity);
  }
}