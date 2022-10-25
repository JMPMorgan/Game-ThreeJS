const SCENE = new THREE.Scene();

var keyLight = new THREE.DirectionalLight(
  new THREE.Color("hsl(30, 100%, 75%)"),
  1.0
);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(
  new THREE.Color("hsl(240, 100%, 75%)"),
  0.75
);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

SCENE.add(keyLight);
SCENE.add(fillLight);
SCENE.add(backLight);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0xe4af17 });
const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });

let cube = new THREE.Mesh(geometry, [
  material,
  material2,
  material3,
  material,
  material2,
  material3,
]);

let house;
const objLoader = new THREE.OBJLoader();
const mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath("/assets/models/cabaña");
mtlLoader.load("/assets/models/cabaña/house.mtl", (materials) => {
  materials.preload();
  objLoader.setMaterials(materials);
});
objLoader.setPath("/assets/models/cabaña/");
objLoader.load("house.obj", (object) => {
  //object.position.y -= 50;
  object.position.z = -25;
  house = object;
  SCENE.add(object);
});
//mtlLoader.setTexturePath('/assets/models/');

SCENE.add(cube);

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  house.rotation.x += 0.05;
  house.rotation.y += 0.1;
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  RENDERER.render(SCENE, camera);
};

animate();
