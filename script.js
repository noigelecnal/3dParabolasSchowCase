let scene, camera, renderer, controls, currentModel;

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 0);

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 20, 0);
  scene.add(light);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function showModel(modelName) {
  if (currentModel) {
    scene.remove(currentModel);
    currentModel.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    currentModel = null;
  }

  const loader = new THREE.GLTFLoader();
  let fileName = '';

  if (modelName === 'satellite') {
    fileName = 'satellite_dish.glb';
  } else if (modelName === 'bridge') {
    fileName = 'golden_gate_bridge.glb';
  } else if (modelName === 'coaster') {
    fileName = 'roller_coaster.glb';
  } else if (modelName === 'gateway') {
    fileName = 'gateway_arch.glb';
  }

  console.log('Loading model:', fileName);

  loader.load(fileName, function(gltf) {
    currentModel = gltf.scene;
    currentModel.position.set(0, 0, 0);
    currentModel.rotation.set(0, 0, 0);
    currentModel.scale.set(1, 1, 1);

    const box = new THREE.Box3().setFromObject(currentModel);
    const center = box.getCenter(new THREE.Vector3());
    currentModel.position.sub(center);

    const size = box.getSize(new THREE.Vector3()).length();
    const scale = 5 / size;
    currentModel.scale.set(scale, scale, scale);

    scene.add(currentModel);
    console.log(fileName + ' loaded and centered successfully');
  }, function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  }, function(error) {
    console.error('An error happened while loading', fileName, error);
  });
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
