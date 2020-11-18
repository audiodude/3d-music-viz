import * as THREE from "three";

export class Blip extends THREE.Mesh {
  constructor() {
    const material = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa,
      wireframe: true,
    });
    super(new THREE.BoxGeometry(1, 1, 1), material);
  }

  animate() {}
}
