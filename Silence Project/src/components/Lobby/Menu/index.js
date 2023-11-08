import {
  ArrowFatLinesUp,
  BluetoothConnected,
  Cat,
  Coins,
  CursorClick,
  Gear,
  Lightning,
  Minus,
  Note,
  Plus,
  Question,
  SketchLogo,
  SpeakerHigh,
  SpeakerSlash,
  Users,
} from "@phosphor-icons/react";
import { useState } from "react";

function MenuLobby({ setBgLobby, lobbyThemeMusic }) {
  const { themeMusicLobbyPaused, setThemeMusicLobbyPaused } = lobbyThemeMusic;

  const [coins, setCoins] = useState(210);
  const [diamonds, setDiamonds] = useState(15);
  const [xp, setXp] = useState(50);
  const [level, setLevel] = useState(60);
  const [boosted, setBoosted] = useState(true);

  return (
    <header className="select-none">
      <nav className="flex items-center justify-between">
        <div>
          <h1 className="bold bg-gradient-to-r from-gray-700 via-red-600 to-green-600 bg-clip-text pr-2 font-AntonRegular text-2xl text-transparent">
            SilenceKillers
          </h1>
        </div>
        <div className="relative">
          <ul className="flex w-fit gap-6 rounded-3xl border border-white/10 bg-gray-600/90 px-3 py-1">
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
                <Users weight="duotone" size={32} />
                <p className="hidden font-AntonRegular lg:block">Amigos</p>
              </div>
            </li>
            <li>
              <div className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-orange-400 hover:opacity-80">
                <Gear weight="duotone" size={32} />
                <p className="hidden font-AntonRegular lg:block">
                  Configurações
                </p>
              </div>
            </li>
            <li>
              <div className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-cyan-400 hover:opacity-80">
                <Question weight="duotone" size={32} />
                <p className="hidden font-AntonRegular lg:block">Ajuda</p>
              </div>
            </li>
            <li>
              <div className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80">
                <Note weight="duotone" size={32} />
                <p className="hidden font-AntonRegular lg:block">Novidades</p>
              </div>
            </li>
            <li className="flex items-center">
              <div
                onClick={() => setBgLobby(1)}
                className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80"
              >
                <p className="hidden font-AntonRegular lg:block">01</p>
              </div>
            </li>
            <li className="flex items-center">
              <div
                onClick={() => setBgLobby(2)}
                className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80"
              >
                <p className="hidden font-AntonRegular lg:block">02</p>
              </div>
            </li>
            <li className="flex items-center">
              <div
                onClick={() => setBgLobby(3)}
                className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80"
              >
                <p className="hidden font-AntonRegular lg:block">03</p>
              </div>
            </li>
            <li className="flex items-center">
              <div
                onClick={() => setBgLobby(4)}
                className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80"
              >
                <p className="hidden font-AntonRegular lg:block">04</p>
              </div>
            </li>
            <li className="flex items-center">
              <div
                onClick={() => setBgLobby(5)}
                className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-yellow-400 hover:opacity-80"
              >
                <p className="hidden font-AntonRegular lg:block">05</p>
              </div>
            </li>
            {/* <li onClick={() => setBoosted(!boosted)}>
              <div className="flex cursor-pointer items-center gap-2 text-purple-400 hover:opacity-80">
                <CursorClick weight="duotone" size={32} />
                <p className="font-AntonRegular">
                  {boosted ? "Free" : "Boosted"}
                </p>
              </div>
            </li> */}
          </ul>
          <div className="absolute left-4 top-full mt-2 flex items-center gap-4 rounded-full p-2 text-white">
            {themeMusicLobbyPaused && (
              <SpeakerHigh
                onClick={() => setThemeMusicLobbyPaused(false)}
                size={32}
                className="cursor-pointer rounded-md border border-cyan-500/50 bg-cyan-500/30 p-1 text-cyan-200 hover:opacity-70"
                weight="fill"
              />
            )}
            {!themeMusicLobbyPaused && (
              <SpeakerSlash
                onClick={() => setThemeMusicLobbyPaused(true)}
                size={32}
                className="cursor-pointer rounded-md border border-cyan-500/50 bg-cyan-500/30 p-1 text-cyan-200 hover:opacity-70"
                weight="fill"
              />
            )}
          </div>
          <div
            className={`absolute right-4 top-full mt-4 flex items-center gap-4 rounded-full p-2 ${
              boosted
                ? "animate-bgBoosted bg-gradient-to-r from-cyan-500 via-indigo-500 to-orange-500"
                : "border border-white/10 bg-gray-600/90"
            }`}
          >
            <div>
              <div className="flex w-fit items-center justify-center rounded-full border-2 border-white bg-cyan-600 p-2">
                <Cat size={20} weight="fill" className="text-gray-100" />
              </div>
            </div>
            <div className="flex w-32 flex-col gap-1">
              <p className="font-AntonRegular text-gray-300">Flintovsk</p>
              <div className="relative w-full overflow-hidden rounded-full border bg-gray-300">
                <p
                  className="flex h-3 w-full items-center justify-center rounded-full bg-cyan-600 text-xs"
                  style={{ width: `${xp}%` }}
                ></p>
                <span className="absolute -top-[.10rem] left-[50%] block w-fit -translate-x-[50%] font-nunito_bold text-[0.65rem]">
                  {xp}/100
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="font-AntonRegular text-yellow-500">Level {level}</p>
              {boosted && (
                <div className="mr-2 flex gap-1">
                  <ArrowFatLinesUp
                    weight="fill"
                    className="rounded-lg bg-indigo-500 p-1 text-white"
                    size={18}
                  />
                  <p className="font-AntonRegular text-xs text-white">
                    Boosted
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MenuLobby;
