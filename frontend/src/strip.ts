import * as THREE from 'three';
import { Vector3 } from 'three';
import { Blip } from './blip';
import { Impulse } from './impulse';

export class Strip extends THREE.Group {
  private blips: Blip[] = [];
  private elapsed: number = 0;
  private impulse: Impulse;

  constructor(start: number = 0, end: number = 8, n: number = 16) {
    super();
    const inc = (end - start) / n;
    for (let i = 0; i < n; i++) {
      const blip = new Blip(new Vector3(0, 0, end - inc * (i + 1)));
      this.add(blip);
      this.blips.push(blip);
    }
  }

  setImpulse(impulse: Impulse) {
    this.impulse = impulse;
  }

  update(clockDelta: number, time: number) {
    this.elapsed += clockDelta;
    if (this.elapsed > 2) {
      // Hard sync after 16 sixteenth notes.
      this.elapsed = 0;
    }
    for (let i = 0; i < this.blips.length; i++) {
      const blip = this.blips[i];
      const active =
        // 120 BPM
        this.elapsed >= i * 0.125 && this.elapsed < (i + 1) * 0.125;
      const highlighted = this.impulse && this.impulse.on;
      blip.update(active, highlighted, time);
    }
  }
}
