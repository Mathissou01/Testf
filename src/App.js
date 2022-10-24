import * as THREE from "three"
import { useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, usePlane, useCompoundBody, useSphere } from "@react-three/cannon"
import { Environment, useGLTF } from "@react-three/drei"
import { EffectComposer, SSAO } from "@react-three/postprocessing"

import niceColors from "nice-color-palettes"

const baubleMaterial = new THREE.MeshLambertMaterial({ color: "#c0a090", emissive: "red" })
const capMaterial = new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0.15, color: "#8a300f", emissive: "#600000", envMapIntensity: 9 })
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)
const baubles = [...Array(50)].map(() => ({ args: [0.6, 0.6, 0.8, 0.8, 1][Math.floor(Math.random() * 5)], mass: 1, angularDamping: 0.2, linearDamping: 0.95 }))

function Flower({ vec = new THREE.Vector3(), palette, ...props }) {
  const { nodes, materials } = useGLTF("/alien-flower.glb")
  const [ref, api] = useCompoundBody(() => ({
    ...props,
    shapes: [
      { type: "Box", position: [0, 0, 1.2 * props.args], args: new THREE.Vector3().setScalar(props.args * 0.4).toArray() },
      { type: "Sphere", args: [props.args] },
    ],
  }))
  useEffect(() => api.position.subscribe((p) => api.applyForce(vec.set(...p).normalize().multiplyScalar(-props.args * 35).toArray(), [0, 0, 0])), [api]) // prettier-ignore
  const [petalMaterial] = useState(() => {
    const color = niceColors[palette][Math.floor(Math.random() * 5)]
    const material = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide })
    material.color.set(color).convertSRGBToLinear()
    return material
  })
  return (
    <group ref={ref} dispose={null}>
      <group rotation={[0.44, -0.61, 0.66]} scale={0.2}>
        <mesh castShadow receiveShadow geometry={nodes.pPlane12_lambert5_0.geometry} material={petalMaterial} />
        <mesh castShadow receiveShadow geometry={nodes.pPlane12_lambert5_0_1.geometry} material={materials.pistil} />
      </group>
    </group>
  )
}

useGLTF.preload("/alien-flower.glb")

function Collisions() {
  const viewport = useThree((state) => state.viewport)
  usePlane(() => ({ position: [0, 0, 0], rotation: [0, 0, 0] }))
  usePlane(() => ({ position: [0, 0, 8], rotation: [0, -Math.PI, 0] }))
  usePlane(() => ({ position: [0, -4, 0], rotation: [-Math.PI / 2, 0, 0] }))
  usePlane(() => ({ position: [0, 4, 0], rotation: [Math.PI / 2, 0, 0] }))
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [2] }))
  return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 2.5))
}

export const App = () => {
  const [palette] = useState(() => Math.floor(Math.random() * 100))
  return (
    <Canvas
      shadows
      dpr={1.5}
      gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
      camera={{ position: [0, 0, 20], fov: 35, near: 10, far: 40 }}
      onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}>
      <ambientLight intensity={0.75} />
      <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[512, 512]} />
      <directionalLight position={[0, 5, -4]} intensity={4} />
      <directionalLight position={[0, -15, -0]} intensity={4} color="red" />
      <Physics gravity={[0, 0, 0]} iterations={10} broadphase="SAP">
        <Collisions />
        {baubles.map((props, i) => <Flower key={i} palette={palette} {...props} />) /* prettier-ignore */}
      </Physics>
      <Environment files="/adamsbridge.hdr" />
      <EffectComposer multisampling={0}>
        <SSAO samples={11} radius={30} intensity={20} luminanceInfluence={0.6} color="red" />
        <SSAO samples={21} radius={5} intensity={30} luminanceInfluence={0.6} color="red" />
      </EffectComposer>
    </Canvas>
  )
}
