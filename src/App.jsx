
import './App.css'
import { useEffect } from 'react';
import { TweenMax, Power2 } from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import ColumnItem from './components/column-item/column-item';
import TitleItem from './components/title-item/title-item';
import MiddleColumnItem from './components/middle-column-item/middle-column-item';
import ObservableComponent from './components/observable-component/observable-component';
import SpaceComponent from './components/space-component/space-component';

function App() {

  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#background') })

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.setZ(50);
    camera.position.setX(0);
    camera.position.setY(0);

    const geometry = new THREE.SphereBufferGeometry(6, 128, 128);
    const material = new THREE.MeshStandardMaterial({ color: 0xFFffff, wireframe: false });
    // material.transparent = true;
    // material.opacity = 0.6

    const orb = new THREE.Mesh(geometry, material);

    orb.position.x = 0;
    orb.position.y = 0;
    orb.position.z = 0;
    orb.rotateY(-90)
    orb.rotateX(-90)

    const ambientLight = new THREE.AmbientLight(0xffffff, .5);
    const pointLight = new THREE.PointLight(0xffffff);

    const controls = new OrbitControls(camera, renderer.domElement);
    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50);


    pointLight.position.set(100, 20, 5);

    scene.background = new THREE.Color(0x000000)
    scene.add(ambientLight)
    scene.add(pointLight, lightHelper)
    scene.add(orb)

    let count = geometry.attributes.position.count;

    const position_clone = JSON.parse(
      JSON.stringify(geometry.attributes.position.array)
    )

    const normals_clone = JSON.parse(
      JSON.stringify(geometry.attributes.normal.array)
    )


    const numStars = 400;
    const stars = [];
    const starSettings = {
      opacity: 1.0
    }
    const target = new THREE.Vector3(0, 0, 0);
    // create stars and add to scene
    for (let i = 0; i < numStars; i++) {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      star.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );

      let newColor = [Math.random(), Math.random(), Math.random()]

      star.material.color = new THREE.Color(newColor[0], newColor[1], newColor[2])

      scene.add(star);
      stars.push(star);
    }

    const maxDist = 2;
    let time = 0;

    let colorVars = document.documentElement;
    const animate = () => {
      requestAnimationFrame(animate);

      // calculate size and color values
      const size = 1 + Math.sin(time) * 0.3;
      const damping = .2 + Math.sin(time) * .1;
      const hue = (time / 30) % 1;
      const orbColor = new THREE.Color().setHSL(hue, .9, 0.6);

      time += 0.01;

      // update cube size and color
      orb.scale.set(size, size, size);
      orb.material.color.copy(orbColor);



      colorVars.style.setProperty('--cursorColor', `rgb(${orbColor.r * 200},${orbColor.g * 200},${orbColor.b * 200})`);


      const now = Date.now() / 200;
      for (let i = 0; i < count; i++) {
        const uX = geometry.attributes.uv.getX(i) * Math.PI * 16;
        const uY = geometry.attributes.uv.getY(i) * Math.PI * 16;

        const uZ = geometry.attributes.uv.getZ(i) * Math.PI * 16;

        //calculate wave height
        const xangle = (uX + now)
        const xsin = Math.sin(xangle) * damping
        const yangle = (uY + now)
        const ycos = Math.cos(yangle) * damping

        const zangle = (uZ + now)
        const zcos = Math.tan(zangle) * damping

        // indices
        const ix = i * 3
        const iy = i * 3 + 1
        const iz = i * 3 + 2

        //position
        geometry.attributes.position.setX(i, position_clone[ix] + normals_clone[ix] * (xsin + ycos));
        geometry.attributes.position.setY(i, position_clone[iy] + normals_clone[iy] * (xsin + ycos));
        geometry.attributes.position.setZ(i, position_clone[iz] + normals_clone[iz] * (xsin + ycos));

        orb.rotation.x += .0000005;
        orb.rotation.y += .0000002;


      }

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];

        // calculate distance between current position and target
        const distance = star.position.distanceTo(target);
        // move the sphere towards the target
        if (distance > maxDist) {
          const direction = target.clone().sub(star.position).normalize();
          const speed = 2 / distance; // adjust to control speed of movement
          const displacement = direction.multiplyScalar(speed);
          const t = easeInOutCubic(distance / maxDist / 200); // Transition value between 0 and 1
          const endColor = new THREE.Color(0xffffff);; // white
          const color = new THREE.Color().lerpColors(star.material.color, endColor, t);




          // set the star's material color
          star.material.color = color;

          star.material.transparent = true
          star.material.opacity = starSettings.opacity;
          star.position.add(displacement);
        } else {
          i % 3 === 0 ?
            star.material.color.setRGB(Math.random(), Math.random(), Math.random()) :
            star.material.color = orbColor;

          star.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
          );
        }
      }

      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }
    let backgroundColor = new THREE.Color(0x000000);
    let isTweening = false;
    const scrollEffect = () => {
      const t = document.body.getBoundingClientRect().top;
      // isTweening = true;
      if (t >= 0) { //start
        tweenToBlack();
      } else if (t >= -1850) { //item 1
        tweenToBlack();
        TweenMax.to(camera.position, 1, { x: t * -0.005, y: 0, z: t * 0.02 + 50, ease: easeOut });
        TweenMax.to(camera.rotation, 1, { y: t * -0.0001, ease: easeOut });
      } else if (t >= -1950) { //item 2
        tweenToBlack();
        TweenMax.to(camera.position, 1, { x: t * -0.006, y: 0, z: t * 0.02 + 50, ease: easeOut });
        TweenMax.to(camera.rotation, 1, { y: t * -0.0001, ease: easeOut });
      } else if (t >= -3400) { //item 3
        tweenToBlack();
        TweenMax.to(camera.rotation, 1, { y: t * -0.0001, ease: easeOut });
      } else if (t >= -4000) { //item 4
        tweenToWhite();
        TweenMax.to(camera.position, 1, { y: t * 0.004, ease: easeOut });
        TweenMax.to(starSettings, 3, { opacity: 1, ease: easeOut });
      } else if (t > -4100) { //item 5
        tweenToWhite();
        TweenMax.to(camera.position, 1, { y: t * 0.006, ease: easeOut });
        TweenMax.to(starSettings, 3, { opacity: 0, ease: easeOut });
      }
    };

    //tween helpers
    const easeOut = Power2.easeOut;
    const easeInOut = Power2.easeInOut;
    const updateBackground = () => {
      scene.background = backgroundColor;
    };
    const tweenFinished = () => {
      isTweening = false;
    }
    const tweenToBlack = () => {
      if (!isTweening) TweenMax.to(backgroundColor, 1, { r: 0, g: 0, b: 0, ease: easeInOut, onUpdate: updateBackground, onComplete: tweenFinished });
    }
    const tweenToWhite = () => {
      if (!isTweening) TweenMax.to(backgroundColor, 1, { r: 1, g: 1, b: 1, ease: easeInOut, onUpdate: updateBackground, onComplete: tweenFinished });
    }

    const easeInOutCubic = (t) => {
      return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    document.body.onscroll = scrollEffect;
    animate();


  })

  return (
    <div>
      <canvas id="background" />
      <main>

        <TitleItem></TitleItem>
        <SpaceComponent column="right-column-item"> </SpaceComponent>

        <ColumnItem
          title='Flow Field'
          column="right-column-item"
          url="https://observablehq.com/@surelynotchase/flow-field-p5-js"
          content={
            <ObservableComponent
              source="https://observablehq.com/embed/@surelynotchase/flow-field-p5-js?cells=flowField">

            </ObservableComponent>
          }>



        </ColumnItem>

      </main>
    </div>
  );
}

export default App
