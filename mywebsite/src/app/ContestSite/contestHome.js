import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function ContestHome() {
    const ref = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        ref.current.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();

        const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial({ color: 0xfffff });
        // const material = new THREE.MeshBasicMaterial({ map: loader.load('https://threejs.org/examples/textures/crate.gif') });
        const material = new THREE.MeshBasicMaterial({ map: loader.load('app.jpg') });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        

        camera.position.z = 5;

        const animate = function () {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();
    }, []);

    return <div ref={ref} />;
}

export default ContestHome;