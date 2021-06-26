import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'
import * as Stats from 'stats.js'

import gsap from 'gsap'

// Import my modules.
import * as Builder from './my_three_module.js'
import * as Assets from './dynamic_assets.js'
import * as Button from './buttons.js'

// Loading Manager
const loadingManager = new THREE.LoadingManager(() => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('fade-out');
    loadingScreen.addEventListener('transitionend', onTransitionEnd);
});

loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

loadingManager.onLoad = function () {
    console.log('Loading complete!');

    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('fade-out');

    const scrollsection = document.getElementById('scroll-section');
    scrollsection.classList.add('loaded-height');

    console.log("Polycount:", renderer.info.render.triangles)
    console.log("Drawcalls:", renderer.info.render.calls)
};

loadingManager.onError = function (url) {
    console.log('There was an error loading ' + url);
};

const gltf_loader = new GLTFLoader(loadingManager )


// Debug
const gui = new dat.GUI()
dat.GUI.toggleHide();

var stats = new Stats();
stats.showPanel(1);
document.body.appendChild( stats.dom )

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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.2, 3)
camera.position.set(0.14, 0.65, 0); //Y 0.65
camera.rotation.set(-0.75, 0, 0)
camera.zoom = 0.7
camera.fov = 45

// Mobile Responsive Camera Settings
if (innerWidth < 1050) {

    camera.position.set(0.14, 1.1, 0);
    camera.rotation.set(-1.1, 0, 0)

    camera.zoom = 0.5
    camera.fov = 45
}

camera.updateProjectionMatrix();
scene.add(camera)

const debug = new Builder.Debug(gui)
debug.object(camera, "Camera")


// Sky Light
// (The sun is a deadly lazer!)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);

const ambient_light = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambient_light)

// Scene Floor
const dot_texture = new THREE.TextureLoader().load('textures/pixel_dot_background.png')
dot_texture.wrapS = THREE.RepeatWrapping;
dot_texture.wrapT = THREE.RepeatWrapping;
dot_texture.repeat.set(20, 40);

const floor_plane = new THREE.PlaneGeometry(6.0, 14.0, 1, 1)

const floor_material = new THREE.MeshStandardMaterial({ map: dot_texture  });
floor_material.roughness = 0.8

const floor = new THREE.Mesh(floor_plane, floor_material)
scene.add(floor)

floor.rotation.x = 4.71239
floor.position.z = 3

// = = = = = = MY THREE MODULE = = = = = =
// Using my module to build some stuff!

const load = new Builder.Load(scene, gltf_loader, gui)
const create = new Builder.Create(scene)
const addAsset = new Assets.Create(scene, gltf_loader)

// TOP OF PAGE
load.text("ISAIAH GORDON", 0.11, 0xa8a8a8, 0.03, [-0.47, 0.11, -1], [-0.4, 0, 0])
load.text("Developer & IT Pro", 0.085, 0xb50018, 0.02, [-0.33, 0.03, -0.92], [-0.4, 0, 0])


// FLOOR BOARD SECTION

// Titles
load.text("PROJECTS", 0.13, 0xa8a8a8, 0.02, [-0.525, 0.01, 0.535], [0, 0.36, 0])
load.text("Floor Board", 0.08, 0xE73E43, 0.006, [-0.4, 0, 0.82], [-1.5708, 0, 0])

// Bill Board
load.model("models/section_art/floor_board/fb_bill_board_image.gltf", [0.53, 0.18, 0.8], [0, -0.44, 0], [0.3, 0.3, 0.3])
//const billBoardLight = new create.spotLight(1.4, 0xffaea3, [0.19, -0.69, 1.84], [0.53, 0.18, 0.8])
//scene.add(billBoardLight)

// Description 1
load.text("software that allows mcdonald's teams", 0.037, 0xedeef0, 0, [-0.39, 0.001, 0.9], [-1.571, 0, 0])
load.text("to visulize sales data in real time!", 0.037, 0xedeef0, 0, [-0.39, 0.001, 0.97], [-1.571, 0, 0])

