//primeiro teste de terra, feito através de perlin noise a textura, sem imagens
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { Noise } from "noisejs"; // Para gerar Perlin Noise

const App = () => {
  const textureRef = useRef();
  const [textureReady, setTextureReady] = useState(false); // Estado para verificar se a textura está pronta

  // Função para gerar textura com Perlin Noise
  const generateContinentsTexture = () => {
    const size = 512;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;

    // Criando Perlin Noise para gerar continentes
    const noise = new Noise(Math.random());
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Gera ruído com base na posição
        const value = noise.perlin2(x / 100, y / 100); // Gera ruído suave para simular a Terra
        let r, g, b;

        // Valores do Perlin Noise e como mapeá-los para cores
        if (value < -0.2) {
          // Oceano (cores mais escuras, azul)
          r = 0;
          g = 0;
          b = 255;  // Azul para oceano
        } else if (value < 0.2) {
          // Continentes (cores claras, verde)
          r = 34;  // Verde
          g = 139;
          b = 34;  // Verde para continentes
        } else if (value < 0.5) {
          // Montanhas ou áreas elevadas
          r = 139;  // Cor de montanha (sombra de verde)
          g = 137;
          b = 92;
        } else {
          // Áreas muito elevadas
          r = 255; // Branco para áreas mais elevadas
          g = 255;
          b = 255;
        }

        // Preenche o pixel com a cor gerada
        const index = (y * size + x) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255; // A (totalmente opaco)
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    // Gerando a textura de continentes e aplicando
    textureRef.current = generateContinentsTexture();
    setTextureReady(true); // Marca a textura como pronta
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas>
        {/* Controle de câmera */}
        <OrbitControls enableZoom={true} />

        {/* Luzes */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Planeta (esfera) com a nova textura gerada por Perlin Noise */}
        {textureReady && (
          <Sphere args={[1, 32, 32]} scale={2}>
            <meshStandardMaterial map={textureRef.current} />
          </Sphere>
        )}
      </Canvas>
    </div>
  );
};

export default App;
