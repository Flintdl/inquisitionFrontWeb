import Image from 'next/image';
import image04 from '../../public/images/match_backgrounds/background_match_option_01.png';
import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import { io } from 'socket.io-client';
import Loading from '../../src/components/_Global/Loading';
import { useSoundAllowed } from '../../contexts/SoundContext';
import { AnimatePresence, motion } from 'framer-motion';

// eslint-disable-next-line no-unused-vars
import character01 from '../../public/images/characters/character_mermaid.png';
import character02 from '../../public/images/characters/character_vampire.png';
import character03 from '../../public/images/characters/character_villager.png';
import character04 from '../../public/images/characters/character_witch.png';

import Head from 'next/head';
import { useRouter } from 'next/router';
import MatchLeftMenu from '../../src/components/GamePage/MatchLeftMenu';
import MatchVotingMenu from '../../src/components/GamePage/MatchVotingMenu';
import MatchUsersMapView from '../../src/components/GamePage/MatchUsersMapView';
import MatchInfoRounds from '../../src/components/GamePage/MatchInfoRounds';

function MatchFastGame({ id }) {
  const { socket, setSocket } = useSocket();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [openInfoMenu, setOpenInfoMenu] = useState(false);

  const [roomInfo, setRoomInfo] = useState({});
  const [positions, setPositions] = useState([]);
  // const [users, setUsers] = useState([]);

  const { soundAllowed } = useSoundAllowed();

  const [hiddenVoting, setHiddenVoting] = useState(false);

  const [transitionDay, setTransitionDay] = useState(0);
  const [youTurn, setYouTurn] = useState(false);
  const [turnInfo, setTurnInfo] = useState({
    currentPlayer: 'Nobody',
    countdown: 5,
    isDay: true,
  });

  // eslint-disable-next-line no-unused-vars
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

  const attachEventListeners = () => {
    if (socket) {
      socket.on('room_users', handleRoomUsers);
      socket.on('game_started', handleGameStarted);
      socket.on('insufficient_players', handleInsufficientPlayers);
      socket.on('your_turn', handleYourTurn);
      socket.on('turn_info', handleTurnInfo);
      socket.on('turn_over', handleTurnOver);

      socket.on('transition_day', handleTransitionDay);
      socket.on('turn_info_day', handleTurnInfoDay);
      socket.on('day_turn_over', handleDayTurnOver);
      socket.on('night_over', handleNightOver);

      socket.on('room_invalid', handleRoomInvalid);
      socket.on('success_leave_room', handleSuccessLeaveRoom);

      socket.emit('join_room_me', id);
      socket.emit('join_room', id);

      setLoading(false);
    } else {
      socketInitializer();
    }
  };

  const handleBeforeUnload = () => {
    if (socket) {
      socket.emit('leave_room', {
        roomName: roomInfo.roomID,
        user: socket.id,
      });

      const eventsToDetach = [
        'room_users',
        'initial_positions',
        'game_started',
        'insufficient_players',
        'your_turn',
        'turn_info',
        'turn_over',
        'transition_day',
        'turn_info_day',
        'day_turn_over',
        'night_over',
        'room_invalid',
        'success_leave_room',
      ];

      eventsToDetach.forEach((event) => {
        socket.off(event);
      });
    }
  };

  useEffect(() => {
    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);

    attachEventListeners();

    // Remove event listeners and clean up
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, id, setTurnInfo]);

  const handleRoomUsers = (data) => {
    console.log(data);
    setRoomInfo(data.existingRoom);
    // setUsers(data.existingRoom.users);
    setPositions(data.existingRoom.positions);
  };

  const handleGameStarted = () => {
    setRoomInfo((prevState) => {
      return { ...prevState, startGame: true };
    });
  };

  const handleInsufficientPlayers = (size) => {
    console.log(size);
    alert(`Jogadores insuficientes: ${size?.size} de 3`);
  };

  const handleYourTurn = () => {
    // playTimeSound();
    setYouTurn(true);
  };

  const handleTurnInfo = (data) => {
    setTurnInfo((prevState) => ({
      ...prevState,
      currentPlayer: data.currentPlayer,
      countdown: data.countdown,
    }));
  };

  const handleTurnOver = () => {
    setYouTurn(false);
  };

  const handleTransitionDay = (data) => {
    setTransitionDay(data.countdown);
  };

  const handleTurnInfoDay = (data) => {
    console.log(data);
    setTurnInfo((prevState) => ({
      ...prevState,
      countdown: data.countdown,
      isDay: data.isDay,
    }));
  };

  const handleDayTurnOver = (data) => {
    console.log('acabou o dia');
    console.log(data);
    setTurnInfo((prevState) => ({
      ...prevState,
      isDay: data,
    }));
  };

  const handleNightOver = (data) => {
    console.log('acabou a noite');
    console.log(data);
    setTurnInfo((prevState) => ({
      ...prevState,
      isDay: data,
    }));
  };

  const handleRoomInvalid = () => {
    router.push('/home');
  };

  const handleSuccessLeaveRoom = (permission) => {
    console.log(permission);
    if (permission) {
      console.log('perm');
      console.log(router);
      router.push('/home');
    }
  };

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
          <div className="relative flex h-full w-full flex-col overflow-hidden p-4 font-Kanit text-white">
            <Image
              src={image04}
              alt="bgLobbyMatch"
              fill={true}
              quality={100}
              priority={true}
              className="block h-auto w-full select-none !object-cover"
            />
            <motion.div
              animate={
                turnInfo.isDay
                  ? { backgroundColor: 'rgba(0, 0, 0, 0)' }
                  : { backgroundColor: 'rgba(0,0,0,0.7)' }
              }
              transition={{ duration: 10 }}
              className={`absolute left-0 top-0 h-full w-full`}></motion.div>

            <MatchInfoRounds
              props={{ socket, youTurn, roomInfo, turnInfo, transitionDay }}
              actions={{ startGame, openInfoMenu, setOpenInfoMenu }}
            />
            <MatchUsersMapView
              props={{ socket, roomInfo, characters, positions }}
              person={{ character03 }}
            />
          </div>
          <AnimatePresence>
            {youTurn && (
              <MatchVotingMenu
                props={{ roomInfo, characters, hiddenVoting, setHiddenVoting }}
              />
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

export const getServerSideProps = (context) => {
  const { id } = context.params;

  return { props: { id } };
};

export default MatchFastGame;
