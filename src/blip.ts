import * as THREE from "three";

export class Blip extends THREE.Mesh {
  constructor(pos: THREE.Vector3) {
    const material = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true,
    });
    super(new THREE.BoxGeometry(0.1, 0.1, 0.1), material);
    this.position.copy(pos);
  }

  update() {
    const timer = 0.002 * Date.now();
    this.position.y = 0.5 + 0.5 * Math.sin(timer);
    this.rotation.x += 0.1;
  }
}
