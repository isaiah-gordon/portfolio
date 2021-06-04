import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'

import gsap from 'gsap'

// Import my module.
import * as Builder from './my_three_module.js'

// Loader
const dot_texture = new THREE.TextureLoader().load('textures/pixel_dot_background.png')
dot_texture.wrapS = THREE.RepeatWrapping;
dot_texture.wrapT = THREE.RepeatWrapping;
dot_texture.repeat.set(200, 200);


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// = = = = = = MY THREE MODULE = = = = = =
// Using my module to build some text geometry

const load = new Builder.Load(scene, gui)
const create = new Builder.Create(scene)
const debug = new Builder.Debug(gui)

var nameStatue = load.text(undefined, "ISAIAH GORDON", 0.11, 0xf2f2f2, 0.03, [-0.5, 0.135, -1], [0, 0, 0])
debug.objectDebug(nameStatue, "Name Statue")

load.text(undefined, "Developer & IT Pro", 0.085, 0xb50018, 0.02, [-0.26, 0.03, -1], [0, 0, 0], "Title Statue")

// SPOTLIGHT 1
const spotLight1 = new create.spotLight(1.3, 0xffe4d0, [0.01, 1.6, -0.01], [0.1, 0.01, -0.9])
scene.add(spotLight1)
debug.spotLight(spotLight1, 'Spot light 1')

// SPOTLIGHT 2
const spotLight2 = new create.spotLight(1.5, 0xff7979, [0.14, 1.66, 2.11], [0.2, 0.01, 1])
scene.add(spotLight2)

// Spotlight Transitions
document.addEventListener('scroll', () => {
    // console.log(window.scrollY)
    if (window.scrollY < 780) {
        gsap.to(spotLight1, { intensity: 1.5, duration: 1.5 })
        gsap.to(spotLight2, { intensity: 0, duration: 1.5 })
    }
    if (window.scrollY > 780) {
        gsap.to(spotLight1, { intensity: 0, duration: 1.5 })
        gsap.to(spotLight2, { intensity: 1.5, duration: 1.5 })
    }
})

load.text(undefined, "PROJECTS", 0.1, 0xf2f2f2, 0.02, [-0.323, 0.01, 0.669], [0, 0, 0])

var longText = `
Too much garbage in your face? There is
plenty of space out in space! BnL Starliners
leaving each day. We'll clean up the mess
while you're away.
`

load.text(undefined, longText, 0.037, 0x545454, 0, [-0.32, 0.001, 0.78], [-1.571, 0, 0])

load.text(undefined, "SKILLS", 0.1, 0xf2f2f2, 0.02, [-0.103, 0.01, 4], [0, 0.4, 0])

// The sun is a deadly lazer!
const hemLight = new THREE.HemisphereLight(0xbbddff, 0x080820, 0.1);
scene.add(hemLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
scene.add(directionalLight);


// Objects
const floor_plane = new THREE.PlaneGeometry(30.0, 30.0, 1, 1)


// Materials
const material = new THREE.MeshStandardMaterial({ map: dot_texture, side: THREE.DoubleSide });
material.roughness = 0.95


// Mesh
// Scene Floor
const floor = new THREE.Mesh(floor_plane, material)
scene.add(floor)

floor.rotation.x = 1.5708

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

camera.position.set(0.14, 0.55, 0);
camera.rotation.set(-0.66, 0, 0)

camera.zoom = 0.7
camera.fov = 45

console.log(innerWidth)

// Mobile Responsive Camera Settings
if (innerWidth < 1000) {

    camera.position.set(0.14, 0.55, 0);
    camera.rotation.set(-0.66, 0, 0)

    camera.zoom = 0.35
    camera.fov = 45
}

window.addEventListener('resize', function () {
    "use strict";
    window.location.reload();
});

camera.updateProjectionMatrix();

scene.add(camera)

const camera_angle = gui.addFolder('Camera')

camera_angle.add(camera.position, 'x').min(-1).max(2).step(0.01).name("X Pos")
camera_angle.add(camera.position, 'y').min(-1).max(3).step(0.01).name("Y Pos")
camera_angle.add(camera.position, 'z').min(-1).max(1).step(0.01).name("Z Pos")

camera_angle.add(camera.rotation, 'x').min(-2).max(2).step(0.01).name("X Rot")
camera_angle.add(camera.rotation, 'y').min(-2).max(2).step(0.01).name("Y Rot")
camera_angle.add(camera.rotation, 'z').min(-2).max(2).step(0.01).name("Z Rot")


// Controls

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// = = = = = = = = = = = ANIMATIONS = = = = = = = = = = = = = = =

// = = = = = Raycasting = = = = =

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

console.log(scene.children)


let objs = [scene.children[0]]
function render() {

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(objs) //scene.children

    for (const intersect of intersects) {
        gsap.to(intersect.object.position, { y: 0.15, duration: 1 })
    }

    for (const object of objs) {
        if (!intersects.find(intersect => intersect.object === object)) {
            gsap.to(object.position, { y: 0.12, duration: 1 })
            // tl1.restart()
        }
    }
    

    renderer.render(scene, camera);

}

window.addEventListener('mousemove', onMouseMove, false);

console.log(render())

function iAmConfusion() {

}

window.requestAnimationFrame(render);


// document.addEventListener('mousemove', onDocumentMouseMove)

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    // console.log(event)
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}


const updateCamera = (event) => {
    // console.log(window.scrollY)
    camera.position.z = window.scrollY * .002
}

window.addEventListener('scroll', updateCamera)

const clock = new THREE.Clock()


// = = = = = Animation Loop = = = = =
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // spotLightHelper.update();

    render()

    // Render
    renderer.render(scene, camera)
    //console.log(tickCount)
    //console.log(elapsedTime)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()