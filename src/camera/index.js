import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { degToRad } from 'three/src/math/MathUtils'

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
camera.position.z = 5

// Camera control
const control = new OrbitControls(camera, canvas)
// Make camera control crazy smooth
control.enableDamping = true

// Create WebGL render
const renderer = new WebGLRenderer({ canvas, antialias: true })
// - set camera size viewport
renderer.setSize(sizes.width, sizes.height)

// Create some 3d Object (Red Box)
const mesh = new Mesh(
  new BoxGeometry(2, 2, 2, 4, 4, 4),
  new MeshBasicMaterial({ color: 0xff0000, wireframe: true })
)
// - Add 3d Object to scene
scene.add(mesh)
// - Tranform object (position, rotate, scale)
mesh.rotation.reorder('YXZ')
mesh.rotation.x = degToRad(45)
mesh.rotation.y = degToRad(45)
mesh.rotation.z = degToRad(45)

// Loop Animation
const animate = () => {
  // Render Scene
  renderer.render(scene, camera)

  // Have to always update to make camera control crazy smooth if enableDamping is true
  control.update()

  // Make Loop to Call function again
  requestAnimationFrame(animate)
}

animate()

// Responsive handle scene
window.addEventListener('resize', () => {
  console.log('screen resizing')

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
})
