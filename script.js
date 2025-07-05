let scene, camera, renderer, controls, currentObject;

init();
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 10, 30);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 20, 10);
  scene.add(light);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function showModel(model) {
  if (currentObject) {
    scene.remove(currentObject);
    if(currentObject.geometry) currentObject.geometry.dispose();
    if(currentObject.material) currentObject.material.dispose();
    currentObject = null;
  }
  const desc = document.getElementById('description');
  if (model === 'parabola') {
    const material = new THREE.LineBasicMaterial({color: 0x00ff00});
    const points = [];
    for (let x = -10; x <= 10; x += 0.1) {
      let y = 0.3 * x * x;
      points.push(new THREE.Vector3(x, y, 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const parabolaLine = new THREE.Line(geometry, material);
    currentObject = parabolaLine;
    scene.add(parabolaLine);
    desc.innerText = "This is a parabola curve: y = 0.3x^2. Parabolas are used in many real-life applications for focusing signals and designing structures.";
  }
  if (model === 'satellite') {
    const loader = new THREE.GLTFLoader();
    loader.load('satellite.glb', function(gltf){
      currentObject = gltf.scene;
      scene.add(gltf.scene);
    });
    desc.innerText = "Satellite dishes use parabolic shapes to focus signals onto the receiver, using the parabola's property of reflecting signals to the focus.";
  }
  if (model === 'fountain') {
    const material = new THREE.LineBasicMaterial({color: 0x00ffff});
    const points = [];
    for (let x = -10; x <= 10; x += 0.1) {
      let y = -0.5 * x * x + 25;
      points.push(new THREE.Vector3(x, y, 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const fountainArc = new THREE.Line(geometry, material);
    currentObject = fountainArc;
    scene.add(fountainArc);
    desc.innerText = "Fountains create arcs of water that follow a parabolic path due to gravity, showing the natural occurrence of parabolas.";
  }
}

window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
