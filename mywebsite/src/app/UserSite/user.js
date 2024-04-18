import React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import LoadingBar from 'react-top-loading-bar';

function User() {

  // const [isOnLoad, setIsOnLoad] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);
  // const ref = useRef(null);
  // const loadRef = useRef(null);

  const [isOnLoad, setIsOnLoad] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const loadRef = useRef(null);

  const managerRef = useRef(new THREE.LoadingManager());
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const rendererRef = useRef(new THREE.WebGLRenderer(false));

  const onProgress = useCallback((item, loaded, total) => {
    requestAnimationFrame(() => {
      setIsOnLoad((loaded / total)*100);
    });
  }, []);

  const onLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const manager = managerRef.current;
    manager.onProgress = onProgress;
    manager.onLoad = onLoad;

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
  
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.shadowMap.enabled = false;//不开启阴影
    if(ref.current){
      ref.current.appendChild(renderer.domElement);
    }
    const loader = new THREE.TextureLoader(manager);
  
    //添加背景
    const texture = loader.load('/planet/stars_milky_way.jpg');
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;

    // 创建地球
    {
      const earth=new THREE.Group();
      earth.name='earth';
      const earthOrbit = new THREE.Group();
      // 创建两个半球体的几何体
      const hemisphereGeometry1 = new THREE.SphereGeometry(2, 32, 32, 0, Math.PI);
      const hemisphereGeometry2 = new THREE.SphereGeometry(2, 32, 32, Math.PI, Math.PI);

      // 为每个半球体加载不同的纹理，分别加载白天图片的左边1/2和黑夜图片右边1/2
      const dayTexture = loader.load('planet/earth_day.jpg');
      dayTexture.wrapS = THREE.RepeatWrapping;//纹理的重复方式
      dayTexture.wrapT = THREE.RepeatWrapping;//纹理的重复方式
      dayTexture.repeat.set(0.5, 1);
      dayTexture.offset.set(0, 0);
      const nightTexture = loader.load('planet/earth_night.jpg');
      nightTexture.wrapS = THREE.RepeatWrapping;//纹理的重复方式
      nightTexture.wrapT = THREE.RepeatWrapping;//纹理的重复方式
      nightTexture.repeat.set(0.5, 1);
      nightTexture.offset.set(0.5, 0);
      const dayMaterial = new THREE.MeshBasicMaterial({ map: dayTexture });
      const nightMaterial = new THREE.MeshBasicMaterial({ map: nightTexture });

      // 创建两个半球体
      const hemisphere1 = new THREE.Mesh(hemisphereGeometry1, dayMaterial);
      const hemisphere2 = new THREE.Mesh(hemisphereGeometry2, nightMaterial);


      // 将两个半球体添加到场景中
      earth.add(hemisphere1);
      earth.add(hemisphere2);
      earth.rotateY(Math.PI/2);
      earthOrbit.add(earth);
      scene.add(earthOrbit);
      earth.position.y = 0;
      earth.rotateY(Math.PI);
      earth.position.x = 25;

      const animate = function () {
        //公转
        earthOrbit.rotation.y += 0.003*(1/3);

        //自转
        dayMaterial.map.offset.x += 0.0004;
        nightMaterial.map.offset.x += 0.0004;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);

      }

      animate();
    }

    //添加太阳
    { 
        const sunOrbit=new THREE.Group();
        const sun = new THREE.Group();
        const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
        const sunTexture = loader.load('planet/sun.jpg');
        const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
        //const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.name = 'sun';
        sun.add(sunMesh);
        sunOrbit.add(sun);
        sun.position.set(0, 0, 0);
        scene.add(sunOrbit);

        const animate = function () {
          requestAnimationFrame(animate);
          
          sun.rotation.y += 0.001;

          renderer.render(scene, camera);
        };
        animate();
    }

    //添加金星
    // {
    //     const venus=new THREE.Group();
    //     venus.name='venus';
    //     const venusOrbit = new THREE.Group();
    //     const venusGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    //     const venusTexture = loader.load('planet/venus.jpg');
    //     const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
    //     //const venusMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    //     const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
    //     venus.add(venusMesh);
    //     venusOrbit.add(venus);
    //     scene.add(venusOrbit);
    //     venus.position.y = 0;
    //     venus.position.x = 20;

    //     const animate = function () {
    //       venusOrbit.rotation.y += 0.006;
    //       renderer.render(scene, camera);
    //       requestAnimationFrame(animate);
    //     }
    //     animate();
    // }

    //添加水星
    // {
    //     const mercury=new THREE.Group();
    //     mercury.name='mercury';
    //     const mercuryOrbit = new THREE.Group();
    //     const mercuryGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    //     const mercuryTexture = loader.load('planet/mercury.jpg');
    //     const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
    //     //const mercuryMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    //     const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    //     mercury.add(mercuryMesh);
    //     mercuryOrbit.add(mercury);
    //     scene.add(mercuryOrbit);
    //     mercury.position.y = 0;
    //     mercury.position.x = 15;

    //     const animate = function () {
    //       mercuryOrbit.rotation.y += 0.01;
    //       renderer.render(scene, camera);
    //       requestAnimationFrame(animate);
    //     }
    //     animate();
    // }

    //添加火星
    // {
    //     const mars=new THREE.Group();
    //     mars.name='mars';
    //     const marsOrbit = new THREE.Group();
    //     const marsGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    //     const marsTexture = loader.load('planet/mars.jpg');
    //     const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
    //     //const marsMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    //     const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
    //     mars.add(marsMesh);
    //     marsOrbit.add(mars);
    //     scene.add(marsOrbit);
    //     mars.position.y = 0;
    //     mars.position.x = 35;

    //     const animate = function () {
    //       marsOrbit.rotation.y += 0.002;
    //       renderer.render(scene, camera);
    //       requestAnimationFrame(animate);
    //     }
    //     animate();
    // }

    //添加木星
    // {
    //     const jupiter=new THREE.Group();
    //     jupiter.name='jupiter';
    //     const jupiterOrbit = new THREE.Group();
    //     const jupiterGeometry = new THREE.SphereGeometry(4, 32, 32);
    //     const jupiterTexture = loader.load('planet/jupiter.jpg');
    //     const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
    //     //const jupiterMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    //     const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    //     jupiter.add(jupiterMesh);
    //     jupiterOrbit.add(jupiter);
    //     scene.add(jupiterOrbit);
    //     jupiter.position.y = 0;
    //     jupiter.position.x = 45;

    //     const animate = function () {
    //       jupiterOrbit.rotation.y += 0.001;
    //       renderer.render(scene, camera);
    //       requestAnimationFrame(animate);
    //     }
    //     animate();
    // }

    //添加土星
    // {
    //     const saturn=new THREE.Group();
    //     saturn.name='saturn';
    //     const saturnOrbit = new THREE.Group();
    //     const saturnGeometry = new THREE.SphereGeometry(2, 32, 32);
    //     const saturnTexture = loader.load('planet/saturn.jpg');
    //     const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
    //     //const saturnMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    //     const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
    //     saturn.add(saturnMesh);
    //     saturnOrbit.add(saturn);
    //     scene.add(saturnOrbit);
    //     saturn.position.y = 0;
    //     saturn.position.x = 55;

    //     //添加土星的环
    //     const ringGeometry = new THREE.RingGeometry(2.5, 3.5, 32);
    //     const ringTexture = loader.load('planet/saturn_ring.png');
    //     const ringMaterial = new THREE.MeshBasicMaterial({ map: ringTexture, side: THREE.DoubleSide });
    //     const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    //     ring.rotation.x = Math.PI / 2;
    //     saturn.add(ring);

    //     const animate = function () {
    //       saturnOrbit.rotation.y += 0.0008;
    //       ring.rotation.y += 0.0008;
    //       renderer.render(scene, camera);
    //       requestAnimationFrame(animate);
    //     }
    //     animate();
    // }

    //添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    camera.position.z = 25;
    camera.position.y = 2;

    const animate = function () {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };
    animate();
  }, [onProgress, onLoad]);

  useEffect(()=>{
    if(loadRef.current){
      if(isOnLoad===100){
        setIsLoading(false);
        loadRef.current.complete();
      }
      else{
        setIsLoading(true);
        loadRef.current.continuousStart(isOnLoad);
      }
    }
  },[isOnLoad])

    return (
      <div>
        {/* {isLoading && <LoadingBar color='#f11946' ref={loadRef} />}
        {!isLoading && <div ref={ref}/>} */}
        <div ref={ref}/>
      </div>
    );
}

export default User;