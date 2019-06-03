@EventConstructor()
export default class AttackEvent {
  constructor(public towerId: string, public attackerId: string) {}
}