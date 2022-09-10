const SCENE = new THREE.Scene();
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

let cube2 = new THREE.Mesh(geometry, [
  material,
  material2,
  material3,
  material,
  material2,
  material3,
]);
cube.position.x = 2.5;
cube2.position.x = -2.5;
const cubes = [cube, cube2];

SCENE.add(cube, cube2);

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  cubes.forEach((cube) => {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
  });
  /*cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;*/
  RENDERER.render(SCENE, camera);
};

animate();
