import * as THREE from "three";
import { Vector3 } from "three";
import { Blip } from "./blip";

export class Strip extends THREE.Group {
  private blips: Blip[] = [];
  private readonly clock: THREE.Clock;
  private elapsed: number = 0;

  constructor(
    clock: THREE.Clock,
    start: number = 0,
    end: number = 8,
    n: number = 16
  ) {
    super();
    this.clock = clock;
    const inc = (end - start) / n;
    for (let i = 0; i < n; i++) {
      const blip = new Blip(new Vector3(0, 0, inc * i), clock);
      this.add(blip);
      this.blips.push(blip);
    }
  }

  update() {
    this.elapsed += this.clock.getDelta();
    if (this.elapsed > 2) {
      this.elapsed -= 2;
    }
    for (let i = 0; i < this.blips.length; i++) {
      const blip = this.blips[i];
      const active =
        this.elapsed >= i * 0.125 && this.elapsed < (i + 1) * 0.125;
      blip.update(active);
    }
  }
}
