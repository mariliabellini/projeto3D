// Código realizado por Marília Martins Bellini com auxilio de IA, com o intuito de aprendizagem
// Totalmente possível alterar a imagem da terra, alternando através das imagens disponíveis.
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import terralinda from './images/terralinda.jpg'
import luaImg from './images/lua.jpg';  // Imagem da lua

const App = () => {
  const textureRef = useRef();
  const [textureReady, setTextureReady] = useState(false);
  const [time, setTime] = useState(0);  // Para controlar a órbita da lua
  const starGeometryRef = useRef();
  const starMaterialRef = useRef();

  useEffect(() => {
    const texture = new THREE.TextureLoader().load(terralinda, () => {
      setTextureReady(true);  // Marca como pronto quando a textura for carregada
    });
    textureRef.current = texture;

    // Criar a geometria das estrelas (pontos)
    const starCount = 5000;
    const starPositions = [];
    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 2000; // Posições aleatórias no espaço
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starPositions.push(x, y, z);
    }

    // Criar a geometria de pontos para as estrelas
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    starGeometryRef.current = starGeometry;

    // Material para as estrelas
    const starMaterial = new THREE.PointsMaterial({
      color: 0x888888, // Cor das estrelas (cinza claro)
      size: 0.5, // Tamanho das estrelas
      transparent: true,
      opacity: 0.7, // Opacidade para ajustar o brilho
    });
    starMaterialRef.current = starMaterial;
  }, []);

  useEffect(() => {
    // Atualiza a posição da lua a cada frame
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 0.005);// Aumenta o tempo, controlando a velocidade
    }, 16); // A cada 16ms (aproximadamente 60 frames por segundo)

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas>
        {/* Luzes equilibradas */}
        <ambientLight intensity={1.5} />  {/* Luz ambiente aumentada para clarear */}
        <directionalLight position={[5, 5, 5]} intensity={2.5} />  {/* Luz direcional */}
        
        {/* Controle de movimento */}
        <OrbitControls enableZoom={true} />

        {/* Adiciona as estrelas programaticamente */}
        {starGeometryRef.current && starMaterialRef.current && (
          <points geometry={starGeometryRef.current} material={starMaterialRef.current} />
        )}

        {/* Esfera com a textura da Terra */}
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

        {/* Lua girando em torno da Terra */}
        {textureReady && (
          <Sphere args={[0.5, 32, 32]} position={[Math.cos(time) * 4, 0, Math.sin(time) * 4]}>
            <meshStandardMaterial 
              map={new THREE.TextureLoader().load(luaImg)}  // Usando a imagem da lua
              roughness={0.5}
              metalness={0.5}
            />
          </Sphere>
        )}
      </Canvas>
    </div>
  );
};

export default App;
