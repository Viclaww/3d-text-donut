import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FlyControls, TrackballControls } from "three/examples/jsm/Addons.js";
// Import Three.js

// Create the scene
const scene = new THREE.Scene();

// Create a camera, which determines what we'll see when we render the scene
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Create a renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./static/img/matcap.jpg");
// FOnt

const fontLoader = new FontLoader();

fontLoader.load("./static/fonts/helvetiker_bold.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Victor Lawrence", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry.computeBoundingBox();
  textGeometry.center();
  //   textGeometry.position.x = -0.4;
  const textMaterial = new THREE.MeshMatcapMaterial({ map: texture });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(textMesh);
  const doughnutMaterial = new THREE.MeshMatcapMaterial({ map: texture });

  const doughnutGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 100);
  for (let i = 0; i < 200; i++) {
    const doughnut = new THREE.Mesh(doughnutGeometry, doughnutMaterial);

    doughnut.position.x = (Math.random() - 0.5) * 10;
    doughnut.position.y = (Math.random() - 0.5) * 10;
    doughnut.position.z = (Math.random() - 0.5) * 10;

    doughnut.rotation.x = Math.random() * Math.PI;
    doughnut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();

    doughnut.scale.set(scale, scale, scale);

    scene.add(doughnut);
  }
});

// Create a geometry and a material, then combine them into a mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// const controls = new OrbitControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
// Add the cube to the scene
// scene.add(cube);

// Create a render loop that will draw the scene every time the screen is refreshed
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube for some basic animation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  controls.update();

  renderer.render(scene, camera);
}

// Start the animation loop
animate();
