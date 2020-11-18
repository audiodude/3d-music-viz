// add styles
import "./style.css";
// three.js
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { MidiFile } from "midifile-ts";
import { getMidi } from "./midi";
import { Buffer } from "buffer/";

import { Blip } from "./blip";
import { Strip } from "./strip";
import { Vector3 } from "three";
import { Impulse } from "./impulse";

// Polyfill nodejs Buffer.
(window as any).Buffer = Buffer;

// create the scene
const scene = new THREE.Scene();

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
const axis = new THREE.AxesHelper(16);

scene.add(axis);

// add lights
const light = new THREE.DirectionalLight(0xffffff, 1.0);

light.position.set(100, 100, 100);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff, 1.0);
light2.position.set(-100, 100, -100);
scene.add(light2);

const clock = new THREE.Clock();
let impulse;
const strip = new Strip(clock);
scene.add(strip);

camera.position.set(10, 10, 10);

camera.lookAt(scene.position);

function animate(): void {
  requestAnimationFrame(animate);
  TWEEN.update();
  const clockDelta = clock.getDelta();
  update(clockDelta);
  renderer.render(scene, camera);
}

function update(clockDelta: number): void {
  impulse.update(clockDelta);
  strip.update(clockDelta);
}

getMidi().then((midi: MidiFile) => {
  window.console.log(midi);
  impulse = new Impulse(midi, clock);
  strip.setImpulse(impulse);
  animate();
});
