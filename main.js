import "./style.css";

import * as THREE from "three";

var scene, camera, renderer;
var element = document.getElementById("container");

init();
animate();

// Setup Function
function init() {
  // Setting up Scene, Renderer, Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
  camera.position.z = 150;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(1000, 1000);
  element.appendChild(renderer.domElement);

  // Magenta-Pink Pointlight
  var L1 = new THREE.PointLight(0xb887ed, 1.5);
  L1.position.z = 450;
  L1.position.y = 200;
  L1.position.x = 200;
  scene.add(L1);
  // Dark Purple Pointlight
  var L2 = new THREE.PointLight(0x436ce8, 1.5);
  L2.position.z = 450;
  L2.position.y = -150;
  L2.position.x = -200;
  scene.add(L2);

  let boxGeometry = new THREE.BoxGeometry(10, 10, 10);
  let cubeMaterials = [
    new THREE.MeshBasicMaterial({ color: "#CC8400" }), // orange
    new THREE.MeshBasicMaterial({ color: "#FF0000" }), // red
    new THREE.MeshBasicMaterial({ color: "#008000" }), // green
    new THREE.MeshBasicMaterial({ color: "#0000FF" }), // blue
    new THREE.MeshBasicMaterial({ color: "#FFFFF" }), // white
    new THREE.MeshBasicMaterial({ color: "#FFFF00" }), // yellow
  ];
  let material = new THREE.MeshFaceMaterial(cubeMaterials);
  let group = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        let box = new THREE.Mesh(boxGeometry, material);
        box.position.x = i * 11;
        box.position.y = j * 11;
        box.position.z = k * 11;
        group.add(box); // group em up
        box.userData.draggable = true;
        box.userData.name = "BOX";
      }
    }
  }
  group.userData.draggable = true;
  group.userData.name = "BOX";
  scene.add(group);
}

const raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2();
const moveMouse = new THREE.Vector2();
var draggable;

window.addEventListener('click', (event) => {
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children);
  if (found.length > 0 && found[0].object.userData.draggable) {
    draggable = found[0].object;
    console.log(`found dragable ${draggable.userData.name}`);
    console.log("found")
  }
});

// Animation Setup Function
function render() {
  var timer = Date.now() * 0.0001;
  for (var i = 0, l = scene.children.length; i < l; i++) {
    var object = scene.children[i];
    object.rotation.x = timer * 2;
    object.rotation.y = timer * 4;
  }
  renderer.render(scene, camera);
}

// Animate Function
function animate() {
  requestAnimationFrame(animate);
  render();
}
