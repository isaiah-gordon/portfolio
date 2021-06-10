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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.2, 10)
camera.position.set(0.14, 0.65, 0);
camera.rotation.set(-0.66, 0, 0)
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

const floor_material = new THREE.MeshStandardMaterial({ map: dot_texture  });
floor_material.roughness = 0.8

const floor = new THREE.Mesh(floor_plane, floor_material)
scene.add(floor)

floor.rotation.x = 4.71239

// = = = = = = MY THREE MODULE = = = = = =
// Using my module to build some stuff!

const load = new Builder.Load(scene, gui)
const create = new Builder.Create(scene)
const addAsset = new Assets.Create(scene)

// TOP OF PAGE
const spotLight1 = new create.spotLight(1, 0xd0caf7, [0.1, 0.57, -0.81], [0.1, 0.01, -0.9])
scene.add(spotLight1)
debug.light(spotLight1, 'Spot Light 1')
load.text("ISAIAH GORDON", 0.11, 0xf2f2f2, 0.03, [-0.47, 0.11, -1], [-0.26, 0, 0])
load.text("Developer & IT Pro", 0.085, 0xb50018, 0.02, [-0.33, 0.03, -0.92], [-0.29, 0, 0])



// FLOOR BOARD SECTION
const spotLight2 = new create.spotLight(1, 0xffaea3, [0.19, 0.72, 1.31], [0.2, 0.01, 1.3])
scene.add(spotLight2)
debug.light(spotLight2, 'Spot Light')

const spotLight2B = new create.spotLight(0.2, 0xffcbcb, [-0.34, 0.54, 1.7], [-0.2, 0.01, 1.6])
scene.add(spotLight2B)
debug.light(spotLight2B, 'Spot Light B')

// Titles
load.text("PROJECTS", 0.1, 0xf2f2f2, 0.02, [-0.525, 0.01, 0.535], [0, 0.36, 0])
load.text("Floor Board", 0.08, 0xE73E43, 0.006, [-0.4, 0, 0.82], [-1.5708, 0, 0])

// Bill Board
load.model("models/section_art/floor_board/fb_bill_board_image.gltf", [0.53, 0.18, 0.8], [0, -0.44, 0], [0.3, 0.3, 0.3])
const billBoardLight = new create.spotLight(1.4, 0xffaea3, [0.19, -0.69, 1.84], [0.53, 0.18, 0.8])
scene.add(billBoardLight)

// Description 1
load.text("Software that allows McDonald's teams", 0.037, 0xedeef0, 0, [-0.39, 0.001, 0.9], [-1.571, 0, 0])
load.text("to visulize sales data in real time!", 0.037, 0xedeef0, 0, [-0.39, 0.001, 0.97], [-1.571, 0, 0])

// McD Store
var mcd = load.model("models/section_art/floor_board/mcd_store.gltf", [-0.17, 0.09, 1.33], [0, 0.9, 0], [0.2, 0.2, 0.2])
debug.object(mcd, "McDonalds")

// McD Sign
var mcdSign = load.model("models/section_art/floor_board/mcd_sign.gltf", [-0.26, 0.09, 1.47], [0, 0.36, 0], [0.4, 0.4, 0.4])
debug.object(mcdSign, "Sign")

// Description 2
load.text("Currently being tested at a", 0.03, 0x878787, 0, [-0.04, 0.001, 1.15], [-1.571, 0, 0])
load.text("few locations, my software is", 0.03, 0x878787, 0, [-0.04, 0.001, 1.21], [-1.571, 0, 0])
load.text("displayed on a board located", 0.03, 0x878787, 0, [-0.04, 0.001, 1.27], [-1.571, 0, 0])
load.text('"on the floor" where staff can', 0.03, 0x878787, 0, [-0.04, 0.001, 1.33], [-1.571, 0, 0])
load.text('see. It shows how much of a', 0.03, 0x878787, 0, [-0.04, 0.001, 1.39], [-1.571, 0, 0])
load.text('certain product is being sold.', 0.03, 0x878787, 0, [-0.04, 0.001, 1.45], [-1.571, 0, 0])

// French Fries
var fries = load.model("models/section_art/floor_board/fry_group.gltf", [0.44, 0.06, 1.7], [0, 0, 0], [0.45, 0.45, 0.45])
debug.object(fries, "French Fries")

// Data Chart
var bars = load.model("models/section_art/floor_board/graph_bars.gltf", [0.62, 0.06, 1.6], [0, 0, 0], [0.55, 0.55, 0.55])
debug.object(bars, "Bars")

// Description 3
load.text("The locations that use my", 0.03, 0x878787, 0, [-0.394, 0.001, 1.6], [-1.571, 0, 0])
load.text("software have a higher average", 0.03, 0x878787, 0, [-0.394, 0.001, 1.66], [-1.571, 0, 0])
load.text("check because managers can", 0.03, 0x878787, 0, [-0.394, 0.001, 1.72], [-1.571, 0, 0])
load.text("see how much their team upsells.", 0.03, 0x878787, 0, [-0.394, 0.001, 1.78], [-1.571, 0, 0])



load.text("COMING SOON", 0.1, 0xf2f2f2, 0.02, [-0.22, 0.01, 4], [0, 0.3, 0])


// Spotlight Transitions
document.addEventListener('scroll', () => {
    // console.log(window.scrollY)
    if (window.scrollY < 700) {
        gsap.to(spotLight1, { intensity: 1, duration: 1 })
        gsap.to(spotLight2, { intensity: 0, duration: 1 })
    }
    if (window.scrollY > 700) {
        gsap.to(spotLight1, { intensity: 0, duration: 1 })
        gsap.to(spotLight2, { intensity: 1, duration: 1 })
    }
})


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