import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import MainCharacter from '../../Character/Main';

import characterTest from '../../../../public/images/characters/default_character.png';
import hatSkin01 from '../../../../public/images/characters_skins/hat_skin_01.png';
import hairSkin03 from '../../../../public/images/characters_skins/hair/hair_skin_03.png';
import eyeSkin02 from '../../../../public/images/characters_skins/eye_skin_02.png';
import mouthSkin05 from '../../../../public/images/characters_skins/mouth/mouth_skin_05.png';
import glassesSkin04 from '../../../../public/images/characters_skins/glasess/glasess_skin_04.png';

import floorLobbyCharacter01 from '../../../../public/images/characters/floor_character_01.png';
import Image from 'next/image';

function MiddleLobby({
  actions,
  permissions,
  configuration,
  socket,
  friends,
  lobby,
}) {
  const {
    setOpenServerFind,
    setOpenCreateMatch,
    setOpenCharacterCustomization,
    setOpenConfiguration,
  } = actions;
  const { soundAllowed } = permissions;

  const router = useRouter();

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotatingLeft, setIsRotatingLeft] = useState(false);
  const [isRotatingRight, setIsRotatingRight] = useState(false);
  const characterRef = useRef(null);

  const [playerName, setPlayerName] = useState('');
  const [randomFriend, setRandomFriend] = useState(null);

  const joinLobby = () => {
    socket.emit('join_lobby', { lobbyId, player: playerName });
  };

  const invitePlayer = (playerId) => {
    socket.emit('invite_player', {
      lobbyId: lobby.roomID,
      invitedPlayerId: playerId,
    });
  };

  const acceptInvite = () => {
    if (invite) {
      socket.emit('accept_invite', { lobbyId: invite, player: playerName });
    }
  };

  const [character, setCharacter] = useState({
    name: 'Flintovsk',
    person: characterTest,
    skins: {
      hat: null,
      hair: hairSkin03,
      clothes: null,
      pants: null,
      body: null,
      wings: null,
      eye: eyeSkin02,
      mouth: mouthSkin05,
      glasses: glassesSkin04,
      gloves: null,
      weapon: null,
      boots: null,
    },
  });

  useEffect(() => {
    if (friends.length > 0) {
      const randomIndex = Math.floor(Math.random() * friends.length);
      setRandomFriend(friends[randomIndex]);
    }
  }, [friends]);

  useEffect(() => {
    let animationFrameId;

    const handleRotate = () => {
      if (isRotatingLeft) {
        setRotationAngle((prevAngle) => prevAngle - 2);
      }
      if (isRotatingRight) {
        setRotationAngle((prevAngle) => prevAngle + 2);
      }

      animationFrameId = requestAnimationFrame(handleRotate);
    };

    if (isRotatingLeft || isRotatingRight) {
      handleRotate();
    } else {
      cancelAnimationFrame(animationFrameId);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRotatingLeft, isRotatingRight]);

  const playMenuSound = () => {
    const audio = new Audio('/sounds/menu-selection.mp3');
    if (soundAllowed === 'allowed') audio.play();
  };

  const clickMenuSound = () => {
    const audio = new Audio('/sounds/click-menu.mp3');
    if (soundAllowed === 'allowed') audio.play();
  };

  const list_menu = [
    {
      name: 'INICIAR PARTIDA',
      action: {
        onClick: () => {
          clickMenuSound();
          setOpenCreateMatch(true);
        },
      },
      emphasis: true,
    },
    {
      name: 'Servidores',
      action: {
        onClick: () => {
          clickMenuSound();
          setOpenServerFind(true);
        },
      },
      emphasis: false,
    },
    // {
    //   name: 'Configurações',
    //   action: {
    //     onClick: () => {
    //       setOpenConfiguration(true);
    //       clickMenuSound();
    //     },
    //   },
    //   emphasis: false,
    // },
    {
      name: 'Customizar',
      action: {
        onClick: () => {
          clickMenuSound();
        },
      },
      emphasis: false,
    },
    {
      name: 'Funções',
      action: {
        onClick: () => {
          setOpenCharacterCustomization(true);
          clickMenuSound();
        },
      },
      emphasis: false,
    },
    {
      name: 'Sair',
      action: {
        onClick: () => {
          clickMenuSound();
          router.push('/');
        },
      },
      emphasis: false,
    },
  ];

  const handleMouseMove = (e, setBackground) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBackground(
      `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.3), transparent)`,
    );
  };

  const handleMouseLeave = (setBackground) => {
    setBackground('');
  };

  return (
    <section className="flex h-full w-full justify-center py-20">
      <div className="absolute bottom-14 right-14 flex flex-col rounded-2xl border border-gray-700 bg-gradient-to-r from-gray-500/30 to-gray-600/40 p-4 backdrop-blur-lg">
        <ul className="flex flex-col gap-3 font-Scrubland text-3xl">
          {list_menu.map(({ name, action, emphasis }, i) => {
            const [background, setBackground] = useState('');
            return (
              <li
                key={i}
                onMouseEnter={() => playMenuSound()}
                onMouseMove={(e) => handleMouseMove(e, setBackground)}
                onMouseLeave={() => handleMouseLeave(setBackground)}
                {...action}
                className={`group relative flex cursor-pointer justify-center gap-1 rounded-lg border-2 border-gray-600 bg-gray-800/30 px-4 py-2 transition-all hover:bg-gray-800/60 ${
                  emphasis
                    ? 'text-amber-500 hover:text-amber-300'
                    : 'text-white/70 hover:text-amber-300'
                }`}>
                <span
                  className="absolute inset-0 -z-10 rounded-lg"
                  style={{ background }}></span>
                {name}
              </li>
            );
          })}
        </ul>
      </div>
      <section className="flex w-full justify-center">
        <div className="group relative mt-24 flex h-full w-full max-w-[350px] scale-75 select-none items-end justify-center">
          {randomFriend && (
            <div className="absolute left-1/2 top-1/2 z-10 flex w-44 -translate-x-1/2 -translate-y-12 flex-col items-center justify-center rounded-2xl border border-gray-600/60 bg-white/30 p-4 shadow-md">
              <p className="font-KanitBold text-2xl text-black/80">
                {randomFriend.id}
              </p>
              <p className="font-KanitBold text-lg text-amber-300">
                ESTÁ ONLINE
              </p>
              <span
                onClick={() => invitePlayer(randomFriend.id)}
                className="mt-2 block w-full cursor-pointer rounded-xl border-2 border-amber-500 bg-amber-400 px-3 py-4 text-center font-KanitBold text-xl leading-3 text-black shadow-md hover:opacity-80">
                CONVIDAR
              </span>
              <div className="absolute -bottom-2 flex justify-center">
                <div className="h-0 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/30 shadow-md"></div>
              </div>
            </div>
          )}
          <div className="absolute top-0 h-full w-[80%] bg-gradient-to-b from-cyan-500/70 via-cyan-500/70 to-cyan-500/20 opacity-0 blur-xl transition-all group-hover:opacity-80"></div>
          <div className="absolute -bottom-[90px] left-0 -z-10 overflow-hidden">
            <Image
              src={floorLobbyCharacter01}
              title="Character Test"
              alt="Character Test"
              className="block h-auto w-fit select-none !object-contain "
            />
          </div>
        </div>

        <MainCharacter configuration={configuration} character={character} />
        <div className="group relative mt-24 flex h-full w-full max-w-[350px] scale-75 select-none items-end justify-center">
          <div className="absolute left-1/2 top-1/2 z-10 flex w-44 -translate-x-1/2 -translate-y-12 flex-col items-center justify-center rounded-2xl border border-gray-600/60 bg-white/30 p-4 shadow-md">
            <p className="font-KanitBold text-2xl text-black/80">Fortrek</p>
            <p className="font-KanitBold text-lg text-amber-300">ESTÁ ONLINE</p>
            <span
              onClick={() => invitePlayer(friends[2].id)}
              className="mt-2 block w-full cursor-pointer rounded-xl border-2 border-amber-500 bg-amber-400 px-3 py-4 text-center font-KanitBold text-xl leading-3 text-black shadow-md hover:opacity-80">
              CONVIDAR
            </span>
            <div className="absolute -bottom-2 flex justify-center">
              <div className="h-0 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/30 shadow-md"></div>
            </div>
          </div>
          <div className="absolute top-0 h-full w-[80%] bg-gradient-to-b from-cyan-500/70 via-cyan-500/70 to-cyan-500/20 opacity-0 blur-xl transition-all group-hover:opacity-80"></div>
          <div className="absolute -bottom-[90px] left-0 -z-10 overflow-hidden">
            <Image
              src={floorLobbyCharacter01}
              title="Character Test"
              alt="Character Test"
              className="block h-auto w-fit select-none !object-contain "
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default MiddleLobby;
