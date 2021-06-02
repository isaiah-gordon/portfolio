import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'


class Build {
    constructor(scene_arg) {
        this.scene_arg = scene_arg
    }

    text(text, size, height, position, rotation, debug) {
        let fontLoader = new THREE.FontLoader();
        // let test_text = this.scene
        const scene_arg = this.scene_arg
        fontLoader.load('fonts/Poppins_SemiBold_Regular.json', function (font) {
            let geometrySetting = {
                font: font,
                size: size,
                height: height,
                curveSegments: 7,
            };

            let textMaterial = new THREE.MeshLambertMaterial({ color: 0xf2f2f2 });

            // Name Text Statue
            let textGeometry = new THREE.TextGeometry(text, geometrySetting);
            let textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(...position);
            textMesh.rotation.set(...rotation);

            scene_arg.add(textMesh);

            if (debug != undefined) {
                const text_debug = debug.addFolder('Text')

                text_debug.add(textMesh.position, 'x').min(-1).max(1).step(0.001).name("X Pos")
                text_debug.add(textMesh.position, 'y').min(-1).max(1).step(0.001).name("Y Pos")
                text_debug.add(textMesh.position, 'z').min(-1).max(1).step(0.001).name("Z Pos")

                text_debug.add(textMesh.rotation, 'x').min(-2).max(2).step(0.001).name("X Rot")
                text_debug.add(textMesh.rotation, 'y').min(-2).max(2).step(0.001).name("Y Rot")
                text_debug.add(textMesh.rotation, 'z').min(-2).max(2).step(0.001).name("Z Rot")
            }
        })
    }

    pointLight(intensity, color, position, debug) {
        const pointLight = new THREE.PointLight(color, intensity)

        pointLight.position.set(...position)
        this.scene_arg.add(pointLight)


        if (debug != undefined) {
            const light = debug.addFolder('Light')

            light.add(pointLight.position, 'x').min(-8).max(8).step(0.01).name("X Pos")
            light.add(pointLight.position, 'y').min(-8).max(8).step(0.01).name("Y Pos")
            light.add(pointLight.position, 'z').min(-16).max(8).step(0.01).name("Z Pos")

            light.add(pointLight, 'intensity').min(0).max(6).step(0.01).name("Intensity")

            const lightColor = {
                color: 0xffffff
            }

            light.addColor(lightColor, 'color')
                .onChange(() => {
                    pointLight.color.set(lightColor.color)
                })

            const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1)
            this.scene_arg.add(pointLightHelper)
        }
    }

}

class OtherClass {
    constructor(class_arg) {
        this.arg = class_arg
    }

    text(spec) { 
        let some_math = console.log(spec + 3)
        return (spec + 3)
    }

    name(spec) {
        return this.arg
    }
}

// exports.Build = Build;
export { Build, OtherClass }


// new Build('Hello class!').square('Hi function!')

//exports.buildText = function () {
//    console.log("It worked!")
//}