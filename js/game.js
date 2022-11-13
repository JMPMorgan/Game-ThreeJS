import * as THREE from "./three/three.module.js";
import { GLTFLoader } from "./three/GLTFLoader.js";
import { MTLLoader } from "./three/MTLLoader.js";
import { OBJLoader } from "./three/OBJLoader.js";
import { OrbitControls } from "./three/OrbitControls.js";
import { objects } from "./resources.js";

const canvas = document.querySelector("#game");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const glLoader = new GLTFLoader();
const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
});

const colisionObjetcs = [];

const positionCamara = {
  x: 0,
  y: 12,
  z: -15,
};

window.onload = async () => {
  for (let index = 0; index < objects.length; index++) {
    console.log(index);
    objects[index].isObj
      ? await loadObj(objects[index])
      : await loadGlb(objects[index]);
  }
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(2.5, 20, 10);
  scene.add(light);

  //Boiler Plate Code
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  camera.position.set(positionCamara.x, positionCamara.y, positionCamara.z);
  const busObj = scene.getObjectByName("camion", true);
  //HACIA DONDE ESTA VIENDO
  camera.lookAt(100, 0, 0);
  //HACIA DONDE ESTA ROTANDO
  camera.rotateY(-1.5);
  busObj.add(camera);

  //scene.add();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  animate();
};

const loadGlb = async ({
  url,
  scale,
  name,
  position = {},
  isCollapse = false,
  quantity,
  rotation,
  copyInX,
  distanceToCopy,
}) => {
  const response = await glLoader.loadAsync(url);
  const obj = response.scene;
  obj.scale.set(scale.x, scale.y, scale.z);
  obj.name = name;
  if (position.x) {
    obj.position.set(position.x, position.y, position.z);
  }
  if (isCollapse) {
    colisionObjetcs.push(obj);
  }
  if (rotation) {
    obj.rotateY(rotation);
  }
  if (quantity) {
    //Se pone esto para pasar su valor por copia no por referencia
    cloneObjects(quantity, { ...position }, obj, name);
    //image.png;
  }
  if (copyInX) {
    const objClone = obj.clone();
    distanceToCopy.x = distanceToCopy.x + position.x;
    distanceToCopy.y = distanceToCopy.y + position.y;
    distanceToCopy.z = distanceToCopy.z + position.z;
    objClone.position.set(distanceToCopy.x, distanceToCopy.y, distanceToCopy.z);
    cloneObjects(quantity, distanceToCopy, objClone, name);
  }
  scene.add(obj);
};

const loadObj = async ({
  url,
  objFile,
  mtlFile,
  position,
  scale,
  name,
  isCollapse,
  quantity,
  rotation,
  copyInX,
  distanceToCopy,
}) => {
  const mtlLoader = new MTLLoader();
  const objLoader = new OBJLoader();
  mtlLoader.setPath(url);
  const materials = await mtlLoader.loadAsync(mtlFile);
  console.log(materials);
  console.log(materials.materials);
  await materials.preload();
  objLoader.setPath(url);
  objLoader.setMaterials(materials);
  const obj = await objLoader.loadAsync(objFile);
  obj.scale.set(scale.x, scale.y, scale.z);
  obj.position.set(position.x, position.y, position.z);
  obj.name = name;
  if (position.x) {
    obj.position.set(position.x, position.y, position.z);
  }
  if (isCollapse) {
    colisionObjetcs.push(obj);
  }
  if (rotation) {
    obj.rotateY(rotation);
  }
  if (quantity) {
    //Se pone esto para pasar su valor por copia no por referencia
    cloneObjects(quantity, { ...position }, obj, name);
    //image.png;
  }
  if (copyInX === true) {
    const objClone = obj.clone();
    distanceToCopy.x = distanceToCopy.x + position.x;
    distanceToCopy.y = distanceToCopy.y + position.y;
    distanceToCopy.z = distanceToCopy.z + position.z;
    objClone.position.set(distanceToCopy.x, distanceToCopy.y, distanceToCopy.z);
    cloneObjects(quantity, distanceToCopy, objClone, name);
  }
  scene.add(obj);
};
function findType(object, type) {
  object.children.forEach((child) => {
    if (child.type === type) {
      console.log(child);
    }
    findType(child, type);
  });
}

function animate() {
  requestAnimationFrame(animate);
  const camion = scene.getObjectByName("camion");
  //console.log(colisionObjetcs);
  for (let index = 0; index < colisionObjetcs.length; index++) {
    const hasColision = detectColision(camion, colisionObjetcs[index]);
    hasColision ? console.log("Colision") : "";
  }
  renderer.render(scene, camera);
}

//Orbit Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.minDistance = 10;
orbitControls.maxDistance = 10;
orbitControls.enableZoom = true;

document.addEventListener("keydown", (event) => {
  const { keyCode } = event;
  const camion = scene.getObjectByName("camion", true);
  const deltaTime = 1;
  console.log(deltaTime);
  switch (keyCode) {
    case 87:
      camion.translateZ(1 * deltaTime);
      break;
    case 83:
      camion.translateZ(-1 * deltaTime);
      break;
    case 65:
      camion.translateX(-1 * deltaTime);
      break;
    case 68:
      camion.translateX(1 * deltaTime);
      break;

    default:
      break;
  }
});

const detectColision = (object1, object2) => {
  for (let x = 0; x < object1.children.length - 1; x++) {
    for (let y = 0; y < object2.children.length; y++) {
      object1.children[x].geometry.computeBoundingBox();
      object2.children[y].geometry.computeBoundingBox();
      object1.updateMatrixWorld();
      object2.updateMatrixWorld();
      const box1 = object1.children[x].geometry.boundingBox.clone();
      const box2 = object2.children[y].geometry.boundingBox.clone();
      box1.applyMatrix4(object1.matrixWorld);
      box2.applyMatrix4(object2.matrixWorld);
      if (box1.intersectsBox(box2)) return true;
    }
  }
  return false;
};

const cloneObjects = (quantity, position, objToClone, objectName) => {
  for (let index = 0; index < quantity; index++) {
    const obj = objToClone.clone();
    console.log(index);
    position.z += 5;
    //position.x += 0.25;
    obj.position.set(position.x, position.y, position.z);
    obj.name = `${objectName}${index + 1}`;
    colisionObjetcs.push(obj);
    scene.add(obj);
  }
};
