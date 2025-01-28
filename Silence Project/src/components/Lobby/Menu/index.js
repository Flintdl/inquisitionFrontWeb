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

function MenuLobby({ setBgLobby, soundAllowed }) {
  const [themeMusicLobby, setThemeMusicLobby] = useState(null);
  const [themeMusicLobbyPaused, setThemeMusicLobbyPaused] = useState(true);
  const [themeActually, setThemeActually] = useState('');

  const { user } = useUser();
  const router = useRouter();

  const { name } = user.player;
  const { avatar, coins, diamonds, level } = user.account;

  const [xp, setXp] = useState(100);
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
    <header className="select-none">
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
        <div className="relative">
          <ul className="flex w-fit gap-4 rounded-lg border-2 border-black bg-amber-700/50 px-3 py-1 backdrop-blur-xl">
            <li className="flex items-center gap-4 pr-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Coins weight="duotone" size={32} />
                <p className="font-AntonRegular">
                  {formattedNumbersCash(coins)}
                </p>
              </div>
              <div className="relative flex items-center gap-2 text-red-600">
                <SketchLogo weight="duotone" size={32} />
                <p className="font-AntonRegular">
                  {formattedNumbersCash(diamonds)}
                </p>
                <Plus
                  weight="bold"
                  size={16}
                  className="absolute -right-3 -top-1 cursor-pointer text-amber-400"
                />
              </div>
            </li>
            <li className="flex items-center">
              <div className="flex cursor-pointer items-center gap-2 text-amber-300 hover:opacity-80">
                <p className="hidden font-AntonRegular uppercase lg:block">
                  Amigos
                </p>
                {/* <Users weight="duotone" size={32} /> */}
              </div>
            </li>
            <li className="flex items-center">
              <div className="flex cursor-pointer items-center gap-2 text-amber-300 hover:opacity-80">
                <p className="hidden font-AntonRegular uppercase lg:block">
                  Ajuda
                </p>
                {/* <Question weight="duotone" size={32} /> */}
              </div>
            </li>
            <li className="flex items-center">
              <div className="flex cursor-pointer items-center gap-2 text-amber-300 hover:opacity-80">
                <p className="hidden font-AntonRegular uppercase lg:block">
                  Novidades
                </p>
                {/* <Note weight="duotone" size={32} /> */}
              </div>
            </li>
            <li className="flex items-center">
              <div className="flex cursor-pointer items-center gap-2 text-cyan-600 hover:opacity-80">
                <p className="hidden font-AntonRegular uppercase lg:block">
                  Perfil
                </p>
                {/* <Note weight="duotone" size={32} /> */}
              </div>
            </li>
          </ul>
          {/* <div className="absolute left-4 top-full mt-2 flex items-center gap-4 rounded-full p-2 text-white">
            <div className="flex items-center gap-2 rounded-md border border-amber-700/30 bg-amber-900/30 px-1 py-1 text-cyan-200 hover:opacity-70">
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
          <UserLobbyCard props={{ level, xp, avatar, name, boosted }} />
        </div>
      </nav>
    </header>
  );
}

const UserLobbyCard = ({ props }) => {
  const { level, xp, avatar, name, boosted } = props;
  return (
    <div
      className={`absolute right-0 top-full mt-4 flex items-center gap-2 rounded-2xl border-2 border-black p-2 ${
        boosted
          ? 'animate-bgBoosted bg-gradient-to-r from-red-500/80 via-orange-500/80 to-red-500/80 bg-[length:400%]'
          : 'bg-gradient-to-r from-red-500/80 via-red-500/80 to-cyan-500/80'
      }`}>
      <div className="flex w-fit items-center justify-center overflow-hidden rounded-xl border-2 border-red-600/90 bg-black shadow-md">
        <Image src={avatar} width={44} height={44} alt="Profile" />
      </div>
      <div className="flex w-32 flex-col gap-1">
        <div className="relative">
          <p className="relative z-10 font-KanitBold text-gray-300">{name}</p>
          <span className="absolute left-[0.15rem] top-[50%] z-0 mt-[0.20rem] -translate-y-[50%] whitespace-nowrap text-black blur-[1px]">
            {name}
          </span>
        </div>
        <div className="relative w-full overflow-hidden rounded-full border bg-gray-300">
          <p
            className={`flex h-3 w-full items-center justify-center rounded-sm text-xs ${
              boosted
                ? 'bg-gradient-to-r from-red-500/70 via-orange-500/70 to-black/70'
                : 'bg-gradient-to-r from-red-500 to-black'
            }`}
            style={{ width: `${xp}%` }}></p>
          <span className="absolute -top-[.10rem] left-[50%] block w-fit -translate-x-[50%] font-KanitBold text-[0.65rem] text-black">
            {xp}/100
          </span>
        </div>
      </div>
      <div className="relative flex flex-col">
        <div className="relative flex h-8 w-12 items-center justify-center rounded-full bg-badge_level font-AntonRegular text-sm">
          <span className="relative z-10 rounded-xl text-yellow-500">
            Lv <span className="text-lg">{level}</span>
          </span>
          <span className="absolute left-[50%] top-[50%] z-0 ml-[0.05rem] mt-[0.15rem] -translate-x-[50%] -translate-y-[50%] whitespace-nowrap text-lg text-black/50 blur-[1px]">
            Lv <span className="text-xl">{level}</span>
          </span>
        </div>
        {boosted && (
          <div className="mr-2 flex gap-1">
            <ArrowFatLinesUp
              weight="fill"
              className="rounded-lg bg-indigo-500 p-1 text-white"
              size={18}
            />
            <p className="font-AntonRegular text-xs text-white ">2x</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuLobby;
