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
import { Check, CheckCircle } from '@phosphor-icons/react';
import CustomButton from '../../src/components/_Global/Commons/Buttons';

function MatchFastGame({ id }) {
  const { socket, setSocket } = useSocket();
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState([]);
  const [users, setUsers] = useState([]);

  const { soundAllowed } = useSoundAllowed();

  const [themeMusicLobby, setThemeMusicLobby] = useState(null);
  const [themeMusicLobbyPaused, setThemeMusicLobbyPaused] = useState(true);
  const [themeActually, setThemeActually] = useState('');

  const [audioClock, setAudioClock] = useState(
    '/sounds/clock-ticking-time.mp3',
  );
  const [audioTurn, setAudioTurn] = useState('/sounds/you_turn.mp3');

  const [youTurn, setYouTurn] = useState(false);
  const [turnInfo, setTurnInfo] = useState({
    currentPlayer: 'Nobody',
    countdown: 5,
  });

  const playTimeSound = () => {
    if (soundAllowed && soundAllowed === 'allowed') {
      if (!audioClock.paused) {
        // Se o áudio estiver em execução, pause
        audioClock.pause();
      } else {
        // Se não estiver em execução, execute
        audioTurn.play();
        audioTurn.volume = 0.8;
        audioClock.play();
        audioClock.volume = 0.1;
      }
    }
  };

  const socketInitializer = async () => {
    if (!socket) {
      await fetch('/api');
      let sk = io('ws://localhost:3001', {
        transports: ['websocket'],
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
        socket.emit('leave_room', id);
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);

    if (socket) {
      const handleRoomUsers = (data) => {
        setUsers(data.users);
      };

      const handleInitialPositions = (data) => {
        setPositions(data.positions);
      };

      const handleGameStarted = () => {
        console.log('start');
      };

      const handleInsufficientPlayers = () => {
        console.log('insufficient_players');
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
        playTimeSound();
        setYouTurn(false);
      };

      // Add Socket.IO event listeners
      socket.on('room_users', handleRoomUsers);
      socket.on('initial_positions', handleInitialPositions);
      socket.on('game_started', handleGameStarted);
      socket.on('insufficient_players', handleInsufficientPlayers);
      socket.on('your_turn', handleYourTurn);
      socket.on('turn_info', handleTurnInfo);
      socket.on('turn_over', handleTurnOver);

      // Emit Socket.IO events
      socket.emit('join_room', id);
      setLoading(false);
      socket.emit('start_game', id);
    } else {
      socketInitializer();
    }

    // Remove event listeners and clean up
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);

      handleBeforeUnload();

      // Remove Socket.IO event listeners
      if (socket) {
        socket.off('room_users');
        socket.off('initial_positions');
        socket.off('game_started');
        socket.off('insufficient_players');
        socket.off('your_turn');
        socket.off('turn_info');
        socket.off('turn_over');
      }
    };
  }, [socket, id]);

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
        {/* <MatchLeftMenu
                props={{
                  socket,
                  setRoomActive,
                  roomActive,
                  usersRoom,
                  messageInput,
                  setMessageInput,
                  sendMessage,
                  messagesRoom,
                }}
              /> */}
        <section className="relative flex h-full w-full gap-4 overflow-hidden">
          <div className="absolute left-4 top-2 z-20 mt-2 flex items-center gap-4 rounded-full p-2 text-white">
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
          </div>
          <div className="relative flex h-full w-full flex-col overflow-hidden p-4 font-Kanit text-white">
            <Image
              src={image04}
              alt="bgLobbyMatch"
              fill={true}
              priority={true}
              className="block h-auto w-full select-none !object-cover brightness-90"
            />
            <p className="absolute left-[50%] top-12 w-44 -translate-x-[50%] rounded-lg border-2 border-white/20 p-4 text-center font-AntonRegular text-xl uppercase italic backdrop-blur-md">
              {youTurn ? 'Sua vez de votar' : 'Espere a sua vez'}
            </p>
            <p className="absolute left-[50%] top-32 -translate-x-[50%] rounded-lg bg-purple-500 p-4 font-AntonRegular text-xl uppercase">
              {turnInfo.countdown}
            </p>
            <ul
              style={{
                position: 'relative',
                width: '880px',
                height: '300px',
              }}
              className="relative z-10 mx-auto mb-20 mt-auto flex h-full max-w-[90%] items-end justify-center">
              {users.map(({ id }, i) => {
                const characterIndex = i % characters.length;
                const character = characters[characterIndex];
                const position = positions[i]; // Use a posição correspondente

                return (
                  <li
                    key={i}
                    style={position}
                    className={`relative flex h-[250px] w-[200px] flex-col items-center justify-center gap-1 p-1`}>
                    <span className="absolute -top-8 whitespace-nowrap rounded-lg bg-black/40 px-2 py-1 font-AntonRegular uppercase text-gray-300">
                      {id}
                      {id === socket.id && (
                        <span className="text-purple-500"> (você)</span>
                      )}
                    </span>
                    <div
                      className={`relative h-full w-full drop-shadow-[16px_-16px_4px_rgba(0,0,0,.5)] `}>
                      <span
                        className={`h-full w-full ${
                          id === socket.id
                            ? 'drop-shadow-[0_0px_2px_rgba(255,255,255,1)]'
                            : 'drop-shadow-[0_0px_2px_rgba(0,0,0,1)]'
                        }`}>
                        <Image
                          src={character.image}
                          alt={`Character ${i + 1}`}
                          width={400}
                          height={300}
                          priority={true}
                          quality={100}
                          className="left-0 top-0 block h-auto w-fit select-none brightness-90"
                        />
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
  const {
    socket,
    setRoomActive,
    roomActive,
    usersRoom,
    messageInput,
    setMessageInput,
    sendMessage,
    messagesRoom,
  } = props;
  return (
    <aside className="col-span-3 flex h-full flex-col gap-4">
      <nav className="flex w-full items-center justify-between gap-2 rounded-md bg-slate-800 p-2">
        <div
          className="flex w-fit cursor-pointer items-center gap-1 transition-all hover:gap-2"
          onClick={() => {
            socket.emit('leave_room', roomActive);
            setRoomActive(null);
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
        <div
          className="flex w-fit cursor-pointer items-center gap-1 transition-all hover:gap-2"
          onClick={() => {
            socket.emit('teste_sala', roomActive);
          }}>
          <CustomTitles
            tag="h5"
            size={14}
            pos="left"
            text="Sinal to na sala"
            customClass="!text-red-500"
          />
        </div>
      </nav>
      <ul className="grid grid-cols-12 gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          return (
            <li
              key={i}
              className="col-span-2 flex flex-col items-center justify-center gap-1 rounded-md border-2 border-slate-500/50 bg-slate-800/50 p-1 text-green-500">
              {i !== 11 && i !== 9 && <Cat size={24} weight="fill" />}

              <p className="font-KanitRegular text-sm text-gray-300">
                {i !== 11 && i !== 9 ? 'Vampiro' : '?'}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="flex h-full gap-2">
        {/* <CustomTitles
          tag="h5"
          size={14}
          pos="left"
          text="Usuários na sala"
          customClass="!text-green-500"
        /> */}
        {/* <ul className="flex max-h-[150px] min-h-[150px] flex-col">
          {usersRoom?.map(({ id }) => {
            return (
              <li key={id}>
                <CustomTitles
                  tag="p"
                  size={14}
                  pos="left"
                  text={`ID: ${id}`}
                  customClass="!text-white font-KanitRegular"
                />
              </li>
            );
          })}
        </ul> */}

        <div className="relative flex h-full w-full flex-col gap-4 rounded-md bg-slate-800 p-2">
          <ul className="absolute flex h-[calc(100%-84px)] w-[calc(100%-16px)] flex-col overflow-auto rounded-md bg-slate-900 p-2 font-Kanit text-white scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-500">
            {messagesRoom?.map(({ id, message }, i) => {
              return (
                <li key={i} className="flex flex-col">
                  <p className="font-KanitBold text-purple-500">{id} (mudo)</p>
                  <p>{message}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex gap-2 rounded-md bg-slate-600 p-2">
            <input
              value={messageInput}
              placeholder="Digite a sua mensagem"
              className="w-full rounded-md border-2 border-cyan-500 px-2 font-KanitBold text-cyan-500"
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <CustomButton
              title="Enviar"
              color="primary"
              action={{
                onClick: () => {
                  sendMessage();
                },
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export const getServerSideProps = (context) => {
  const { id } = context.params;

  return { props: { id } };
};

export default MatchFastGame;
