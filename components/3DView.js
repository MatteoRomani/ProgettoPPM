import React, {useState} from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Asset } from 'expo-asset';
import {Renderer, THREE} from "expo-three";
import {GLView} from "expo-gl";
import OrbitControlsView from "expo-three-orbit-controls";
import {
    AmbientLight,
    Fog,
    PerspectiveCamera,
    PointLight,
    Scene,
} from 'three';


export default function ThreeDView() {
    const [camera, setCamera] = useState(null)
    let timeout;

    React.useEffect(() => {
        // Clear the animation loop when the component unmounts
        return () => clearTimeout(timeout);
    }, []);


    return (
        <OrbitControlsView style={{flex: 1}} camera={camera}>
            <GLView
                style={{ flex: 1 }}
                onContextCreate={async (gl) => {
                    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
                    const sceneColor = 668096;

                    // Create a WebGLRenderer without a DOM element
                    const renderer = new Renderer({ gl });
                    renderer.setSize(width, height);
                    renderer.setClearColor(0x668096);


                    const camera = new PerspectiveCamera(75, width / height, 0.01, 1000);
                    camera.position.set(2, 5, 7);
                    setCamera(camera)

                    const scene = new Scene();
                    scene.fog = new Fog(sceneColor, 1, 10000);

                    const ambientLight = new AmbientLight(0x101010);
                    scene.add(ambientLight);

                    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
                    pointLight.position.set(0, 200, 200);
                    scene.add(pointLight);

                    const asset = Asset.fromModule(require("../assets/model.obj"));
                    await asset.downloadAsync();

                    // instantiate a loader
                    const loader = new OBJLoader();

                    // load a resource
                    loader.load(
                        // resource URL
                        asset.localUri,
                        // called when resource is loaded
                        function ( object ) {
                            object.scale.set(0.020, 0.020, 0.020)

                            scene.add( object );
                            camera.lookAt(object.position)
                            //rotate my obj file
                            function rotateObject(object, degreeX=0, degreeY=0, degreeZ=0) {
                                object.rotateX(THREE.Math.degToRad(degreeX));
                                object.rotateY(THREE.Math.degToRad(degreeY));
                                object.rotateZ(THREE.Math.degToRad(degreeZ));
                            }

                            // usage:
                            rotateObject(object, -90, 0,60);




                            // render loop for show the object on the screen. The scene is update 60 time for second
                            const render = () => {
                                timeout = requestAnimationFrame(render);
                                renderer.render(scene, camera);
                                gl.endFrameEXP();
                            };
                            render();
                        },

                        // called when loading is in progresses
                        function ( xhr ) {
                            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                        },
                        // called when loading has errors
                        function ( error ) {
                            console.log( error );
                        }

                    );
                }}
            />
        </OrbitControlsView>
    );
}
