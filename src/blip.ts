import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

export class Blip extends THREE.Mesh {
  private readonly clock: THREE.Clock;
  active: boolean = false;
  private tweenUp: TWEEN.Tween<{ x: number; y: number; z: number }>;
  private tweenDown: TWEEN.Tween<{ x: number; y: number; z: number }>;

  constructor(pos: THREE.Vector3, clock: THREE.Clock) {
    super(
      new THREE.BoxGeometry(0.4, 0.4, 0.4),
      new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
        wireframe: true,
      })
    );
    this.position.copy(pos);
    this.clock = clock;
    this.setupTweens();
  }

  setupTweens() {
    const start = {
      x: this.position.x,
      y: this.position.y,
      z: this.position.z,
    };
    const end = {
      x: this.position.x,
      y: this.position.y + 1,
      z: this.position.z,
    };
    this.tweenUp = new TWEEN.Tween(start).to({ ...end }, 250);
    this.tweenUp.easing(TWEEN.Easing.Sinusoidal.In);
    this.tweenDown = new TWEEN.Tween(end).to({ ...start }, 250);
    this.tweenDown.easing(TWEEN.Easing.Sinusoidal.Out);
    this.tweenUp.onUpdate(() => {
      this.position.set(start.x, start.y, start.z);
    });
    this.tweenUp.chain(this.tweenDown);
    this.tweenDown.onUpdate(() => {
      this.position.set(end.x, end.y, end.z);
    });
    this.tweenDown.onComplete(() => {
      (this.material as THREE.MeshBasicMaterial).color = new THREE.Color(
        0xaaaaaa
      );
    });
  }

  update(active: boolean = false, highlighted: boolean = false) {
    if (active) {
      if (!this.active) {
        this.active = true;
        this.tweenUp.start();
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
    }
  }
}
