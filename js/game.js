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

SCENE.add(cube);

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  RENDERER.render(SCENE, camera);
};

animate();
