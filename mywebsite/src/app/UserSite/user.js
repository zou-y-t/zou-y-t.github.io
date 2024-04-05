import React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

function User() {


  const ref = useRef(null);

  const [planet, setPlanet] = useState(() => {
    const storedPlanet = localStorage.getItem('planet');
    return storedPlanet ? storedPlanet : '';
  });

  useEffect(() => {
    localStorage.setItem('planet', planet);
  }, [planet]);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();


  useEffect(() => {if(!planet){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
  
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;//开启阴影
    if(ref.current){
      ref.current.appendChild(renderer.domElement);
    }
    const loader = new THREE.TextureLoader();
  
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
        earthOrbit.add(earth);
        scene.add(earthOrbit);
        earth.position.y = 0;
        earth.rotateY(Math.PI/2);
        earth.position.x = 25;

        const animate = function () {
          //公转
          earthOrbit.rotation.y += 0.003;

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
      {
          const venus=new THREE.Group();
          venus.name='venus';
          const venusOrbit = new THREE.Group();
          const venusGeometry = new THREE.SphereGeometry(0.8, 32, 32);
          const venusTexture = loader.load('planet/venus.jpg');
          const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
          const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
          venus.add(venusMesh);
          venusOrbit.add(venus);
          scene.add(venusOrbit);
          venus.position.y = 0;
          venus.position.x = 20;

          const animate = function () {
            venusOrbit.rotation.y += 0.006;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
          }
          animate();
      }

      //添加水星
      {
          const mercury=new THREE.Group();
          mercury.name='mercury';
          const mercuryOrbit = new THREE.Group();
          const mercuryGeometry = new THREE.SphereGeometry(1.2, 32, 32);
          const mercuryTexture = loader.load('planet/mercury.jpg');
          const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
          const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
          mercury.add(mercuryMesh);
          mercuryOrbit.add(mercury);
          scene.add(mercuryOrbit);
          mercury.position.y = 0;
          mercury.position.x = 15;

          const animate = function () {
            mercuryOrbit.rotation.y += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
          }
          animate();
      }

      //添加火星
      {
          const mars=new THREE.Group();
          mars.name='mars';
          const marsOrbit = new THREE.Group();
          const marsGeometry = new THREE.SphereGeometry(1.5, 32, 32);
          const marsTexture = loader.load('planet/mars.jpg');
          const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
          const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
          mars.add(marsMesh);
          marsOrbit.add(mars);
          scene.add(marsOrbit);
          mars.position.y = 0;
          mars.position.x = 35;

          const animate = function () {
            marsOrbit.rotation.y += 0.002;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
          }
          animate();
      }

      //添加木星
      {
          const jupiter=new THREE.Group();
          jupiter.name='jupiter';
          const jupiterOrbit = new THREE.Group();
          const jupiterGeometry = new THREE.SphereGeometry(4, 32, 32);
          const jupiterTexture = loader.load('planet/jupiter.jpg');
          const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
          const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
          jupiter.add(jupiterMesh);
          jupiterOrbit.add(jupiter);
          scene.add(jupiterOrbit);
          jupiter.position.y = 0;
          jupiter.position.x = 45;

          const animate = function () {
            jupiterOrbit.rotation.y += 0.001;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
          }
          animate();
      }

      //添加土星
      {
          const saturn=new THREE.Group();
          saturn.name='saturn';
          const saturnOrbit = new THREE.Group();
          const saturnGeometry = new THREE.SphereGeometry(2, 32, 32);
          const saturnTexture = loader.load('planet/saturn.jpg');
          const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
          const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
          saturn.add(saturnMesh);
          saturnOrbit.add(saturn);
          scene.add(saturnOrbit);
          saturn.position.y = 0;
          saturn.position.x = 55;

          //添加土星的环
          const ringGeometry = new THREE.RingGeometry(2.5, 3.5, 32);
          const ringTexture = loader.load('planet/saturn_ring.png');
          const ringMaterial = new THREE.MeshBasicMaterial({ map: ringTexture, side: THREE.DoubleSide });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = Math.PI / 2;
          saturn.add(ring);

          const animate = function () {
            saturnOrbit.rotation.y += 0.0008;
            ring.rotation.y += 0.0008;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
          }
          animate();
      }

      //添加光源
      // {

      //     //const color = 0xFFEEDD;
      //     const color = 0xFFFFFF;
      //     const intensity = 3;
      //     const light = new THREE.DirectionalLight( color, intensity );
      //     light.position.set( -1, 2, 4 );
      //     scene.add( light );
  
      // }

      //添加控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

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

      camera.position.z = 25;
      camera.position.y = 2;

      const animate = function () {
          requestAnimationFrame(animate);

          renderer.render(scene, camera);
      };
      animate();


      // function printChildren(obj, level=0) {
      //   console.log('children: '.repeat(level * 2), obj.name, obj);
      //   for (let child of obj.children) {
      //       printChildren(child, level + 1);
      //   }
      //   }

      function onSelect(event){
        // printChildren(scene);


          // calculate mouse position in normalized device coordinates
          // (-1 to +1) for both components
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            // update the picking ray with the camera and mouse position
            raycaster.setFromCamera(mouse, camera);

          // calculate objects intersecting the picking ray
          const intersects = raycaster.intersectObjects(scene.children, true);

          if(intersects.length > 0){
            var ans=false;
            switch(intersects[0].object.parent.name){
              case 'earth':
                ans=window.confirm('select the Earth?');
                if(ans){
                  setPlanet('earth');
                  renderer.clear();
                }
                break;
              case 'sun':
                ans=window.confirm('select the Sun?');
                if(ans){
                  setPlanet('sun');
                }
                break;
              case 'venus':
                ans=window.confirm('select the Venus?');
                if(ans){
                  setPlanet('venus');
                }
                break;
              case 'mercury':
                ans=window.confirm('select the Mercury?');
                if(ans){
                  setPlanet('mercury');
                }
                break;
              case 'mars':
                ans=window.confirm('select the Mars?');
                if(ans){
                  setPlanet('mars');
                }
                break;
              case 'jupiter':
                ans=window.confirm('select the Jupiter?');
                if(ans){
                  setPlanet('jupiter');
                }
                break;
              case 'saturn':
                ans=window.confirm('select the Saturn?');
                if(ans){
                  setPlanet('saturn');
                }
                break;
              default:
                alert('this is an unknown place');
                break;
            }
          }
      }

      window.addEventListener('mousedown', event => onSelect(event));
      window.addEventListener('touchstart', event => onSelect(event));
      

  }}, [mouse, raycaster,planet]);




  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 这里可以替换为你的加载动画
  }

    return (
      planet?<center><h1>You have been a resident of {planet}!</h1></center>:<div ref={ref} />
    );
}

export default User;