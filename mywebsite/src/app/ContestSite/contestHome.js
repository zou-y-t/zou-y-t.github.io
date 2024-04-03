import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

function ContestHome() {
    const ref = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;//开启阴影
        ref.current.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();

        const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial({ color: 0xfffff });
        // const material = new THREE.MeshBasicMaterial({ map: loader.load('https://threejs.org/examples/textures/crate.gif') });
        const material = new THREE.MeshBasicMaterial({ map: loader.load('app.jpg') });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = 1; // Set the height of the cube from the ground
        cube.castShadow = true;//产生阴影
        cube.receiveShadow = true;//接受阴影
        scene.add(cube);

        //添加光源
        {

            //const color = 0xFFEEDD;
            const color = 0xFFFFFF;
            const intensity = 3;
            const light = new THREE.DirectionalLight( color, intensity );
            light.position.set( -1, 2, 4 );
            light.castShadow = true;//产生阴影
            scene.add( light );
    
        }

        //添加控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        //添加地板
        {
            const planeSize = 40;

            const loader = new THREE.TextureLoader();
            const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.magFilter = THREE.NearestFilter;
            //texture.colorSpace = THREE.SRGBColorSpace;
            const repeats = planeSize / 2;
            texture.repeat.set( repeats, repeats );

            const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
            const planeMat = new THREE.MeshPhongMaterial( {
                map: texture,
                side: THREE.DoubleSide,
            } );
            const mesh = new THREE.Mesh( planeGeo, planeMat );
            mesh.rotation.x = Math.PI * - .5;
            mesh.receiveShadow = true;//接受阴影
            scene.add( mesh );
        }

        //添加背景
        // const texture = loader.load([
        // 'app.jpg', // 右面
        // 'app.jpg', // 左面
        // 'app.jpg', // 顶面
        // 'app.jpg', // 底面
        // 'app.jpg', // 前面
        // 'app.jpg' // 后面
        // ]);

        // scene.background = texture;


        camera.position.z = 5;
        camera.position.y = 2;

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