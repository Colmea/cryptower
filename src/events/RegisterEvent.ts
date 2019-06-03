import { Team } from "../mock/SmartContract";

@EventConstructor()
export default class RegisterEvent {
  constructor(public userId: string, public team: Team) {}
}