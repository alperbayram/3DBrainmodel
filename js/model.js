//https://github.com/alperbayram 
//alper


/*
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.min.js" ></script>
    <script src="https://threejs.org/examples/js/controls/OrbitControls.js"></script>


*/


var container;
var camera, scene, renderer;
var directionalLight;

var mouseX = 0, mouseY = 0;


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var sizeX = 500, sizeY = 500;


var brain;

init();
animate();


function init() {
  
    var puthere = document.getElementById("brain");
    container = document.createElement( 'div' );
    puthere.appendChild( container );

  
    // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera = new THREE.PerspectiveCamera( 45, sizeX / sizeY, 1, 2000 );
    camera.position.z = -10;



  
    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0x111111 );
    scene.add( ambient );

    directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, -1 );
    scene.add( directionalLight );



    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

	console.log( item, loaded, total );

    };



  
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'obj/freesurff.OBJ', function ( object ) {

	brain = object;
	object.position.y = 0;
	scene.add( object );

    } );


    renderer = new THREE.WebGLRenderer();
    renderer.setSize( 500, 500 );
 
    container.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    // window.addEventListener( 'resize', onWindowResize, false );
   

}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}

//

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
 
    var r = 7;
    var s = 0.01;

  
    camera.position.x = r * Math.sin( mouseX * s ) * Math.cos(mouseY/2 * s);
    camera.position.z = -r * Math.cos( mouseX * s ) * Math.cos(mouseY/2 * s);
    camera.position.y = r * Math.sin(mouseY/2 * s);

    directionalLight.position.x = r * Math.sin( mouseX * s ) * Math.cos(mouseY/2 * s);
    directionalLight.position.z = -r * Math.cos( mouseX * s ) * Math.cos(mouseY/2 * s);
    directionalLight.position.y = r * Math.sin(mouseY/2 * s);

    brain.rotation.y += 0.01;
    brain.rotation.x += 0.001;

    camera.lookAt( scene.position );

    renderer.render( scene, camera );
}




