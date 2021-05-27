import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'

// Import my module.
import * as Builder from './my_three_module.js'


// Loader
const dot_texture = new THREE.TextureLoader().load('textures/pixel_dot_background.png')
dot_texture.wrapS = THREE.RepeatWrapping;
dot_texture.wrapT = THREE.RepeatWrapping;
dot_texture.repeat.set(150, 150);


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// = = = = = = MY THREE MODULE = = = = = =
// Using my module to build some text geometry

const build = new Builder.Build(scene)

build.text("ISAIAH GORDON", 0.18, 0.04, [-1.05, 0.01, -1], [0, 0, 0])
build.text("Developer & IT Pro", 0.08, 0, [-0.9, 0.001, -0.7], [-1.571, 0, 0], gui)

build.pointLight(0.85, 0xcabbbb, [1.2, 0.45, -0.26])
build.pointLight(0.29, 0xcabbbb, [-1.18, 0.27, -0.7])
build.pointLight(0.82, 0xcabbbb, [-6.52, 15, -15], gui)

// The sun is a deadly lazer!
const hemLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
scene.add(hemLight);


// Objects
const floor_plane = new THREE.PlaneGeometry(30.0, 30.0, 1, 1)


// Materials
const material = new THREE.MeshPhongMaterial({ map: dot_texture, side: THREE.DoubleSide });
material.roughness = 0.95


// Mesh
// Scene Floor
const floor = new THREE.Mesh(floor_plane,material)
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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
console.log(0.001*innerWidth)
camera.position.set(0.97, 1, 0.4);

camera.zoom = 0.0004 * (innerWidth + innerHeight)
camera.updateProjectionMatrix();


camera.rotation.x = -0.66
camera.rotation.y = 0.44
camera.rotation.z = 0.31


scene.add(camera)

const camera_angle = gui.addFolder('Camera')

camera_angle.add(camera.position, 'x').min(-1).max(2).step(0.01).name("X Pos")
camera_angle.add(camera.position, 'y').min(-1).max(1).step(0.01).name("Y Pos")
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

/**
 * Animate
 */


document.addEventListener('mousemove', onDocumentMouseMove)

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    // console.log(event)
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const updateCamera = (event) => {
    // console.log(window.scrollY)
    camera.position.z = window.scrollY * .001
}

window.addEventListener('scroll', updateCamera)

const clock = new THREE.Clock()

// Animation Loop
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()