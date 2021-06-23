import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'

import gsap from 'gsap'

// Import my modules.
import * as Builder from './my_three_module.js'
import * as Assets from './dynamic_assets.js'

const ASSET_DATA = require("./dynamic_assets_data.json");

function getJSONPath(path) {
    var res = path.split('.').reduce(function (x, y) {
        return x && x[y];
    }, ASSET_DATA);
    return res
}

class Create {
    constructor(scene_arg, loader_arg) {
        this.scene_arg = scene_arg
        this.loader_arg = loader_arg

        //this.load = new Builder.Load(scene_arg)
        //this.create = new Builder.Create(scene_arg)
    }

    button(name, link_source, position, mouse, camera) {

        function pathToKey(key) {
            return getJSONPath('buttons.' + name + '.' + key)
        }

        const load = new Builder.Load(this.scene_arg, this.loader_arg)
        const create = new Builder.Create(this.scene_arg)

        var scale = pathToKey('model_scale')
        var BUTTON_MODEL = load.model(pathToKey('model_source'), position, [0, 0, 0], [scale, scale, scale])

        var TOP_LIGHT_Y = position[1] + 0.09
        var BOTTOM_LIGHT_Y = position[1] - 0.02

        var BUTTON_TOP_LIGHT = create.pointLight(0, pathToKey('top_light_color'), [position[0], TOP_LIGHT_Y, position[2]])
        var BUTTON_BOTTOM_LIGHT = create.pointLight(0, pathToKey('bottom_light_color'), [position[0], BOTTOM_LIGHT_Y, position[2]])

        let objs = [BUTTON_MODEL]
        const BUTTON_ANIMATION_Y = position[1] + 0.03

        function render() {

            const raycaster = new THREE.Raycaster();

            // update the picking ray with the camera and mouse position
            raycaster.setFromCamera(mouse, camera);

            // calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects(objs, true) //scene.children

            for (let i = 0; i < intersects.length; i++) {

                gsap.to(BUTTON_MODEL.position, { y: BUTTON_ANIMATION_Y, duration: 0.5 })
                gsap.to(BUTTON_TOP_LIGHT, { intensity: 0.5, duration: 0.5 })
                gsap.to(BUTTON_BOTTOM_LIGHT, { intensity: 0.5, duration: 0.5 })
                document.body.style.cursor = "pointer";

                return name

            }

            for (const object of objs) {
                if (!intersects.find(intersect => intersect.object != object)) {
                    gsap.to(BUTTON_MODEL.position, { y: position[1], duration: 0.5 })
                    gsap.to(BUTTON_TOP_LIGHT, { intensity: 0, duration: 0.5 })
                    gsap.to(BUTTON_BOTTOM_LIGHT, { intensity: 0, duration: 0.5 })
                }
            }

        }

        function openWebsite() {
            var object = render()
            if (object == name) {
                window.open(link_source)
            }
        }

        window.addEventListener('click', openWebsite);

        return render;
        
    }

}

export { Create }