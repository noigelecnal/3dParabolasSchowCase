function showModel(model) {
    const iframe = document.getElementById('sketchfabViewer');
    if (model === 'satellite') {
        iframe.src = "https://sketchfab.com/3d-models/d2h-satellite-dish-1db5c2176b7b4f1386f10127c9a59a71";
    } else if (model === 'fountain') {
        iframe.src = "https://sketchfab.com/models/YOUR_FOUNTAIN_MODEL_ID/embed";
    } else if (model === 'bridge') {
        iframe.src = "https://sketchfab.com/3d-models/golden-gate-bridge-a0ee5a9c285849c0819af5f366be3835/";
    }
}
