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

    object(obj, folderName, minVal, maxVal) {

        var object_debug = this.debug_gui.addFolder(folderName)

        object_debug.add(obj.position, 'x').min(minVal).max(maxVal).name("<b>X Position</b> &#x1F697")
        object_debug.add(obj.position, 'y').min(minVal).max(maxVal).name("<b>Y Position</b> &#x1F446")
        object_debug.add(obj.position, 'z').min(minVal).max(maxVal).name("<b>Z Position</b> &#x1F698")

        object_debug.add(obj.rotation, 'x').min(minVal).max(maxVal).step(0.01).name("X Rotation")
        object_debug.add(obj.rotation, 'y').min(minVal).max(maxVal).step(0.01).name("Y Rotation")
        object_debug.add(obj.rotation, 'z').min(minVal).max(maxVal).step(0.01).name("Z Rotation")
    }


    light(light, folderName) {
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
    constructor(scene_arg, loader, debug_gui) {
        this.scene_arg = scene_arg
        this.loader = loader
        this.debug_gui = debug_gui
    }

    hitBox(position, scale) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0 });
        const cube = new THREE.Mesh(geometry, material);

        cube.position.set(...position)
        cube.scale.set(...scale)

        this.scene_arg.add(cube);

        return cube
    }

    model(source, position, rotation, scale) {

        const scene_arg = this.scene_arg
        const loader = this.loader
        //const gltfLoader = new GLTFLoader()
        const gltfLoader = loader

        const modelGroup = new THREE.Object3D()
        scene_arg.add(modelGroup)

        gltfLoader.load(source, (gltf) => {
            scene_arg.add(gltf.scene)

            modelGroup.add(gltf.scene)
        })

        modelGroup.position.set(...position)
        modelGroup.rotation.set(...rotation)
        modelGroup.scale.set(...scale)

        return modelGroup
    }

    text(text, size, color, height, position, rotation, debugFolder) {

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
            
            if (debugFolder) {
                const debug = new Debug(debug_gui)
                debug.object(textMesh, debugFolder)
            }
        })

        textMesh.position.set(...position);
        textMesh.rotation.set(...rotation);

        return textMesh
    }
}


class Create {
    constructor(scene_arg) {
        this.scene_arg = scene_arg
    }

    pointLight(intensity, color, position) {
        var pointLight = new THREE.PointLight(color, intensity)

        pointLight.position.set(...position)

        this.scene_arg.add(pointLight)

        return pointLight
    }

    spotLight(intensity, color, position, targetPosition) {
        var spotLight = new THREE.SpotLight(color, intensity)
        spotLight.position.set(...position)

        spotLight.target.position.set(...targetPosition);
        spotLight.target.updateMatrixWorld();

        return spotLight
    }

}


export { Debug, Load, Create }
