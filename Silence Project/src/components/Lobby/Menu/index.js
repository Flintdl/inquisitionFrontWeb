import {
  ArrowFatLinesUp,
  Coins,
  Note,
  Plus,
  Question,
  SketchLogo,
  SquaresFour,
  Users,
  UsersThree,
} from '@phosphor-icons/react';
import { useState } from 'react';

import logotype from '../../../../public/images/logotype.png';
import Image from 'next/image';
import LobbyThemeMusic from '../Sound/theme';
import { useUser } from '../../../../contexts/UserContext';
import { useRouter } from 'next/router';

import banner from '../../../../public/images/banners/banner_pixel_teste.png';

function MenuLobby({ setBgLobby, soundAllowed }) {
  const [themeMusicLobby, setThemeMusicLobby] = useState(null);
  const [themeMusicLobbyPaused, setThemeMusicLobbyPaused] = useState(true);
  const [themeActually, setThemeActually] = useState('');

  const { user } = useUser();
  const router = useRouter();

  const { name } = user.player;
  const { avatar, coins, diamonds, level } = user.account;

  const [xp, setXp] = useState(70);
  const [boosted, setBoosted] = useState(true);

  const formattedNumbersCash = (cash) => {
    return cash.toLocaleString('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const list_menu = [
    { name: '', action: {}, icon: <SquaresFour size={28} weight="fill" /> },
    { name: '', action: {}, icon: <UsersThree size={28} weight="fill" /> },
    { name: 'JOGAR', action: {}, route: '/home' },
    { name: 'LOJA', action: {} },
    { name: 'CUSTOMIZAÇÃO', action: {} },
    { name: 'PERFIL', action: {} },
    { name: 'FUNÇÕES', action: {} },
    { name: 'AJUDA', action: {} },
  ];

  return (
    <header className="absolute left-0 right-0 top-0 z-10 select-none p-12">
      <ul className="absolute top-44 flex w-96 flex-col gap-4 rounded-2xl border border-gray-700 bg-gradient-to-r from-gray-500/30 to-gray-600/40 p-4 backdrop-blur-lg">
        <li className="overflow-hidden rounded-lg border border-gray-600/20 bg-gray-600/30 shadow-md">
          <div className="relative h-28 w-full">
            <Image
              src={banner}
              title="Banner_test"
              alt="Banner_test"
              fill={true}
              className="block h-auto w-fit select-none !object-fill"
            />
            <div className="absolute flex h-full w-full flex-col p-2 backdrop-blur-[1px]">
              <ul className="flex gap-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <li key={index}>
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </li>
                ))}
              </ul>
              <h5 className="mt-auto font-Scrubland text-lg leading-3 text-gray-200 shadow-xl">
                PROJETO TATSU
              </h5>
            </div>
          </div>
        </li>
        <li className="rounded-lg border border-gray-600/20 bg-gray-600/30 px-3 py-2 font-Scrubland shadow-md">
          <div className="flex items-center gap-2">
            <div className="relative h-16 w-16">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <circle
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <circle
                  className={`${boosted ? 'text-amber-500' : 'text-red-500'}`}
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${xp}, 100`}
                  strokeLinecap="round"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center',
                  }}
                />
              </svg>
              <span
                className={`absolute inset-0 flex flex-col items-center justify-center font-KanitBold ${
                  boosted ? 'text-amber-500' : 'text-red-500'
                }`}>
                <span className="pb-1 text-[0.65em]">LVL</span>
                <span className="pb-2 text-3xl leading-3">{level}</span>
              </span>
            </div>
            <div className="relative flex flex-col justify-center rounded-full bg-badge_level font-AntonRegular">
              <span className="relative z-10 rounded-xl text-xs text-gray-400">
                30,823 XP GANHO
              </span>
              <span className="relative z-10 rounded-xl text-sm text-gray-200">
                {100 - xp}% PARA O PRÓXIMO NÍVEL
              </span>
            </div>
          </div>

          {/* {boosted && (
            <div className="mr-2 flex gap-1">
              <ArrowFatLinesUp
                weight="fill"
                className="rounded-lg bg-indigo-500 p-1 text-white"
                size={18}
              />
              <p className="font-AntonRegular text-xs text-white ">2x</p>
            </div>
          )} */}
        </li>
        <li className="rounded-lg border border-gray-600/20 bg-gray-600/30 px-3 py-2 font-Scrubland shadow-md">
          <div className="flex items-center gap-4 rounded-full text-white">
            <div className="relative flex w-full items-center gap-2">
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
        </li>
        {/* <li className="rounded-lg border border-gray-600/20 bg-gray-600/30 px-3 py-2 font-Scrubland shadow-md">
          Jogadores recentes
          <ul className="flex flex-col gap-2">
            {['Diego', 'Lucas', 'Rafael', 'Ricardo', 'Thiago'].map(
              (name, i) => (
                <li className="flex items-center gap-1 text-gray-300">
                  <span className="block h-2 w-2 rounded-full bg-green-500"></span>
                  {name}
                </li>
              ),
            )}
          </ul>
        </li> */}
      </ul>

      <nav className="flex items-center justify-between">
        {/* <h1 className="bold bg-gradient-to-r from-gray-700 via-red-600 to-green-600 bg-clip-text pr-3 font-AntonRegular text-2xl uppercase text-transparent">
          <Image
            src={logotype}
            width={200}
            quality={100}
            height={230}
            alt="Logotype"
            className="drop-shadow-[0_0px_1px_rgba(255,255,255,1)]"
          />
        </h1> */}
        <ul className="flex gap-3 rounded-lg border border-gray-600 bg-gray-800/60 p-2 font-Scrubland text-xl">
          {list_menu.map(({ name, action, icon, route }, i) => (
            <li
              key={i}
              // onMouseEnter={() => playMenuSound()}
              {...action}
              className={`group flex cursor-pointer justify-center gap-1 rounded-lg border border-gray-600 bg-gray-800/30 px-2 transition-all hover:bg-gray-800/60 ${
                router.pathname === route
                  ? '!bg-amber-400 text-white hover:text-amber-700'
                  : 'text-white/70 hover:text-amber-300'
              }`}>
              {icon && icon}
              {name}
            </li>
          ))}
        </ul>
        <UserLobbyCard
          props={{
            level,
            xp,
            avatar,
            name,
            boosted,
            coins,
            diamonds,
            formattedNumbersCash,
          }}
        />

        {/* <ul className="flex gap-3 rounded-lg border border-gray-600 bg-gray-800/60 p-2 font-Scrubland text-xl">
          <li className="flex items-center">
            <div className="flex cursor-pointer items-center gap-2 text-amber-300 hover:opacity-80">
              <p className="hidden font-AntonRegular uppercase lg:block">
                Amigos
              </p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="flex cursor-pointer items-center gap-2 text-amber-300 hover:opacity-80">
              <p className="hidden font-AntonRegular uppercase lg:block">
                Ajuda
              </p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="flex cursor-pointer items-center gap-2 text-amber-300 hover:opacity-80">
              <p className="hidden font-AntonRegular uppercase lg:block">
                Novidades
              </p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="flex cursor-pointer items-center gap-2 text-cyan-600 hover:opacity-80">
              <p className="hidden font-AntonRegular uppercase lg:block">
                Perfil
              </p>
            </div>
          </li> 
        </ul> */}
      </nav>
    </header>
  );
}

const UserLobbyCard = ({ props }) => {
  const {
    level,
    xp,
    avatar,
    name,
    boosted,
    coins,
    diamonds,
    formattedNumbersCash,
  } = props;
  return (
    <div className="absolute right-12 top-12 flex items-start gap-4">
      <ul className="flex gap-3 rounded-lg border border-gray-600/40 bg-gray-800/60 px-2 py-1 font-Scrubland text-lg">
        <li className="flex items-center gap-4 pr-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Coins weight="duotone" size={32} />
            <p className="font-AntonRegular">{formattedNumbersCash(coins)}</p>
          </div>
          <div className="relative flex items-center gap-2 text-red-600">
            <SketchLogo weight="duotone" size={32} />
            <p className="font-AntonRegular">
              {formattedNumbersCash(diamonds)}
            </p>
            <Plus
              weight="bold"
              size={16}
              className="absolute -right-5 top-1/2 -translate-y-1/2 cursor-pointer text-amber-400"
            />
          </div>
        </li>
      </ul>
      <div className="rounded-xl border border-gray-600/40 bg-gray-800/60 p-2">
        <div className="flex w-fit items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-gray-500/30 to-gray-600/40 shadow-md backdrop-blur-lg">
          <Image src={avatar} width={80} height={80} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default MenuLobby;
