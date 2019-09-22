
// 3D Cylinder with three.js
// End goal is to have each face of the cylinder be one sol div
// then on the user's scroll we will rotate the cylinder to the
// next cylinder face/div
const wrapper = document.querySelector(".content-wrapper")
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
wrapper.appendChild( renderer.domElement );

const geometry = new THREE.CylinderGeometry( 2, 2, 2, 8 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );

camera.position.z = 10;

// const animate = function () {
//   requestAnimationFrame( animate );
//
//   // cylinder.rotation.x += 0.01;
//   cylinder.rotation.y -= 0.01;
//
//   renderer.render( scene, camera );
// };

// animate();

document.addEventListener("mousewheel", mouseWheelHandler);

function mouseWheelHandler(e) {
  e.preventDefault();

  // Scroll only on vertical user scroll
  if (e.deltaX === 0) {

    animate(e.deltaY)
    // How far to move the content
    // let delta = 10 * e.deltaY;


    // Set the new horizontal position for the content
    // let position = wrapper.scrollLeft + delta;

    // Move content to new position
    // wrapper.scrollLeft = position;
  }
}

const animate = function (d) {
  requestAnimationFrame( animate );

  // cylinder.rotation.x += 0.01;
  cylinder.rotation.y -= d;

  renderer.render( scene, camera );
};
