import React from 'react';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

function User() {
  const ref = useRef(null);
  const [isDay, setIsDay] = React.useState(true);

  useEffect(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;//开启阴影
      ref.current.appendChild(renderer.domElement);

      const loader = new THREE.TextureLoader();

      // 创建地球
      {
        const earth=new THREE.Group();
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
        earth.position.x = 20;

        const animate = function () {
          //公转
          earthOrbit.rotation.y += 0.001;

          //自转
          earth.rotation.y += 0.0001;
          dayMaterial.map.offset.x += 0.0002;
          nightMaterial.map.offset.x += 0.0002;

          renderer.render(scene, camera);
          requestAnimationFrame(animate);

        }

        animate();
      }

      //添加太阳
      {
          const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
          const sunTexture = loader.load('planet/sun.jpg');
          const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
          const sun = new THREE.Mesh(sunGeometry, sunMaterial);
          scene.add(sun);
          sun.position.set(0, 0, 0);

          const animate = function () {
            requestAnimationFrame(animate);
            
            sun.rotation.y += 0.001;

            renderer.render(scene, camera);
          };
          animate();
      }

      //添加光源
      {

          //const color = 0xFFEEDD;
          const color = 0xFFFFFF;
          const intensity = 3;
          const light = new THREE.DirectionalLight( color, intensity );
          light.position.set( -1, 2, 4 );
          scene.add( light );
  
      }

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

      //添加背景
      const texture = loader.load('/planet/stars_milky_way.jpg');
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;

      camera.position.z = 25;
      camera.position.y = 2;

      const animate = function () {
          requestAnimationFrame(animate);

          renderer.render(scene, camera);
      };

      animate();
  }, []);

    return <div ref={ref} />;
}

export default User;