import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import { randFloatSpread } from 'three/src/math/MathUtils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// DOM element
const canvas = document.querySelector('#webgl')
const canvascontainer = document.querySelector('#webglcontainer')

// Size of scene
let sizes = {
  width: canvascontainer.clientWidth,
  height: canvascontainer.clientHeight,
}
let aspect = sizes.width / sizes.height

// Create scene
const scene = new Scene()

// Create camera
const camera = new PerspectiveCamera(75, aspect)
// - Set position to step back from scene to see object on scene
camera.position.z = 3

// Camera control
const controls = new OrbitControls(camera, canvas)
// Make scroll prevent from 3d scene
// control.enabled = false
// Make camera control crazy smooth
controls.enableDamping = true

// Create WebGL render
const renderer = new WebGLRenderer({ canvas })
// - set camera size viewport
renderer.setSize(sizes.width, sizes.height)

// Create Geometry by Float32Array
// Type array , can only store floats, fixed length, easy for computer to handle
const count = 1000
const positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4
}
// Create buffer geometry from positionsArray
const geometry = new BufferGeometry()
// Convert positionsArray to BufferAttribute for use in geometry
const positionsAttribute = new BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)

// // first vertice
// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0

// // second vertice
// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// // third vertice
// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0

// Create some 3d Object (Red Box)
const mesh = new Mesh(
  geometry,
  new MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true /*  <= have to set wireframe to true cause buffergeometry not fill object yet can it will show nothing  */,
  })
)

// Set camara to lookAt mesh
// camera.lookAt(mesh.position)

// - Add 3d Object to scene
scene.add(mesh)

/**
 * Animate
 */
const clock = new Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

// Responsive handle scene
window.addEventListener('resize', () => {
  // Update Size of scene
  sizes = {
    width: canvascontainer.clientWidth,
    height: canvascontainer.clientHeight,
  }
  aspect = sizes.width / sizes.height

  // Update camera
  camera.aspect = aspect
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.render(scene, camera)
})
