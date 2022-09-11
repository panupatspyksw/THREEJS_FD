import {
  AxesHelper,
  Clock,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  NearestFilter,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import * as dat from 'dat.gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

// Create Texture
const textureLoader = new TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/4.png')

// Load fonts
const fontLoader = new FontLoader()

// Donuts storage
const donuts = []

// Load font
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  // Create 3D Font
  const bevelthickness = 0.03 // z
  const bevelseg = 4
  const bevelsize = 0.02 // x y
  const textGeometry = new TextGeometry('DONUTS', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: bevelthickness,
    bevelSize: bevelsize,
    bevelOffset: 0,
    bevelSegments: bevelseg,
  })

  // Make center text by scratch
  // textGeometry.computeBoundingBox()

  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - bevelsize) * 0.5,
  //   // -textGeometry.boundingBox.max.y * 0.5,
  //   -(textGeometry.boundingBox.max.y - bevelsize) * 0.5,
  //   (textGeometry.boundingBox.max.z - bevelthickness) * 0.5
  // )
  // console.log(textGeometry.boundingBox)

  // Make center by three js function
  textGeometry.center()

  const textMaterial = new MeshMatcapMaterial({
    matcap: matcapTexture,
    color: 0xffff00,
  })

  const text = new Mesh(textGeometry, textMaterial)
  scene.add(text)
  // end Create 3D Font

  // Create 500 donuts
  const donutGeometry = new TorusGeometry(0.3, 0.1, 32, 32)
  const donutMaterial = new MeshMatcapMaterial({
    matcap: matcapTexture,
  })
  for (let i = 0; i < 500; i++) {
    const donut = new Mesh(donutGeometry, donutMaterial)
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10
    donut.rotation.y = (Math.random() - 0.5) * 10
    donut.rotation.x = (Math.random() - 0.5) * 10
    donut.rotation.z = (Math.random() - 0.5) * 10

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)
    scene.add(donut)
    donuts.push(donut)
  }
})

// Debug UI
const gui = new dat.GUI()

// Setting Scene
const canvas = document.querySelector('#webgl')
const scene = new Scene()
let sizes = { width: window.innerWidth, height: window.innerHeight }
let aspect = sizes.width / sizes.height
const camera = new PerspectiveCamera(75, aspect)
camera.position.z = 3
const renderer = new WebGLRenderer({ canvas, antialias: true })
renderer.setPixelRatio(
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
)
renderer.setSize(sizes.width, sizes.height)
const control = new OrbitControls(camera, canvas)
control.enableDamping = true
control.addEventListener('change', () => {
  renderer.render(scene, camera)
})

// Axes Helper
const axeHelper = new AxesHelper()
// scene.add(axeHelper)

// Clock is use for handle time calculation to make animation run same speed any fps
const clock = new Clock()

window.addEventListener('resize', () => {
  sizes = { width: window.innerWidth, height: window.innerHeight }
  aspect = sizes.width / sizes.height
  camera.aspect = aspect
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Loop Animation
const animate = () => {
  // get and return how many seconds have passed since the Clock was created.
  const elapsedTime = clock.getElapsedTime()

  control.update()
  donuts.map((mesh) => {
    // console.log(mesh)
    mesh.rotation.x = 1 * elapsedTime
    // mesh.rotation.y = 1 * elapsedTime
  })

  // Render Scene
  renderer.render(scene, camera)

  // Make Loop to Call function again
  requestAnimationFrame(animate)
}

animate()
