import Image from 'next/image';
import image04 from '../../public/images/match_backgrounds/background_match_option_01.png';
import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import { io } from 'socket.io-client';
import Loading from '../../src/components/_Global/Loading';
import LobbyThemeMusic from '../../src/components/Lobby/Sound/theme';
import { useSoundAllowed } from '../../contexts/SoundContext';
import { AnimatePresence, motion } from 'framer-motion';

import character01 from '../../public/images/characters/character_mermaid.png';
import character02 from '../../public/images/characters/character_vampire.png';
import character03 from '../../public/images/characters/character_villager.png';
import character04 from '../../public/images/characters/character_witch.png';
import {
  ArrowFatLeft,
  Cat,
  Check,
  CheckCircle,
  List,
} from '@phosphor-icons/react';
import CustomButton from '../../src/components/_Global/Commons/Buttons';
import CustomTitles from '../../src/components/_Global/Commons/Titles';
import Head from 'next/head';
import { useRouter } from 'next/router';

function MatchFastGame({ id }) {
  const { socket, setSocket } = useSocket();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [openInfoMenu, setOpenInfoMenu] = useState(false);

  const [roomInfo, setRoomInfo] = useState({});
  const [positions, setPositions] = useState([]);
  const [users, setUsers] = useState([]);

  const { soundAllowed } = useSoundAllowed();

  const [themeMusicLobby, setThemeMusicLobby] = useState(null);
  const [themeMusicLobbyPaused, setThemeMusicLobbyPaused] = useState(true);
  const [themeActually, setThemeActually] = useState('');

  const [youTurn, setYouTurn] = useState(false);
  const [turnInfo, setTurnInfo] = useState({
    currentPlayer: 'Nobody',
    countdown: 5,
  });

  const playTimeSound = () => {
    if (soundAllowed && soundAllowed === 'allowed') {
      const clock = new Audio('/sounds/clock-ticking-time.mp3');
      const turn = new Audio('/sounds/you_turn.mp3');
      // Se não estiver em execução, execute
      turn.play();
      turn.volume = 0.8;
      clock.play();
      clock.volume = 0.1;

      setTimeout(() => {
        turn.pause();
        clock.pause();
      }, 6000);
    }
  };

  const socketInitializer = async () => {
    if (!socket) {
      let sk = io('ws://localhost:3001', {
        transports: ['websocket'],
      });

      sk.on('connect_error', (error) => {
        console.error('Error connecting to the server:', error);
      });

      setSocket(sk);

      sk.on('connect', () => {
        setLoading(false);
      });

      sk.on('room_users', (data) => {
        console.log(data.users);
      });
      sk.emit('join_room', id);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket) {
        socket.emit('leave_room', {
          roomName: roomInfo.roomID,
          user: socket.id,
        });
        socket.off('room_users');
        socket.off('initial_positions');
        socket.off('game_started');
        socket.off('insufficient_players');
        socket.off('your_turn');
        socket.off('turn_info');
        socket.off('turn_over');
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);

    if (socket) {
      const handleRoomUsers = (data) => {
        console.log(data);
        setRoomInfo(data.existingRoom);
        setUsers(data.existingRoom.users);
        setPositions(data.existingRoom.positions);
      };

      const handleGameStarted = () => {
        setRoomInfo((prevState) => {
          return { ...prevState, startGame: true };
        });
      };

      const handleInsufficientPlayers = (size) => {
        console.log(size);
        alert(`Jogadores insuficientes: ${size.size} de 3`);
      };

      const handleYourTurn = () => {
        playTimeSound();
        setYouTurn(true);
      };

      const handleTurnInfo = (data) => {
        setTurnInfo({
          currentPlayer: data.currentPlayer,
          countdown: data.countdown,
        });
      };

      const handleTurnOver = () => {
        setYouTurn(false);
      };

      // Add Socket.IO event listeners
      socket.on('room_users', handleRoomUsers);

      socket.on('game_started', handleGameStarted);
      socket.on('insufficient_players', handleInsufficientPlayers);

      socket.on('your_turn', handleYourTurn);
      socket.on('turn_info', handleTurnInfo);
      socket.on('turn_over', handleTurnOver);

      // Exit room

      socket.on('success_leave_room', (permission) => {
        console.log(permission);
        if (permission) {
          console.log('perm');
          console.log(router);
          router.push('/home');
        }
      });

      // Exit room

      // Emit Socket.IO events
      socket.emit('join_room_me', id);
      socket.emit('join_room', id);
      setLoading(false);
    } else {
      socketInitializer();
    }

    // Remove event listeners and clean up
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [socket, id]);

  const startGame = () => {
    socket.emit('start_game', id);
  };

  const characters = [
    // { image: character01 },
    { image: character02, name: 'Vampiro' },
    { image: character03, name: 'Aldeão' },
    { image: character04, name: 'Bruxa' },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <MatchContent>
        <Head>
          <title>SL | Match</title>
        </Head>
        <AnimatePresence>
          {openInfoMenu && (
            <MatchLeftMenu
              props={{
                socket,
                roomInfo,
                openInfoMenu,
                setOpenInfoMenu,
              }}
            />
          )}
        </AnimatePresence>
        <section className="relative flex h-full w-full select-none gap-4 overflow-hidden">
          {/* <div className="absolute left-4 top-2 z-20 mt-2 flex items-center gap-4 rounded-full p-2 text-white">
            <div className="flex items-center gap-2 rounded-md border border-amber-700/30 bg-amber-900/30 py-1 pl-1 pr-2 text-cyan-200 hover:opacity-70">
              <LobbyThemeMusic
                props={{
                  soundAllowed,
                  themeMusicLobby,
                  setThemeMusicLobby,
                  themeActually,
                  setThemeActually,
                  setThemeMusicLobbyPaused,
                  themeMusicLobbyPaused,
                  urls: [
                    { name: 'Adventure', url: '/sounds/themes/Adventure.mp3' },
                    { name: 'Chase', url: '/sounds/themes/Chase.mp3' },
                    {
                      name: 'ForestWalk',
                      url: '/sounds/themes/ForestWalk.mp3',
                    },
                    { name: 'The Epic', url: '/sounds/themes/The_Epic.mp3' },
                  ],
                }}
              />
            </div>
          </div> */}
          <div className="relative flex h-full w-full flex-col overflow-hidden p-4 font-Kanit text-white">
            <Image
              src={image04}
              alt="bgLobbyMatch"
              fill={true}
              quality={100}
              priority={true}
              className="block h-auto w-full select-none !object-cover"
            />
            <div className="absolute left-0 top-0 h-full w-full"></div>

            <div className="absolute left-6 top-12 flex gap-4">
              <p
                onClick={() => setOpenInfoMenu(!openInfoMenu)}
                className="text-md w-fit cursor-pointer rounded-lg border-2 border-white/20 p-2 text-center font-AntonRegular backdrop-blur-md hover:opacity-70">
                <List size={24} weight="bold" />
              </p>
              <p className="flex items-center rounded-lg border-2 border-white/20 p-2 text-center font-AntonRegular text-sm uppercase italic backdrop-blur-md">
                HOST: {roomInfo.hostID}
              </p>
            </div>
            <div className="absolute left-[50%] top-12 flex -translate-x-[50%] flex-col items-center gap-6">
              <p className="text-md w-44 rounded-lg border-2 border-white/20 p-4 text-center font-AntonRegular uppercase italic backdrop-blur-md">
                {roomInfo.startGame
                  ? youTurn
                    ? 'Sua vez de votar'
                    : 'Espere a sua vez'
                  : 'Esperando o Host'}
              </p>
              {roomInfo.startGame && (
                <p className="rounded-lg bg-purple-500 p-4 font-AntonRegular text-xl uppercase">
                  {turnInfo.countdown}
                </p>
              )}
              {!roomInfo.startGame && roomInfo.hostID === socket.id && (
                <CustomButton
                  title="INICIAR O JOGO"
                  color="danger"
                  action={{ onClick: () => startGame() }}
                />
              )}
            </div>
            <ul
              style={{
                position: 'relative',
                width: '1100px',
                height: '300px',
              }}
              className="relative z-10 mx-auto mb-20 mt-auto flex h-full max-w-[90%] items-end justify-center">
              {Array.from({ length: roomInfo.maxUsers }).map((_, i) => {
                const user = roomInfo.users[i]; // Obtenha o usuário correspondente (se existir)
                const characterIndex = i % characters.length;
                const character = characters[characterIndex];
                const position = positions[i]; // Use a posição correspondente

                return (
                  <li
                    key={i}
                    style={position}
                    className={`absolute flex h-[250px] w-[150px] flex-col items-center justify-center gap-1 p-1`}>
                    <div className="absolute -top-12 left-0 z-10 h-full w-full"></div>
                    <span className="absolute -top-8 whitespace-nowrap rounded-lg bg-black/40 px-2 py-1 font-AntonRegular uppercase text-gray-300">
                      {user && (
                        <>
                          {user.id}
                          {user.id === socket.id && (
                            <span className="text-purple-500"> (você)</span>
                          )}
                        </>
                      )}
                      {!user && 'Aguardando usuário'}
                    </span>
                    <div
                      className={`relative h-full w-full ${
                        user
                          ? 'drop-shadow-[16px_-16px_4px_rgba(0,0,0,.5)]'
                          : ''
                      }`}>
                      <span
                        className={`h-full w-full ${
                          user
                            ? user.id === socket.id
                              ? 'drop-shadow-[0_0px_2px_rgba(255,255,255,1)]'
                              : 'drop-shadow-[0_0px_2px_rgba(0,0,0,1)]'
                            : 'drop-shadow-[0_0px_2px_rgba(255,255,255,1)]'
                        }`}>
                        {user && (
                          <Image
                            src={
                              user.id === socket.id
                                ? character.image
                                : character03
                            }
                            alt={`Character ${i + 1}`}
                            width={300}
                            height={200}
                            quality={100}
                            className="left-0 top-0 block h-auto w-fit select-none brightness-90"
                          />
                        )}
                        {!user && (
                          // Renderize algo para indicar que o slot está vazio
                          <Image
                            src={character03}
                            alt={`Character ${i + 1}`}
                            width={300}
                            height={200}
                            quality={100}
                            className="bh-white left-0 top-0 block h-auto w-fit select-none brightness-0"
                          />
                        )}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <AnimatePresence>
            {youTurn && (
              <motion.aside
                initial={{ x: '110%' }}
                animate={{ x: '-24px' }}
                exit={{ x: '110%' }}
                className="absolute right-0 top-6 z-10 flex h-[calc(100%-48px)] w-[500px] flex-col gap-4 rounded-lg border-2 border-white/20 p-4 text-white backdrop-blur-md">
                <div className="flex flex-col rounded-lg bg-black/60 p-4">
                  <p className="text-center font-KanitBold text-lg uppercase">
                    Você é um{' '}
                    <span className="text-blue-600">
                      {'<'}NOME FUNÇÃO{'>'}
                    </span>
                  </p>
                </div>
                <ul className="grid grid-cols-6 gap-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <li
                      key={idx}
                      className={`relative col-span-3 flex h-48 justify-center overflow-hidden rounded-lg border-2 bg-black/50 p-4 ${
                        idx === 0 ? 'border-green-600' : 'border-gray-600'
                      }`}>
                      <p className="text-center font-KanitBold text-lg uppercase">
                        {idx === 0 && (
                          <CheckCircle
                            className="absolute -right-3 -top-3 text-green-600"
                            weight="fill"
                            size={32}
                          />
                        )}
                        USUÁRIO {idx}
                      </p>
                      <div className="absolute left-0 top-48 h-full w-full scale-[2.5]">
                        <Image
                          src={character02}
                          alt={`Character ${idx}`}
                          priority={true}
                          fill={true}
                          quality={100}
                          className="left-0 block h-auto w-fit select-none !object-contain brightness-90"
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex w-full justify-end">
                  <CustomButton title="CONFIRMAR VOTO" color="secondary" />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </section>
      </MatchContent>
    </>
  );
}

const MatchContent = ({ children }) => {
  return (
    <section className="flex h-full gap-4">
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </section>
  );
};

const MatchLeftMenu = ({ props }) => {
  const { socket, roomInfo, openInfoMenu, setOpenInfoMenu } = props;
  return (
    <motion.aside
      initial={{ x: '-130%' }}
      animate={{ x: '0px' }}
      exit={{ x: '-130%' }}
      className="fixed left-6 top-6 z-30 flex h-[calc(100%-48px)] w-[400px] flex-col gap-4 rounded-lg border-2 border-black/40 bg-black/40 p-4 text-white backdrop-blur-lg">
      <p
        onClick={() => setOpenInfoMenu(!openInfoMenu)}
        className="text-md absolute -right-16 top-0 w-fit cursor-pointer rounded-lg border-2 border-black/40 bg-black/40 p-2 text-center font-AntonRegular backdrop-blur-md hover:opacity-70">
        <List size={24} weight="bold" />
      </p>
      <nav className="flex w-full items-center justify-between gap-2 rounded-md bg-slate-800 p-2">
        <div
          className="flex w-fit cursor-pointer items-center gap-1 transition-all hover:gap-2"
          onClick={() => {
            socket.emit('leave_room', {
              roomName: roomInfo.roomID,
              user: socket.id,
            });
          }}>
          <ArrowFatLeft weight="duotone" size={24} className="text-cyan-500" />
          <CustomTitles
            tag="h5"
            size={14}
            pos="left"
            text="Sair da Sala"
            customClass="!text-cyan-500"
          />
        </div>
      </nav>
      <ul className="grid grid-cols-12 gap-2">
        {roomInfo?.users?.map(({ id }, i) => {
          return (
            <li
              key={i}
              className="col-span-12 flex flex-grow flex-col gap-1 rounded-md border-2 border-slate-500/50 bg-slate-800/50 p-1 text-green-500">
              <p className="font-KanitRegular text-sm text-gray-300">
                Usuário: {id}
              </p>
            </li>
          );
        })}
      </ul>
      {/* <Menu */}
    </motion.aside>
  );
};

export const getServerSideProps = (context) => {
  const { id } = context.params;

  return { props: { id } };
};

export default MatchFastGame;
