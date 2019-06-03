import { Tower } from "../mock/SmartContract";

@EventConstructor()
export default class TowerStatusUpdateEvent {
  constructor(public towers:  { [key: string]: Tower }) {}
}