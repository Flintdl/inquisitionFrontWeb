import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ContentLobby from '../src/components/Lobby/Content';
import MenuLobby from '../src/components/Lobby/Menu';
import MiddleLobby from '../src/components/Lobby/Middle';
import Loading from '../src/components/_Global/Loading';
import ListServer from '../src/components/ServerMatch/ListServer';
import FooterLobby from '../src/components/Lobby/Footer';
import LobbyCreateMatch from '../src/components/ServerMatch/CreateMatch';
import { useSocket } from '../contexts/SocketContext';
import { useMessage } from '../contexts/MessageContex';
import MessageContainer from '../src/components/_Global/Messages';
import CustomDialog from '../src/components/_Global/Dialog';
import CustomButton from '../src/components/_Global/Commons/Buttons';
import CustomTitles from '../src/components/_Global/Commons/Titles';
import { useSoundAllowed } from '../contexts/SoundContext';
import CharacterCustomization from '../src/components/Character/Customization';
import Configurations from '../src/components/Configurations';
import { useConfiguration } from '../contexts/ConfigurationContext';
import CharacterChart from '../src/components/Charts';
import Head from 'next/head';
import ProfileAccount from '../src/components/Profile';

export default function HomePage() {
  const { soundAllowed, setSoundAllowed } = useSoundAllowed();
  const { configuration, setConfiguration } = useConfiguration();

  const [loading, setLoading] = useState(true);

  const [messagesRoom, setMessagesRoom] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  // Character

  const [openCharacterCustomization, setOpenCharacterCustomization] =
    useState(false);

  const [openConfiguration, setOpenConfiguration] = useState(false);

  // Character

  const [roomActive, setRoomActive] = useState(null);
  const [usersRoom, setUsersRoom] = useState([]);
  const [characters, setCharacters] = useState([]);

  const [openServerFind, setOpenServerFind] = useState(false);
  const [openCreateMatch, setOpenCreateMatch] = useState(false);
  const [openAcceptSound, setOpenAcceptSound] = useState(true);

  const [bgLobby, setBgLobby] = useState(3);

  const { socket, setSocket } = useSocket();
  const { messages, setMessages } = useMessage();

  const [lobby, setLobby] = useState([]);
  const [invite, setInvite] = useState(null);
  const [friends, setFriends] = useState([]);

  const socketInitializer = async () => {
    var sk = socket;

    if (!sk) {
      sk = io('ws://localhost:3001', {
        transports: ['websocket'],
      });

      setSocket(sk);

      sk.on('connect', () => {
        setLoading(false);

        sk.emit('join_pre_room');
      });
    }

    console.log(sk);

    if (sk) setLoading(false);

    const roomUsersHandler = (data) => {
      setUsersRoom(data.users);
    };

    const roomUsersTesteHandler = (data) => {
      alert(data.message);
    };

    const receivedMessageHandler = (data) => {
      setMessagesRoom((prevState) => [
        ...prevState,
        { id: data.id, message: data.message },
      ]);
    };

    // Add event listeners

    sk.on('room_users', roomUsersHandler);
    sk.on('room_users_teste', roomUsersTesteHandler);
    sk.on('received_message', receivedMessageHandler);
    sk.on('update_lobby', (players) => {
      setLobby(players);
    });
    sk.emit('request_users');

    sk.on('result_friends', (data) => {
      setFriends(data);
    });

    sk.on('receive_invite', ({ lobbyId, idHOST }) => {
      setInvite({ lobbyId, idHOST });
    });

    return () => {
      // To remove listeners when they are no longer needed
      sk.off('result_friends', () => {
        setFriends([]);
      });
      sk.off('room_users', roomUsersHandler);
      sk.off('room_users_teste', roomUsersTesteHandler);
      sk.off('received_message', receivedMessageHandler);
      sk.off('update_lobby');
      sk.off('receive_invite');
    };
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ContentLobby bgLobby={bgLobby} configuration={configuration}>
      <Head>
        <title>SL | Home Page</title>
      </Head>
      <MenuLobby setBgLobby={setBgLobby} soundAllowed={soundAllowed} />
      <div className="absolute z-40 bg-red-500">{JSON.stringify(lobby)}</div>
      <MiddleLobby
        actions={{
          setOpenServerFind,
          setOpenCreateMatch,
          setOpenCharacterCustomization,
          setOpenConfiguration,
        }}
        permissions={{ soundAllowed }}
        configuration={configuration}
        socket={socket}
        friends={friends}
        lobby={lobby}
      />
      <>
        {console.log(invite)}
        {openServerFind && (
          <ListServer
            actions={{ setOpenServerFind }}
            soundAllowed={soundAllowed}
            roomsList={{ roomActive, setRoomActive }}
            socket={socket}
          />
        )}
        {openCreateMatch && (
          <LobbyCreateMatch
            actions={{ setOpenCreateMatch }}
            soundAllowed={soundAllowed}
            roomsList={{
              roomActive,
              setRoomActive,
              usersRoom,
              setUsersRoom,
            }}
          />
        )}
        {soundAllowed === 'not-allowed' && openAcceptSound && (
          <CustomDialog
            title="Deseja melhorar a experiencia?"
            close={setOpenAcceptSound}
            buttonClose={false}
            size="sm">
            <CustomTitles
              tag="p"
              size={14}
              pos="center"
              text="Aceite a permissão de executarmos sons, para melhorar a sua experiencia e vivencia-la 100% enquanto joga."
              customClass="font-KanitRegular"
            />
            <section className="flex items-center justify-center gap-2">
              <CustomButton
                title="Recusar"
                color="danger"
                outline={true}
                action={{
                  onClick: () => {
                    setSoundAllowed('not-allowed');
                    setOpenAcceptSound(false);
                  },
                }}
              />
              <CustomButton
                title="Aceitar"
                color="primary"
                action={{
                  onClick: () => {
                    setSoundAllowed('allowed');
                    setOpenAcceptSound(false);
                  },
                }}
              />
            </section>
          </CustomDialog>
        )}
        {openCharacterCustomization && (
          <CharacterCustomization
            actions={{ setOpenCharacterCustomization }}
            soundAllowed={soundAllowed}
          />
        )}
        {openConfiguration && (
          <Configurations
            actions={{ setOpenConfiguration }}
            soundAllowed={soundAllowed}
            configurationObj={{ configuration, setConfiguration }}
          />
        )}
        {/* <ProfileAccount /> */}
      </>
      <FooterLobby />
    </ContentLobby>
  );
}

