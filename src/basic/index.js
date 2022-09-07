import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'

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
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0xff0000 })
)
// - Add 3d Object to scene
scene.add(mesh)

// Render Scene
renderer.render(scene, camera)
