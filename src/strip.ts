import * as THREE from "three";
import { Vector3 } from "three";
import { Blip } from "./blip";

export class Strip extends THREE.Group {
  private blips: Blip[] = [];
  constructor(start: number = 0, end: number = 8, n: number = 16) {
    super();
    const inc = (end - start) / n;
    for (let i = 0; i < n; i++) {
      const blip = new Blip(new Vector3(0, 0, inc * i));
      this.add(blip);
      this.blips.push(blip);
    }
  }

  update() {
    this.blips.forEach((blip) => {
      blip.update();
    });
  }
}
