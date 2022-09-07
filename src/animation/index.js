import {
  BoxGeometry,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import { degToRad } from 'three/src/math/MathUtils'

// DOM element
const canvas = document.querySelector('#webgl')

// Size of scene
const sizes = { width: canvas.clientWidth, height: canvas.clientHeight }
const aspect = sizes.width / sizes.height

// Create scene
const scene = new Scene()

// Create camera
const camera = new PerspectiveCamera(75, aspect)
// - Set position to step back from scene to see object on scene
camera.position.z = 5

// Create WebGL render
const renderer = new WebGLRenderer({ canvas })
// - set camera size viewport
renderer.setSize(sizes.width, sizes.height)

// Create some 3d Object (Red Box)
const mesh = new Mesh(
  new BoxGeometry(1, 1, 1, 3, 3, 3),
  new MeshBasicMaterial({ color: 0xff0000, wireframe: true })
)
// - Add 3d Object to scene
scene.add(mesh)
// - Tranform object (position, rotate, scale)
mesh.rotation.reorder('YXZ')

// Clock is use for handle time calculation to make animation run same speed any fps
const clock = new Clock()

// Loop Animation
const animate = () => {
  // get and return how many seconds have passed since the Clock was created.
  const elapsedTime = clock.getElapsedTime()
  console.log(elapsedTime)

  //   Rotate object animation
  mesh.rotation.x = elapsedTime * 3
  mesh.rotation.y = elapsedTime * 3
  mesh.rotation.z = elapsedTime * 3

  // Position object animation
  mesh.position.x =
    Math.sin(elapsedTime * 3 /* <== 3 is speed */) *
    2 /* <== 3 is how far to go */
  mesh.position.y =
    Math.cos(elapsedTime * 3 /* <== 3 is speed */) *
    2 /* <== 3 is how far to go */

  // Render Scene
  renderer.render(scene, camera)

  // Make Loop to Call function again
  requestAnimationFrame(animate)
}

animate()
