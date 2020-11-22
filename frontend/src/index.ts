// add styles
import './style.css';
// three.js
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { MidiFile } from 'midifile-ts';
import { getMidi } from './midi';
import { Buffer } from 'buffer/';

import { Strip } from './strip';
import { Impulse } from './impulse';
import { ClockLike, ConstantClock } from './clocklike';
import { CanvasCapture } from './capture';

// Polyfill nodejs Buffer.
(window as any).Buffer = Buffer;

// create the scene
const scene = new THREE.Scene();

const FPS = 60;
const realtime = false;
const capture = new CanvasCapture();

// create the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

// set size
renderer.setSize(window.innerWidth, window.innerHeight);

// add canvas to dom
document.body.appendChild(renderer.domElement);

// add axis to the scene
// const axis = new THREE.AxesHelper(16);
// scene.add(axis);

// add lights
const light = new THREE.DirectionalLight(0xffffff, 1.0);

light.position.set(100, 100, 100);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff, 1.0);
light2.position.set(-100, 100, -100);
scene.add(light2);

let time = TWEEN.now();
let clock: ClockLike;
if (!realtime) {
  clock = new ConstantClock();
} else {
  clock = new THREE.Clock();
}

let impulse;
const strip = new Strip();
scene.add(strip);

camera.position.set(8, 8, 8);

camera.lookAt(scene.position);

let playing = true;
function animate(): void {
  if (!playing) {
    scene.remove(strip);
  } else if (realtime) {
    window.setTimeout(() => requestAnimationFrame(animate), 1000 / FPS);
  }

  const clockDelta = clock.getDelta();
  time += clockDelta * 1000;
  TWEEN.update(time);
  update(clockDelta, time);
  renderer.render(scene, camera);
  if (playing && !realtime) {
    capture.captureFrame().then(() => {
      requestAnimationFrame(animate);
    });
  }
}

function update(clockDelta: number, time: number): void {
  playing = impulse.update(clockDelta, time);
  strip.update(clockDelta, time);
}

// Start by getting the MIDI, then begin animation.
getMidi().then((midi: MidiFile) => {
  // console.log(midi);
  impulse = new Impulse(midi);
  strip.setImpulse(impulse);
  animate();
});
