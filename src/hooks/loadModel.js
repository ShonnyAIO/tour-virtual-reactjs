import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Model(){

    const modelFlowerVase = (scene) => {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('./flower_vase/scene.gltf', (model) => {
            console.log('MODELO CARGADO');
            scene.add(model.scene);
        }, (progress) => {
            console.log('Loading model:' , progress);
        }, (error) => {
            console.log('Error al cargar: ', error);
        });
    }

    return {modelFlowerVase};
}