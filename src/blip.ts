import * as THREE from "three";

export class Blip extends THREE.Mesh {
  private readonly clock: THREE.Clock;
  active: boolean = false;

  constructor(pos: THREE.Vector3, clock: THREE.Clock) {
    super(
      new THREE.BoxGeometry(0.1, 0.1, 0.1),
      new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
        wireframe: true,
      })
    );
    this.position.copy(pos);
    this.clock = clock;
  }

  update(active: boolean = false) {
    if (active && !this.active) {
      this.position.y += 1;
      this.active = true;
    } else if (!active && this.active) {
      this.position.y -= 1;
      this.active = false;
    }
  }
}