// import React, { useRef, useState, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

// function Character3D() {
//   const meshRef = useRef();
//   const [position, setPosition] = useState([0, 0, 0]);

//   // Função que move o personagem com base nas teclas pressionadas
//   const handleKeyDown = (e) => {
//     const [x, y, z] = position;
//     switch (e.key) {
//       case 'ArrowUp':
//         setPosition([x, y + 0.1y, z]); // Move para frente no eixo Z
//         break;
//       case 'ArrowDown':
//         setPosition([x, y - 0.1, z]); // Move para trás no eixo Z
//         break;
//       case 'ArrowLeft':
//         setPosition([x - 0.1, y, z]); // Move para a esquerda no eixo X
//         break;
//       case 'ArrowRight':
//         setPosition([x + 0.1, y, z]); // Move para a direita no eixo X
//         break;
//       default:
//         break;
//     }
//   };

//   // Adiciona o evento de escuta de teclas quando o componente é montado
//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [position]);

//   // Rotaciona o personagem de forma contínua (opcional)
//   // useFrame(() => {
//   //   if (meshRef.current) {
//   //     meshRef.current.rotation.y += 0.01;
//   //   }
//   // });

//   return (
//     <Canvas style={{ height: '100vh', background: '#1e1e1e' }}>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />

//       {/* Personagem com movimento nas setas */}
//       <mesh ref={meshRef} position={position}>
//         <sphereGeometry args={[1, 32, 32]} />
//         <meshStandardMaterial color="hotpink" />
//       </mesh>

//       {/* Controles de órbita */}
//       <OrbitControls />
//     </Canvas>
//   );
// }

// export default Character3D;
