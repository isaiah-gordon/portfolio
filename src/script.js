import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'

import gsap from 'gsap'

// Import my modules.
import * as Builder from './my_three_module.js'
import * as Assets from './dynamic_assets.js'


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.14, 0.65, 0);
camera.rotation.set(-0.84, 0, 0)
camera.zoom = 0.7
camera.fov = 45

// Mobile Responsive Camera Settings
if (innerWidth < 1000) {

    camera.position.set(0.14, 0.74, 0);
    camera.rotation.set(-0.92, 0, 0)

    camera.zoom = 0.35
    camera.fov = 45
}

window.addEventListener('resize', function () {
    "use strict";
    window.location.reload();
});

camera.updateProjectionMatrix();
scene.add(camera)

const debug = new Builder.Debug(gui)
debug.object(camera, "Camera")


// Sky Light
// (The sun is a deadly lazer!)
const hemLight = new THREE.HemisphereLight(0xbbddff, 0x080820, 0.1);
scene.add(hemLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
scene.add(directionalLight);

// Scene Floor
const dot_texture = new THREE.TextureLoader().load('textures/pixel_dot_background.png')
dot_texture.wrapS = THREE.RepeatWrapping;
dot_texture.wrapT = THREE.RepeatWrapping;
dot_texture.repeat.set(200, 200);

const floor_plane = new THREE.PlaneGeometry(30.0, 30.0, 1, 1)

const floor_material = new THREE.MeshStandardMaterial({ map: dot_texture, side: THREE.DoubleSide });
floor_material.roughness = 0.8

const floor = new THREE.Mesh(floor_plane, floor_material)
scene.add(floor)

floor.rotation.x = 1.5708

// = = = = = = MY THREE MODULE = = = = = =
// Using my module to build some stuff!

const load = new Builder.Load(scene, gui)
const create = new Builder.Create(scene)

const addAsset = new Assets.Create(scene)


var nameStatue = load.text(undefined, "ISAIAH GORDON", 0.11, 0xf2f2f2, 0.03, [-0.47, 0.11, -1], [-0.26, 0, 0])
debug.object(nameStatue, "Name Statue")

load.text(undefined, "Developer & IT Pro", 0.085, 0xb50018, 0.02, [-0.33, 0.03, -0.92], [-0.29, 0, 0], "Title Statue")

// SPOTLIGHT 1
const spotLight1 = new create.spotLight(0, 0xd0caf7, [3.54, 8, 7.4], [0.1, 0.01, -0.9])
scene.add(spotLight1)

// SPOTLIGHT 2
const spotLight2 = new create.spotLight(1.22, 0xd0caf7, [0.14, 1.66, 2.11], [0.2, 0.01, 1])
scene.add(spotLight2)
debug.light(spotLight2, 'Spot Light')

//// Spotlight Transitions
//document.addEventListener('scroll', () => {
//    // console.log(window.scrollY)
//    if (window.scrollY < 780) {
//        gsap.to(spotLight1, { intensity: 1.22, duration: 1 })
//        gsap.to(spotLight2, { intensity: 0, duration: 1 })
//    }
//    if (window.scrollY > 780) {
//        gsap.to(spotLight1, { intensity: 0, duration: 1 })
//        gsap.to(spotLight2, { intensity: 1.5, duration: 1 })
//    }
//})

load.text(undefined, "PROJECTS", 0.1, 0xf2f2f2, 0.02, [-0.323, 0.01, 0.669], [0, 0, 0])

var longText = `
Too much garbage in your face? There is
plenty of space out in space! BnL Starliners
leaving each day. We'll clean up the mess
while you're away.
`

load.text(undefined, longText, 0.037, 0x545454, 0, [-0.32, 0.001, 0.78], [-1.571, 0, 0])

load.text(undefined, "SKILLS", 0.1, 0xf2f2f2, 0.02, [-0.103, 0.01, 4], [0, 0.4, 0])

// Camera here?


// Renderer
 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// = = = = = = = = = = = ANIMATIONS = = = = = = = = = = = = = = =

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

window.addEventListener('mousemove', onMouseMove, false);

// Setup Buttons
const render_github_button = addAsset.button('github', mouse, camera, [0.54, 0.02, -0.7])
const render_linkedin_button = addAsset.button('linkedin', mouse, camera, [0.3, 0.03, -0.7])


const updateCamera = (event) => {
    // console.log(window.scrollY)
    camera.position.z = window.scrollY * .002
}

window.addEventListener('scroll', updateCamera)

const clock = new THREE.Clock()


// = = = = = Animation Loop = = = = =
const tick = () => {

    //render()
    document.body.style.cursor = "default";
    render_linkedin_button()
    render_github_button()
    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()