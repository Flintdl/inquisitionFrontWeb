import {
  ArrowFatLinesUp,
  Coins,
  Note,
  Plus,
  Question,
  SketchLogo,
  Users,
} from '@phosphor-icons/react';
import { useState } from 'react';

import logotype from '../../../../public/images/logotype.png';
import profileImage from '../../../../public/images/miniature-1-1-mage-profile.png';
import Image from 'next/image';
import LobbyThemeMusic from '../Sound/theme';

function MenuLobby({ setBgLobby, soundAllowed }) {
  const [themeMusicLobby, setThemeMusicLobby] = useState(null);
  const [themeMusicLobbyPaused, setThemeMusicLobbyPaused] = useState(true);
  const [themeActually, setThemeActually] = useState('');

  const [coins, setCoins] = useState(210);
  const [diamonds, setDiamonds] = useState(15);
  const [xp, setXp] = useState(50);
  const [level, setLevel] = useState(60);
  const [boosted, setBoosted] = useState(true);

  return (
    <header className="select-none">
      <nav className="flex items-center justify-between">
        <h1 className="bold bg-gradient-to-r from-gray-700 via-red-600 to-green-600 bg-clip-text pr-2 font-AntonRegular text-2xl uppercase text-transparent">
          <Image
            src={logotype}
            width={190}
            height={32}
            alt="Logotype"
            className="drop-shadow-[0_0px_15px_rgba(220,38,38,0.3)]"
          />
        </h1>
        <div className="relative">
          <ul className="flex w-fit gap-6 rounded-xl border-2 border-white/10 bg-amber-900/30 px-3 py-1 backdrop-blur-xl">
            <li className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-yellow-500">
                <Coins weight="duotone" size={32} />
                <p className="font-AntonRegular">{coins}</p>
              </div>
              <div className="relative flex items-center gap-2 text-red-500">
                <SketchLogo weight="duotone" size={32} />
                <p className="font-AntonRegular">{diamonds}</p>
                <Plus
                  weight="bold"
                  size={18}
                  className="absolute -top-2 right-2 cursor-pointer text-yellow-500"
                />
              </div>
            </li>
            <li>
              <div className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-green-500 hover:opacity-80">
                <p className="hidden font-AntonRegular uppercase lg:block">
                  Amigos
                </p>
                <Users weight="fill" size={32} />
              </div>
            </li>
            <li>
              <div className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-cyan-400 hover:opacity-80">
                <p className="hidden font-AntonRegular uppercase lg:block">
                  Ajuda
                </p>
                <Question weight="fill" size={32} />
              </div>
            </li>
            <li>
              <div className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80">
                <p className="hidden font-AntonRegular uppercase lg:block">
                  Novidades
                </p>
                <Note weight="fill" size={32} />
              </div>
            </li>
            {/* <li className="flex items-center">
              <div
                onClick={() => setBgLobby(1)}
                className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80">
                <p className="hidden font-AntonRegular lg:block">01</p>
              </div>
            </li>
            <li className="flex items-center">
              <div
                onClick={() => setBgLobby(2)}
                className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80">
                <p className="hidden font-AntonRegular lg:block">02</p>
              </div>
            </li>
            <li className="flex items-center">
              <div
                onClick={() => setBgLobby(3)}
                className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80">
                <p className="hidden font-AntonRegular lg:block">03</p>
              </div>
            </li>
            <li className="flex items-center">
              <div
                onClick={() => setBgLobby(4)}
                className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80">
                <p className="hidden font-AntonRegular lg:block">04</p>
              </div>
            </li>
            <li className="flex items-center">
              <div
                onClick={() => setBgLobby(5)}
                className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80">
                <p className="hidden font-AntonRegular lg:block">05</p>
              </div>
            </li>*/}
            <li
              onClick={() => setBoosted(!boosted)}
              className="flex items-center">
              <div className="flex cursor-pointer items-center text-purple-400 hover:opacity-80">
                <p className="font-AntonRegular">
                  {boosted ? 'Free' : 'Boosted'}
                </p>
              </div>
            </li>
          </ul>
          <div className="absolute left-4 top-full mt-2 flex items-center gap-4 rounded-full p-2 text-white">
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
          </div>
          <div
            className={`absolute right-0 top-full mt-4 flex items-center gap-4 rounded-2xl p-2 ${
              boosted
                ? 'animate-bgBoosted bg-gradient-to-r from-cyan-500/70 via-indigo-500/70 to-orange-500/70'
                : 'border border-white/10 bg-gray-600/90'
            }`}>
            <div className="flex flex-col">
              <p className="font-AntonRegular text-yellow-500">Level {level}</p>
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
            <div className="flex w-32 flex-col items-end gap-1">
              <p className="font-KanitRegular text-gray-300">Flintovsk</p>
              <div className="relative w-full overflow-hidden rounded-md border bg-gray-300">
                <p
                  className={`flex h-3 w-full items-center justify-center rounded-sm text-xs ${
                    boosted
                      ? 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-orange-500'
                      : 'bg-gradient-to-r from-cyan-500 to-green-500'
                  }`}
                  style={{ width: `${xp}%` }}></p>
                <span className="absolute -top-[.10rem] left-[50%] block w-fit -translate-x-[50%] font-KanitBold text-[0.65rem]">
                  {xp}/100
                </span>
              </div>
            </div>

            <div className="flex w-fit items-center justify-center overflow-hidden rounded-xl border-2 border-white/30 bg-cyan-600 shadow-md">
              <Image src={profileImage} width={44} height={44} alt="Profile" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MenuLobby;
