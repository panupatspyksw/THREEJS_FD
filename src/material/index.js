import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  Clock,
  Color,
  CubeTextureLoader,
  DoubleSide,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  Meshmaterialerial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  NearestFilter,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import * as dat from 'dat.gui'
import IMGcolorTexture from '../textures/door/color.jpg'
import IMGalphaTexture from '../textures/door/alpha.jpg'
import IMGheightTexture from '../textures/door/height.jpg'
import IMGnormalTexture from '../textures/door/normal.jpg'
import IMGroughnessTexture from '../textures/door/roughness.jpg'
import IMGambientOcclusionTexture from '../textures/door/ambientOcclusion.jpg'
import IMGmetalnessTexture from '../textures/door/metalness.jpg'
import IMGmetalnessTexture from '../textures/door/metalness.jpg'
import IMGmatcapTexture from '../textures/matcaps/3.png'
import IMGgradientTexture from '../textures/gradients/5.jpg'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

// Create Textures
const loadingManager = new LoadingManager()
const textureLoader = new TextureLoader(loadingManager)
const cubeTextureLoader = new CubeTextureLoader()
const colorTexture = textureLoader.load(IMGcolorTexture)
const alphaTexture = textureLoader.load(IMGalphaTexture)
const heightTexture = textureLoader.load(IMGheightTexture)
const normalTexture = textureLoader.load(IMGnormalTexture)
const roughnessTexture = textureLoader.load(IMGroughnessTexture)
const ambientOcclusionTexture = textureLoader.load(IMGambientOcclusionTexture)
const metalnessTexture = textureLoader.load(IMGmetalnessTexture)
const matcapTexture = textureLoader.load(IMGmatcapTexture)
const gradientTexture = textureLoader.load(IMGgradientTexture)
// gradientTexture.minFilter = NearestFilter
gradientTexture.magFilter = NearestFilter
gradientTexture.generateMipmaps = false
// const environmentMapTexture = cubeTextureLoader.load()

// Create Meshes
const cubeGometry = new BoxGeometry(1, 1, 1)
const torusGometry = new TorusGeometry(0.5, 0.1, 64, 64)
const sphereGometry = new SphereGeometry(0.5, 16, 16)
const planeGometry = new PlaneGeometry(1, 1, 64, 128)
// const material = new MeshNormalMaterial({
//   // try to avoid double side
//   side: DoubleSide,
//   map: colorTexture,
// })
// material.transparent = true
// // material.opacity = 0.5
// material.color = new Color(0xff00ff)
// material.alphaMap = alphaTexture
// const material = new MeshMatcapMaterial({
//   matcap: matcapTexture,
//   side: DoubleSide,
// })
// const material = new MeshDepthMaterial()
// material.flatShading = true
//
// const material = new MeshLambertMaterial({ color: 0xff0000 })
// const material = new MeshPhongMaterial({
//   color: 0xff0000,
//   shininess: 1000,
//   specular: 0xffff00,
// })
// const material = new MeshToonMaterial()
// material.gradientMap = gradientTexture
const material = new MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.2,
  // map: colorTexture,
  // aoMap: ambientOcclusionTexture,
  // aoMapIntensity: 1,
  // displacementMap: heightTexture,
  // displacementScale: 0.05,
  // metalnessMap: metalnessTexture,
  // roughnessMap: roughnessTexture,
  // normalMap: normalTexture,
  // normalScale: { x: 0.5, y: 0.5 },
  // alphaMap: alphaTexture,
  // transparent: true,
})
const mg = gui.addFolder('material')
mg.add(material, 'metalness').min(0).max(1).step(0.0001)
mg.add(material, 'roughness').min(0).max(1).step(0.0001)
mg.add(material, 'aoMapIntensity').min(0).max(1).step(0.0001)
mg.add(material, 'displacementScale').min(0).max(1).step(0.0001)

const plane = new Mesh(planeGometry, material)
const torus = new Mesh(torusGometry, material)
torus.position.x = -1.5
const sphere = new Mesh(sphereGometry, material)
sphere.position.x = 1.5
scene.add(plane, torus, sphere)

// Create uv2 for aoMap to work with self geometry attributes u v array
plane.geometry.setAttribute(
  'uv2',
  new BufferAttribute(plane.geometry.attributes.uv.array, 2)
)
sphere.geometry.setAttribute(
  'uv2',
  new BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)
torus.geometry.setAttribute(
  'uv2',
  new BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

// Add Lights
const ambientLight = new AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)
const pointLight = new PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(ambientLight, pointLight)

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
  // sphere.rotation.y = 0.1 * elapsedTime
  // plane.rotation.y = 0.1 * elapsedTime
  // torus.rotation.y = 0.1 * elapsedTime

  // sphere.rotation.x = 0.1 * elapsedTime
  // plane.rotation.x = 0.1 * elapsedTime
  // torus.rotation.x = 0.1 * elapsedTime
  control.update()

  // Render Scene
  renderer.render(scene, camera)

  // Make Loop to Call function again
  requestAnimationFrame(animate)
}

animate()
