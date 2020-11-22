import THREE = require('three');

export interface ClockLike {
  getDelta: () => number;
}

export class ConstantClock implements ClockLike {
  getDelta() {
    return 1 / 30; // 30 FPS
  }
}
