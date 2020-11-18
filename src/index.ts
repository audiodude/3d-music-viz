// add styles
import "./style.css";
// three.js
import * as THREE from "three";
import { MidiFile } from "midifile-ts";
import { getMidi } from "./midi";
import { Buffer } from "buffer/";

import { Blip } from "./blip";

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
const axis = new THREE.AxesHelper(10);

scene.add(axis);

// add lights
const light = new THREE.DirectionalLight(0xffffff, 1.0);

light.position.set(100, 100, 100);

scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff, 1.0);

light2.position.set(-100, 100, -100);

scene.add(light2);

const blip = new Blip();

scene.add(blip);

blip.position.x = 0.5;
blip.rotation.y = 0.5;

camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

camera.lookAt(scene.position);

function animate(): void {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

function update(): void {
  const timer = 0.002 * Date.now();
  blip.position.y = 0.5 + 0.5 * Math.sin(timer);
  blip.rotation.x += 0.1;
}

getMidi().then((midi: MidiFile) => {
  animate();
});
