import './style.css'
import * as THREE from 'three'

import gsap from 'gsap'

// Import my modules.
import * as Builder from './my_three_module.js'

import * as Modal from './modal.js'
const modal = new Modal.Open

const BUTTON_DATA = require('./button_data.json');
console.log(BUTTON_DATA['linkedin']['model_source'])


function Create(mouse, camera, scene, loader) {

    const load = new Builder.Load(scene, loader)
    const create = new Builder.Create(scene)

    var buttons = []
    var button_bounds = []
    var buttonLights = {}

    for (const [key, value] of Object.entries(BUTTON_DATA)) {

        var BUTTON = BUTTON_DATA[key]

        var scale = BUTTON['scale']

        var BUTTON_MODEL = load.model(BUTTON['model_source'], BUTTON['position'], [0, 0, 0], [scale, scale, scale])
        BUTTON_MODEL.name = key

        var BUTTON_BOUND_BOX = load.hitBox(BUTTON['position'], BUTTON['bound_box_scale'])
        BUTTON_BOUND_BOX.name = key

        var TOP_LIGHT_Y = BUTTON['position'][1] + 0.09
        var BOTTOM_LIGHT_Y = BUTTON['position'][1] - 0.02

        var BUTTON_TOP_LIGHT = create.pointLight(0, BUTTON['top_light_color'], [BUTTON['position'][0], TOP_LIGHT_Y, BUTTON['position'][2]])
        var BUTTON_BOTTOM_LIGHT = create.pointLight(0, BUTTON['bottom_light_color'], [BUTTON['position'][0], BOTTOM_LIGHT_Y, BUTTON['position'][2]])

        buttons.push(BUTTON_MODEL)
        button_bounds.push(BUTTON_BOUND_BOX)
        buttonLights[key] = { 'top_light': BUTTON_TOP_LIGHT, 'bottom_light': BUTTON_BOTTOM_LIGHT }
        
    }

    const BUTTON_ANIMATION_Y = BUTTON['position'][1] + 0.03

    const raycaster = new THREE.Raycaster();

    function render() {

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(button_bounds) //scene.children
        for (let i = 0; i < intersects.length; i++) {

            //var active_button_name = intersects[i].object.name
            //var active_button = scene.getObjectByName(active_button_name)

            gsap.to(scene.getObjectByName(intersects[i].object.name).position, { y: BUTTON_ANIMATION_Y, duration: 0.5 })
            gsap.to(buttonLights[intersects[i].object.name]['top_light'], { intensity: 0.5, duration: 0.5 })
            gsap.to(buttonLights[intersects[i].object.name]['bottom_light'], { intensity: 0.5, duration: 0.5 })
            document.body.style.cursor = "pointer";

            return intersects[i].object.name

        }

        for (const button of button_bounds) {
            if (!intersects.find(intersect => intersect.object != button)) {
                //var non_active_button = scene.getObjectByName(button.name)

                gsap.to(scene.getObjectByName(button.name).position, { y: BUTTON_DATA[scene.getObjectByName(button.name).name]['position'][1], duration: 0.5 })
                gsap.to(buttonLights[button.name]['top_light'], { intensity: 0, duration: 0.5 })
                gsap.to(buttonLights[button.name]['bottom_light'], { intensity: 0, duration: 0.5 })
            }
        }

    }

    function clickAction() {
        var button_name = render()
        if (button_name) {
            if (BUTTON_DATA[button_name]['link_source'] != false) {
                window.open(BUTTON_DATA[button_name]['link_source'])
            }
            else if (BUTTON_DATA[button_name]['link_source'] == false) {
                modal.open(button_name)
            }
        }
    }

    window.addEventListener('click', clickAction);

    return render;

}

function Test() {
    //console.log(BUTTON_DATA['github']['link_source'])

    //var wowee = BUTTON_DATA['github']

    //console.log(wowee['model_source'])

    //for (const [key, value] of Object.entries(BUTTON_DATA)) {
    //    //console.log(key, value)
    //    console.log(BUTTON_DATA[key]['model_source'])
    //}


    var dict = {}

    dict['steve'] = 123
    dict['bob'] = 321
    dict['bob'] = 666

    console.log(dict)
    console.log(dict['bob'])
}

export { Create, Test }