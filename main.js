import 'style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer( {

  canvas: document.querySelector( '#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

//Adding the Central Shape in the middle of the scene

const geometry = new THREE.TorusGeometry(10,3,16,100);



const material = new THREE.MeshStandardMaterial({ color: 0xff6346 });
const torus = new THREE.Mesh( geometry, material);



scene.add( torus );

//Adding Point Light

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

//Adding Ambient Light

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//Adding Natural Light helper (i.e a line going thru the center of the scene) to the 3D plane

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 100);
scene.add(lightHelper, gridHelper);

//Adding Mouse controllable 3D geometry

const controls = new OrbitControls(camera, renderer.domElement);


//Adding 200 stars at random Positions

function addStar()
{
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
  const star = new THREE.Mesh( geometry, material );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(  100  ));
  star.position.set(x,y,z);
  scene.add(star);

}

Array(200).fill().forEach(addStar);


//Space BackGround...

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//Image of mee....

const ddTexture = new THREE.TextureLoader().load('DDimg.jpg');

const dd = new THREE.Mesh( 
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial ( {  map: ddTexture } )
);

scene.add(dd)

//Adding the image of Moon...

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3 , 32, 32),
  new THREE.MeshStandardMaterial( { 
    map: moonTexture, 
    normalMap: normalTexture
  } )
);

scene.add(moon);

//Resposition the moon...

moon.position.z = 30;
moon.position.setX(-10);

dd.position.z = -5;
dd.position.x = 2;




function moveCamera()
{
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    dd.rotation.y += 0.01;
    dd.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * 0.0002;
}

document.body.onscroll = moveCamera





function animate() 
{
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();


  renderer.render(scene, camera);
}

animate();

