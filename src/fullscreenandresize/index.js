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

// Size of scene
let sizes = { width: window.innerWidth, height: window.innerHeight }
let aspect = sizes.width / sizes.height

// Responsive handle scene
window.addEventListener('resize', () => {
  console.log('window have been resized')

  // Update Size of scene
  sizes = { width: window.innerWidth, height: window.innerHeight }
  aspect = sizes.width / sizes.height

  // Update camera
  camera.aspect = aspect
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Double click event handle to toggle fullscreen canvas.
window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})
// Create scene
const scene = new Scene()

// Create camera
const camera = new PerspectiveCamera(75, aspect)
// - Set position to step back from scene to see object on scene
camera.position.z = 5

// Camera control
const control = new OrbitControls(camera, canvas)
// Make scroll prevent from 3d scene
// control.enabled = false
// Make camera control crazy smooth
control.enableDamping = true

// Create WebGL render
const renderer = new WebGLRenderer({ canvas, antialias: true })
// - set camera size viewport
renderer.setSize(sizes.width, sizes.height)
// resolution of render high is more better quality (is this case is 2 for desktop).
// used of Math.min for set pixelration to not more than 2 cause it will use too much cpu or smt like that.
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
