// para não perder o projeto da terra 3D já funcional
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import mapadnv from './images/mapadnv.png'; 

const App = () => {
  const textureRef = useRef();
  const [textureReady, setTextureReady] = useState(false);

  useEffect(() => {
    const texture = new THREE.TextureLoader().load(mapadnv, () => {
      setTextureReady(true);  // Marca como pronto quando a textura for carregada
    });
    textureRef.current = texture;
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas>
        {/* Luzes equilibradas */}
        <ambientLight intensity={1.5} />  {/* Luz ambiente aumentada para clarear */}
        <directionalLight position={[5, 5, 5]} intensity={2.5} />  {/* Luz direcional */}
        
        {/* Controle de movimento */}
        <OrbitControls enableZoom={true} />

        {/* Esfera com a textura */}
        {textureReady && (
          <Sphere args={[1, 32, 32]} scale={2}>
            <meshStandardMaterial 
              map={textureRef.current} 
              roughness={0.3}  // Superfície mais suave
              metalness={0.1}  // Não metálica
              emissive={new THREE.Color(0.08, 0.15, 0.3)} // Azul suavizado
              emissiveIntensity={0.12} // Intensidade suavizada
            />
          </Sphere>
        )}
      </Canvas>
    </div>
  );
};

export default App;
