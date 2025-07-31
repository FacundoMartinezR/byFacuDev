// components/Model.tsx
import { useRef, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"

export function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const ref = useRef<Mesh>(null)

  // Opcional: pequeña animación de rotación
  useEffect(() => {
    if (!ref.current) return
    const mesh = ref.current
    function animate() {
      mesh.rotation.y += 0.0003
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return <primitive ref={ref} object={scene} />
}

// Asegúrate de que Vite copie tu archivo glb al build (p.ej. poniéndolo en public/)
useGLTF.preload("/models/man-worker.glb")
