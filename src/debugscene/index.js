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
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import { degToRad } from 'three/src/math/MathUtils'

// Debug UI
const gui = new dat.GUI()

// Debug UI color
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: `+=${degToRad(45)}` })
  },
}

gui.add(parameters, 'spin')

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

// Create Cube
const geometry = new BoxGeometry(2, 2, 2, 5, 5, 5)
const material = new MeshBasicMaterial({
  color: parameters.color,
  wireframe: true /*  <= have to set wireframe to true cause buffergeometry not fill object yet can it will show nothing  */,
})

// Create some 3d Object (Red Box)
const mesh = new Mesh(geometry, material)

// Set camara to lookAt mesh
// camera.lookAt(mesh.position)

// - Add 3d Object to scene
scene.add(mesh)

// Debug mesh
gui.add(mesh.position, 'x', -3, 3, 0.01)
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('mesh y')
gui.add(mesh.position, 'z', -3, 3, 0.01)
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')
gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color)
})
// gui.addColor(material.color)
console.log(material.color)
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