// McD Store
var mcd = load.model("models/section_art/floor_board/mcd_store.gltf", [-0.25, 0.09, 1.33], [0, 0.9, 0], [0.3, 0.3, 0.3])
//debug.object(mcd, "McDonalds")

// McD Sign
var mcdSign = load.model("models/section_art/floor_board/mcd_sign.gltf", [-0.44, 0.135, 1.47], [0, 0.36, 0], [0.4, 0.4, 0.4])
//debug.object(mcdSign, "Sign")

// Description 2
//var description2 = `
//    Currently being tested at a
//    few locations, my software is
//    displayed on a board located
//    "on the floor" where staff can
//    see. It shows how much of a
//    certain product is being sold.
//`;

//load.text(description2, 0.03, 0x878787, 0, [-0.04, 0.001, 1], [-1.571, 0, 0])

// Description 2
load.text("Currently being tested at a", 0.03, 0x878787, 0, [-0.04, 0.001, 1.15], [-1.571, 0, 0])
load.text("few locations, my software is", 0.03, 0x878787, 0, [-0.04, 0.001, 1.21], [-1.571, 0, 0])
load.text("displayed on a board located", 0.03, 0x878787, 0, [-0.04, 0.001, 1.27], [-1.571, 0, 0])
load.text('"on the floor" where staff can', 0.03, 0x878787, 0, [-0.04, 0.001, 1.33], [-1.571, 0, 0])
load.text('see. It shows how much of a', 0.03, 0x878787, 0, [-0.04, 0.001, 1.39], [-1.571, 0, 0])
load.text('certain product is being sold.', 0.03, 0x878787, 0, [-0.04, 0.001, 1.45], [-1.571, 0, 0])


// French Fries
var fries = load.model("models/section_art/floor_board/fry_group.gltf", [0.44, 0.06, 1.7], [0, 0, 0], [0.7, 0.7, 0.7])

// Data Chart
var bars = load.model("models/section_art/floor_board/graph_bars.gltf", [0.62, 0.06, 1.6], [0, 0, 0], [0.6, 0.6, 0.6])

// Description 3
//var description3 = `
//    The locations that use my
//    software have a higher average
//    check because managers can
//    see how much their team upsells.
//`;

//load.text(description3, 0.03, 0x878787, 0, [-0.394, 0.001, 1.45], [-1.571, 0, 0])

load.text("The locations that use my", 0.03, 0x878787, 0, [-0.394, 0.001, 1.6], [-1.571, 0, 0])
load.text("software have a higher average", 0.03, 0x878787, 0, [-0.394, 0.001, 1.66], [-1.571, 0, 0])
load.text("check because managers can", 0.03, 0x878787, 0, [-0.394, 0.001, 1.72], [-1.571, 0, 0])
load.text("see how much their team upsells.", 0.03, 0x878787, 0, [-0.394, 0.001, 1.78], [-1.571, 0, 0])



// DOTOPS SECTION

// Titles
load.text("Dotops API", 0.08, 0x4D54E7, 0.006, [-0.4, 0, 2.7], [-1.5708, 0, 0], "title")

// Bill Board
//load.model("models/section_art/floor_board/fb_bill_board_image.gltf", [0.53, 0.18, 0.8], [0, -0.44, 0], [0.3, 0.3, 0.3])
//const billBoardLight = new create.spotLight(1.4, 0xffaea3, [0.19, -0.69, 1.84], [0.53, 0.18, 0.8])
//scene.add(billBoardLight)

// Description 1
load.text("An API that gamifys sales targets", 0.037, 0xedeef0, 0, [-0.4, 0.001, 2.78], [-1.571, 0, 0])
load.text("allowing restraunt teams to compete.", 0.037, 0xedeef0, 0, [-0.4, 0.001, 2.86], [-1.571, 0, 0])

// Server Racks
load.model("models/section_art/dotops/server_racks.gltf", [-0.2, 0.11, 3.3], [0, 0, 0], [0.55, 0.55, 0.55])

