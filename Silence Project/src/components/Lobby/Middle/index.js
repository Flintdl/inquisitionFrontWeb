import Image from 'next/image';
import characterTest from '../../../../public/images/characters/character_villager.png';
import { useEffect, useRef, useState } from 'react';

function MiddleLobby({ actions, permissions }) {
  const {
    setOpenServerFind,
    setOpenCreateMatch,
    setOpenCharacterCustomization,
    setOpenConfiguration,
  } = actions;
  const { soundAllowed } = permissions;

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotatingLeft, setIsRotatingLeft] = useState(false);
  const [isRotatingRight, setIsRotatingRight] = useState(false);
  const characterRef = useRef(null);

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
      name: 'Jogar',
      action: {
        onClick: () => {
          clickMenuSound();
          setOpenCreateMatch(true);
        },
      },
      emphasis: true,
    },
    {
      name: 'Encontrar servidor',
      action: {
        onClick: () => {
          clickMenuSound();
          setOpenServerFind(true);
        },
      },
      emphasis: false,
    },
    {
      name: 'Configurações',
      action: {
        onClick: () => {
          setOpenConfiguration(true);
          clickMenuSound();
        },
      },
      emphasis: false,
    },
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
      name: 'Tutorial',
      action: {
        onClick: () => {
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
        },
      },
      emphasis: false,
    },
  ];

  return (
    <section className="grid h-full grid-cols-12 pb-16 pt-32">
      <div className="col-span-4 flex flex-col">
        <ul className="flex flex-col gap-3 pt-12 font-AntonRegular text-3xl">
          {list_menu.map(({ name, action, emphasis }, i) => (
            <li
              key={i}
              onMouseEnter={() => playMenuSound()}
              {...action}
              className={`group flex w-fit cursor-pointer gap-1 transition-all hover:pl-1 ${
                emphasis
                  ? 'text-red-600 hover:text-amber-800'
                  : 'text-white/70 hover:text-amber-600'
              }`}>
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative col-span-8 flex h-full w-full select-none justify-end pb-4 2xl:pr-64">
        <div
          ref={characterRef}
          style={{
            transform: `rotateY(${rotationAngle}deg)`,
            transformStyle: 'preserve-3d',
          }}
          className="relative flex h-full w-full max-w-[600px] overflow-hidden py-4">
          {/* <div className="absolute -top-4 left-[50%] z-10 -translate-x-[50%] font-AntonRegular text-xl text-white">
            Flintovsk
          </div> */}
          <div className="absolute z-10 h-full w-full"></div>
          <Image
            src={characterTest}
            title="Character Test"
            alt="Character Test"
            fill={true}
            priority={true}
            className="block h-auto w-fit select-none !object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,1)]"
          />
        </div>
        {/* <div className="absolute bottom-80 mt-auto flex h-12 w-full items-center justify-center gap-96">
          <div className="itens-center flex cursor-pointer justify-center rounded-xl bg-cyan-700 p-1 hover:opacity-80">
            <ArrowBendDownLeft
              size={32}
              weight="fill"
              className="rotate-45 text-white"
              onMouseDown={() => setIsRotatingLeft(true)}
              onMouseUp={() => setIsRotatingLeft(false)}
              onMouseLeave={() => setIsRotatingLeft(false)}
            />
          </div>
          <div className="itens-center flex cursor-pointer justify-center rounded-xl bg-cyan-700 p-1 hover:opacity-80">
            <ArrowBendDownRight
              size={32}
              weight="fill"
              className="-rotate-45 text-white"
              onMouseDown={() => setIsRotatingRight(true)}
              onMouseUp={() => setIsRotatingRight(false)}
              onMouseLeave={() => setIsRotatingRight(false)}
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default MiddleLobby;
