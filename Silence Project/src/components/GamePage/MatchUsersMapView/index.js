import { Canvas, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';

function Fire() {
  // Carregar a textura do GIF
  const fireTexture = useLoader(TextureLoader, '/images/fire.png');

  // Forçar a atualização da textura a cada frame
  useFrame(() => {
    if (fireTexture) {
      fireTexture.needsUpdate = true; // Força a atualização da textura no frame
    }
  });

  return (
    <mesh position={[0, -1.4, 0]}>
      <planeGeometry args={[0.8, 1]} />
      <meshBasicMaterial map={fireTexture} transparent />
    </mesh>
  );
}

function FireOut() {
  // Carregar a textura do GIF
  const fireTexture = useLoader(TextureLoader, '/images/fireOut.png');

  return (
    <mesh position={[0, -1.4, 0]}>
      <planeGeometry args={[0.8, 1]} />
      <meshBasicMaterial map={fireTexture} transparent />
    </mesh>
  );
}

function Character({ image, position, i }) {
  const texture = useLoader(TextureLoader, image.src);

  var pos = [0, -1.5, 0];

  switch (i) {
    case 0:
      pos = [i - 1.2, -1.3, -0.5];
      break;
    case 1:
      pos = [i - 1.5, -1.3, -1];
      break;
    case 2:
      pos = [i - 1.5, -1.3, -1];
      break;
    case 3:
      pos = [i - 1.5, -1.3, -0.5];
      break;
  }

  return (
    <mesh position={pos}>
      <planeGeometry args={[1.2, 1.75]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function EmptySlot({ i }) {
  var pos = [0, -1.5, 0];

  switch (i) {
    case 0:
      pos = [i - 1.2, -1.3, -0.5];
      break;
    case 1:
      pos = [i - 1.5, -1.3, -1];
      break;
    case 2:
      pos = [i - 1.5, -1.3, -1];
      break;
    case 3:
      pos = [i - 1.5, -1.3, -0.5];
      break;
  }

  return (
    <mesh position={pos}>
      <planeGeometry args={[1.2, 1.75]} />
      <meshBasicMaterial color="black" transparent />
    </mesh>
  );
}

export default function MatchUsersMapView({ props, person }) {
  const { socket, roomInfo, characters, positions, turnInfo } = props;
  const { character03 } = person;

  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 45 }}
      style={{ width: '100vw', height: '100vh' }}>
      <ambientLight intensity={5} />
      <pointLight position={[0, 1, 0]} intensity={1} />
      <Suspense fallback={null}>
        {/* Fogueira no centro */}
        {!turnInfo.isDay && <Fire />}
        {turnInfo.isDay && <FireOut />}

        {/* Renderizar personagens */}
        {Array.from({ length: roomInfo.maxUsers }).map((_, i) => {
          const user = roomInfo.users[i];
          const characterIndex = i % characters.length;
          const character = characters[characterIndex];
          const position = positions[i] || [i - 2, 0, i * 0.5];

          // Renderizar personagem ou EmptySlot com base no número de usuários
          if (i < roomInfo.users.length) {
            return (
              <Character
                key={i}
                image={user ? character.image : character03}
                position={position}
                i={i}
              />
            );
          } else {
            return <EmptySlot key={i} i={i} />;
          }
        })}
      </Suspense>

      {/* Controles para câmera */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
