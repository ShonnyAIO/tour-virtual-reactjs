import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Model from "../hooks/loadModel";
import "../styles/model.css";

export default function ModelContainer({ nameModel }) {
    const mountRef = useRef(null);

    const [animationId, setAnimationId] = useState();

    let currentRef;

    useEffect(() => {
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 30);
        let modelGroup = new THREE.Group();
        let renderer = new THREE.WebGLRenderer({alpha: true, powerPreference: 'high-performance', precision : 'lowp', animation : true });
        let orbitControls = new OrbitControls(camera, renderer.domElement);

        let shouldAnimate = true;
        orbitControls.enableDamping = true;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        currentRef = mountRef.current;
        createScene(scene, camera, modelGroup, renderer);
        initRenderer(currentRef, renderer);
        
        const animate = () => {
            if (shouldAnimate) {
                const id = requestAnimationFrame(animate);
                setAnimationId(id);
                orbitControls.autoRotate = true;
                orbitControls.update();
                renderer.render(scene, camera);
            }
        }

        animate();

        currentRef.appendChild(renderer.domElement);

        return () => {
            shouldAnimate = false;

            currentRef.removeChild(renderer.domElement);
            scene.clear();
            camera.clear();
            modelGroup.clear();
            renderer.clear();
            cancelAnimationFrame(animationId);

            //eliminar instancias
            scene = null;
            camera = null;
            renderer = null;
            modelGroup = null;
            orbitControls = null;
        }

    }, []);

    const createScene = (scene, camera, modelGroup) => {
        const ambientLight = new THREE.AmbientLight(0xeeeeee, 0.8);
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        camera.position.set(0, 0, 10);
        scene.add(ambientLight);
        scene.add(pointLight);
        scene.add(camera);
        importModel(scene, modelGroup);
    }

    const importModel = (scene, modelGroup) => {
        if(nameModel === 'flowerVase'){
            const {modelFlowerVase} = Model();
            modelFlowerVase(modelGroup);
        }
        scene.add(modelGroup);
    }

    const initRenderer = (currentRef, renderer) => {
        const {clientWidth: width, clientHeight: height} = currentRef;
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
    }

    return (
        <div className="container3d" ref={mountRef} >
            
        </div>
    );
}