for (let x = -10; x <= 10; x += 0.1) {
    let y = 0.5 * x * x; // y = ax^2, a = 0.5
    geometry.vertices.push(new THREE.Vector3(x, y, 0));
}
