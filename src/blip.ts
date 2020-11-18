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

  update(active: boolean = false, highlighted: boolean = false) {
    if (active) {
      if (!this.active) {
        this.active = true;
      }
      if (highlighted) {
        (this.material as THREE.MeshBasicMaterial).color = new THREE.Color(
          0xff0000
        );
      } else {
        (this.material as THREE.MeshBasicMaterial).color = new THREE.Color(
          0xaaaaaa
        );
      }
    } else if (!active && this.active) {
      this.active = false;
      (this.material as THREE.MeshBasicMaterial).color = new THREE.Color(
        0xaaaaaa
      );
    }
  }
}
