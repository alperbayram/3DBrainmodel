//https://github.com/alperbayram 
//alper


/*
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.min.js" ></script>
    <script src="https://threejs.org/examples/js/controls/OrbitControls.js"></script>


*/
import * as THREE from './three.module.js';
import { OrbitControls } from "./OrbitControls.js";
import { OBJLoader } from './OBJLoader.js';

var container;
var camera, scene, renderer,controls;


var sizeX = 500,
    sizeY = 500;

    let object;




function init() {

    var puthere = document.getElementById("brain");
    container = document.createElement('div');
    puthere.appendChild(container);


    // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera = new THREE.PerspectiveCamera(45, sizeX / sizeY, 1, 2000);
    camera.position.z = -10;




    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight( 0x880808, 0.9 );
    scene.add( ambientLight );
    
    const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( camera );


    function loadModel() {

        object.traverse( function ( child ) {

            if ( child.isMesh ) child.material.map = texture;

        } );

        scene.add( object );

    }

    const manager = new THREE.LoadingManager( loadModel );

    manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

    // texture

    const textureLoader = new THREE.TextureLoader( manager );
    const texture = textureLoader.load( '../obj/brain.jpg' );

    // model

    function onProgress( xhr ) {

        if ( xhr.lengthComputable ) {

            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

        }

    }

    function onError() {}

    const loader = new OBJLoader( manager );
    loader.load( '../obj/freesurff.Obj', function ( obj ) {

        object = obj;

    }, onProgress, onError );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);

    container.appendChild(renderer.domElement);


    controls = new OrbitControls(camera, renderer.domElement);
            //    controls.listenToKeyEvents(window); // optional

                //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
				controls.minDistance = 10;
				controls.maxDistance = 80;
				controls.rotateSpeed = 3.0;
               
				controls.maxPolarAngle = Math.PI / 2;
   // document.addEventListener('mousemove', onDocumentMouseMove, false);

    window.addEventListener('resize', onWindowResize, false);
}


function onWindowResize() {
    camera.aspect = sizeX / sizeY;
    camera.updateProjectionMatrix();
    renderer.setSize(sizeX, sizeY);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    render();
}

function render() {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

init();
animate();