// McD Sign
//var mcdSign = load.model("models/section_art/floor_board/mcd_sign.gltf", [-0.44, 0.135, 1.47], [0, 0.36, 0], [0.4, 0.4, 0.4])
//debug.object(mcdSign, "Sign")

// Description 2
load.text("Restaurants later wanted the ability", 0.03, 0x878787, 0, [-0.04, 0.001, 3.14], [-1.571, 0, 0])
load.text("to see how much other stores were", 0.03, 0x878787, 0, [-0.04, 0.001, 3.2], [-1.571, 0, 0])
load.text("selling. So I built the Dotops API", 0.03, 0x878787, 0, [-0.04, 0.001, 3.26], [-1.571, 0, 0])
load.text('to manage the transfer of sales', 0.03, 0x878787, 0, [-0.04, 0.001, 3.32], [-1.571, 0, 0])
load.text('data between stores in real time.', 0.03, 0x878787, 0, [-0.04, 0.001, 3.38], [-1.571, 0, 0])

// Laptop
var laptop = load.model("models/section_art/dotops/laptop.gltf", [0.55, 0.01, 3.75], [0, 0, 0], [0.7, 0.7, 0.7])

// Data Chart
//var bars = load.model("models/section_art/floor_board/graph_bars.gltf", [0.62, 0.06, 1.6], [0, 0, 0], [0.6, 0.6, 0.6])
//debug.object(bars, "Bars")

// Description 3
load.text("It includes automated email reports", 0.03, 0x878787, 0, [-0.394, 0.001, 3.53], [-1.571, 0, 0])
load.text("that show retail performance. It has", 0.03, 0x878787, 0, [-0.394, 0.001, 3.59], [-1.571, 0, 0])
load.text("motivated restraunt teams to upsell", 0.03, 0x878787, 0, [-0.394, 0.001, 3.65], [-1.571, 0, 0])
load.text("products and drive new promotions.", 0.03, 0x878787, 0, [-0.394, 0.001, 3.71], [-1.571, 0, 0])


// SKILLS SECTION

load.text("SKILLS", 0.15, 0xa8a8a8, 0.03, [0.24, 0.01, 4.7], [0, -0.4, 0], "skills")

var python = load.model("models/section_art/skills/python.gltf", [-0.07, 0.18, 5], [0, 0.3, 0], [0.1, 0.1, 0.1])
//debug.object(python, "Python", -4, 7)

var js = load.model("models/section_art/skills/javascript.gltf", [-0.2, 0.3, 5.45], [0, 0.54, 0], [0.04, 0.04, 0.04])
//debug.object(js, "JS", -4, 7)

var html = load.model("models/section_art/skills/html-css.gltf", [-0.07, 0.18, 5.8], [0, 0.54, 0], [0.08, 0.08, 0.08])
//debug.object(html, "html", -4, 7)

var cloud = load.model("models/section_art/skills/gcp.gltf", [0.42, 0.35, 5.8], [0, -0.68, 0], [0.06, 0.06, 0.06])
//debug.object(cloud, "GCP", -4, 7)

var sql = load.model("models/section_art/skills/mysql.gltf", [0.3, 0.22, 6.2], [0, -0.19, 0], [0.08, 0.08, 0.08])
//debug.object(sql, "MySQL", -4, 7)

var node = load.model("models/section_art/skills/node.gltf", [0, 0.18, 6.4], [0, 0.4, 0], [0.09, 0.09, 0.09])
//debug.object(node, "Node", -4, 7)

var git = load.model("models/section_art/skills/git.gltf", [0.4, 0.18, 6.5], [0, -0.4, 0], [0.08, 0.08, 0.08])
//debug.object(git, "Git", -4, 7)

var blender = load.model("models/section_art/skills/blender.gltf", [-0.07, 0.13, 6.76], [-0.3, 0.55, 0], [0.08, 0.08, 0.08])
//debug.object(blender, "Blender", -4, 7)


// FINAL SECTION

// load.text("Let's Work Together!", 0.08, 0xa8a8a8, 0.02, [-0.44, 0.11, 7.8], [0, 0, 0])

