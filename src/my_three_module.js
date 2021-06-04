import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'
import { Mesh } from 'three';


class Debug {
    constructor(debug_gui) {
        this.debug_gui = debug_gui
    }

    objectDebug(obj, folderName) {

        var object_debug = this.debug_gui.addFolder(folderName)

        object_debug.add(obj.position, 'x').min(-3).max(3).step(0.005).name("<b>X Position</b> &#x1F697")
        object_debug.add(obj.position, 'y').min(-3).max(3).step(0.005).name("<b>Y Position</b> &#x1F446")
        object_debug.add(obj.position, 'z').min(-3).max(3).step(0.005).name("<b>Z Position</b> &#x1F698")

        object_debug.add(obj.rotation, 'x').min(-2).max(2).step(0.01).name("X Rotation")
        object_debug.add(obj.rotation, 'y').min(-2).max(2).step(0.01).name("Y Rotation")
        object_debug.add(obj.rotation, 'z').min(-2).max(2).step(0.01).name("Z Rotation")
    }

    spotLight(light, folderName) {
        var light_debug = this.debug_gui.addFolder(folderName)

        light_debug.add(light.position, 'x').min(-8).max(8).step(0.01).name("X Pos")
        light_debug.add(light.position, 'y').min(-8).max(8).step(0.01).name("Y Pos")
        light_debug.add(light.position, 'z').min(-16).max(8).step(0.01).name("Z Pos")

        // light.target.updateMatrixWorld();


        light_debug.add(light, 'intensity').min(0).max(6).step(0.01).name("Intensity")

        const lightColor = {
            color: 0xffffff
        }

        light_debug.addColor(lightColor, 'color')
            .onChange(() => {
                light.color.set(lightColor.color)
            })
    }
}


class Load {
    constructor(scene_arg, debug_gui) {
        this.scene_arg = scene_arg
        this.debug_gui = debug_gui

        console.log(scene_arg)
    }

    text(_callback, text, size, color, height, position, rotation, debugFolder) {

        const scene_arg = this.scene_arg
        const debug_gui = this.debug_gui

        var textMesh = new THREE.Mesh();
        scene_arg.add(textMesh)

        let fontLoader = new THREE.FontLoader();
        fontLoader.load('fonts/Poppins_SemiBold_Regular.json', function (font) {

            let geometrySetting = {
                font: font,
                size: size,
                height: height,
                curveSegments: 10,
            };

            let textMaterial = new THREE.MeshStandardMaterial({ color: color });

            let textGeometry = new THREE.TextGeometry(text, geometrySetting);

            textMesh.geometry = textGeometry
            textMesh.material = textMaterial

            textMesh.matrixAutoUpdate = false;
            textMesh.updateMatrix();
            textMesh.matrixAutoUpdate = true;

            if (_callback) {
                _callback()
            }
            
            if (debugFolder) {
                const debug = new Debug(debug_gui)
                debug.objectDebug(textMesh, debugFolder)
            }
        })

        textMesh.position.set(...position);
        textMesh.rotation.set(...rotation);

        return textMesh
    }
}


class Create {
    constructor() {}

    pointLight(intensity, color, position) {
        var pointLight = new THREE.PointLight(color, intensity)
        pointLight.position.set(...position)

        return pointLight
    }

    spotLight(intensity, color, position, targetPosition) {
        var spotLight = new THREE.SpotLight(color, intensity)
        spotLight.position.set(...position)
        spotLight.penumbra = 0.18

        spotLight.target.position.set(...targetPosition);
        spotLight.target.updateMatrixWorld();

        spotLight.angle = 0.4

        return spotLight
    }

}


export { Debug, Load, Create }
