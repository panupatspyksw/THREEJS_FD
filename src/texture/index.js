import {
  BoxGeometry,
  ConeGeometry,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  MirroredRepeatWrapping,
  NearestFilter,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Texture,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { degToRad } from 'three/src/math/MathUtils'
// import IMGcolorTexture from '../textures/checkerboard-1024x1024.png'
// import IMGcolorTexture from '../textures/checkerboard-8x8.png'
import IMGcolorTexture from '../textures/minecraft.png'

// import IMGcolorTexture from '../textures/door/color.jpg'
import IMGalplaTexture from '../textures/door/alpha.jpg'
import IMGheightTexture from '../textures/door/height.jpg'
import IMGnormalTexture from '../textures/door/normal.jpg'
import IMGambientOcclusionTexture from '../textures/door/ambientOcclusion.jpg'
import IMGmetalnessTexture from '../textures/door/metalness.jpg'
import IMGrougnessTexture from '../textures/door/roughness.jpg'

// Textures
const loadingManager = new LoadingManager()
// loadingManager.onStart = () => {
//   console.log('onStart')
// }
// loadingManager.onProgress = (e) => {
//   console.log('onProgress')
// }
// loadingManager.onError = () => {
//   console.log('onError')
// }
// loadingManager.onLoad = () => {
//   console.log('onLoaded')
// }
const textureLoader = new TextureLoader(loadingManager)
const colorTexture = textureLoader.load(IMGcolorTexture)
const alplaTexture = textureLoader.load(IMGalplaTexture)
const heightTexture = textureLoader.load(IMGheightTexture)
const normalTexture = textureLoader.load(IMGnormalTexture)
const ambientOcclusionTexture = textureLoader.load(IMGambientOcclusionTexture)
const metalnessTexture = textureLoader.load(IMGmetalnessTexture)
const rougnessTexture = textureLoader.load(IMGrougnessTexture)

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = MirroredRepeatWrapping
// colorTexture.wrapT = MirroredRepeatWrapping
// // colorTexture.rotation = degToRad(10)
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = degToRad(180)
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// make performance better cause use mini file (best practice)
// colorTexture.minFilter = NearestFilter
// Tips : jpg is way more ligher than png but png more compression than jpg if want high resolution also you can minimum png in TinyPNG
colorTexture.magFilter = NearestFilter
colorTexture.generateMipmaps = false

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

const geometry = new BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
const mesh = new Mesh(
  geometry,
  // new SphereGeometry(1, 32, 32),
  // new ConeGeometry(1, 2, 32),
  // new TorusGeometry(1, 0.35, 32, 100),
  new MeshBasicMaterial({ wireframe: false, map: colorTexture })
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