// Title
var lets = load.text("Let's", 0.08, 0xa8a8a8, 0.015, [-0.2, 0.32, 8], [-0.4, 0, 0])
var work = load.text("Work", 0.08, 0xa8a8a8, 0.015, [-0.1, 0.22, 8.05], [-0.4, 0, 0])
var together = load.text("Together!", 0.08, 0xb50018, 0.015, [0, 0.11, 8.1], [-0.4, 0, 0])
debug.object(lets, "1 LETS", -1, 9)
debug.object(work, "2 WORK", -1, 9)
debug.object(together, "3 TOGETHER", -1, 9)


// Desktop
var desktop = load.model("models/section_art/final/desktop.gltf", [-0.3, 0.04, 8.2], [0, 0, 0], [0.7, 0.7, 0.7])
debug.object(desktop, "Desktop", -2, 10)

// Robot
var robot = load.model("models/section_art/final/robot.gltf", [0.6, 0.12, 8.2], [0, 0, 0], [0.7, 0.7, 0.7])
debug.object(robot, "Robot", -1, 1)

// Robot animation
var robo_turn = gsap.timeline({ repeat: -1, repeatDelay: 2 });
robo_turn.to(robot.rotation, { y: 0, duration: 1, ease: "none" })
robo_turn.to(robot.rotation, { y: 1, duration: 6, ease: "none" })
robo_turn.to(robot.rotation, { y: 1, duration: 1, ease: "none" })
robo_turn.to(robot.rotation, { y: -1, duration: 8, ease: "none" })
robo_turn.to(robot.rotation, { y: -1, duration: 1, ease: "none" })
robo_turn.to(robot.rotation, { y: 0, duration: 6, ease: "none" })




// Renderer
 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2))


// = = = = = = = = = = = ANIMATIONS = = = = = = = = = = = = = = =

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

window.addEventListener('mousemove', onMouseMove, false);

const button_render = Button.Create(mouse, camera, scene, gltf_loader)

// Setup Buttons
//const render_github_button = addAsset.button('github', [0.5, 0.02, -0.6], mouse, camera, 'https://github.com/isaiah-gordon')
//const render_linkedin_button = addAsset.button('linkedin', [0.2, 0.03, -0.6], mouse, camera, 'https://linkedin.com/in/isaia')

//const render_code_button1 = addAsset.button('code', [-0.1, 0.03, 2.05], mouse, camera, 'https://github.com/isaiah-gordon/floor-board')
//const render_images_button = addAsset.button('images', [0.35, 0.03, 2.05], mouse, camera, false, modal.images)

//const render_code_button2 = addAsset.button('code', [-0.1, 0.03, 4], mouse, camera, 'https://github.com/isaiah-gordon/dotops')
//const render_video_button = addAsset.button('video', [0.35, 0.03, 4], mouse, camera, false, modal.video)

//const render_contact_button = addAsset.button('contact', [0.17, 0.03, 8.4], mouse, camera, false, modal.contact)
//const render_resume_button = addAsset.button('resume', [0.17, 0.03, 8.6], mouse, camera, "https://storage.googleapis.com/isaiah-gordon.com/Isaiah%20Gordon's%20Resume.pdf")



const updateCamera = (event) => {
    //console.log(window.scrollY)
    camera.position.z = window.scrollY * .002
    
    if (camera.position.z > 9) {
        var scrollSection = document.getElementById("scroll-section");
        var canvas = document.getElementById("webgl");
        scrollSection.style.height = (canvas.offsetHeight + window.scrollY ) + "px"
    }
}

window.addEventListener('scroll', updateCamera)

const clock = new THREE.Clock()

// = = = = = Animation Loop = = = = =
const tick = () => {

    stats.begin()

    //render()
    document.body.style.cursor = "default";
    //render_linkedin_button()
    //render_github_button()

    //render_code_button1()
    //render_images_button()

    //render_code_button2()
    //render_video_button()

    //render_contact_button()
    //render_resume_button()

    button_render()
    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    stats.end()

}

tick()