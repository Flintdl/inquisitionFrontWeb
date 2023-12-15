import Image from 'next/image';
import bgImage from '../../../public/images/profile_backgrounds/background_profile_option_01.png';
import characterTest from '../../../public/images/characters/character_villager.png';
import characterTestPreview from '../../../public/images/profile_skins/preview/preview_skin_profile.png';
import CustomTitles from '../_Global/Commons/Titles';

import { useUser } from '../../../contexts/UserContext';
import { Coins, Plus, SketchLogo } from '@phosphor-icons/react';

function ProfileAccount() {
  const { user } = useUser();

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full gap-4 bg-sky-600 p-4">
      <div className="fixed left-0 top-0 -z-10 h-full w-full bg-cover">
        <Image
          src={bgImage}
          alt="Background profile"
          // quality={graphic()}
          fill={true}
          priority={true}
          className="block h-auto w-full select-none !object-cover"
        />
        <div className="h-full w-full bg-gradient-to-r from-black via-black/60 to-black/10 opacity-80"></div>
      </div>
      <LeftMenu user={user} />
      <Middle />
      <RightMenu />
    </div>
  );
}

const LeftMenu = ({ user }) => {
  console.log(user);

  const formattedNumbersCash = (cash) => {
    return cash.toLocaleString('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const { account, email, player } = user;

  return (
    <aside className="h-fit min-w-[350px] flex-1 rounded-xl border-2 border-white/20 p-4 text-white backdrop-blur-md">
      <ul className="flex w-full flex-col gap-4 p-2">
        <li className="flex gap-4 border-b border-white/20 pb-6">
          <div className="relative aspect-square h-16 w-16 items-center overflow-hidden rounded-lg border-2 border-white/20">
            <Image
              src={account.avatar}
              title="Character Test"
              alt="Character Test"
              fill={true}
              // quality={graphic()}
              priority={true}
              className="block aspect-square h-full w-full select-none !object-contain"
            />
          </div>
          <div className="">
            <p className="font-AntonRegular text-xl text-cyan-500">
              {player.name}
            </p>
            <p className="font-Scrubland text-sm text-amber-500">
              Level: {account.level}
            </p>
          </div>
        </li>
        <li className="font-Scrubland flex flex-col gap-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Coins weight="duotone" size={32} />
            Moedas:
            <p className="ml-auto">{formattedNumbersCash(account.coins)}</p>
          </div>
          <div className="relative flex items-center gap-2 text-red-500">
            <SketchLogo weight="duotone" size={32} />
            Diamantes:
            <p className="ml-auto">{formattedNumbersCash(account.diamonds)}</p>
            <Plus
              weight="bold"
              size={16}
              className="absolute -right-3 -top-1 cursor-pointer text-amber-400"
            />
          </div>
        </li>
      </ul>
    </aside>
  );
};
const Middle = () => {
  return (
    <section className="w-[50%] p-4">
      <div className="relative flex h-full w-full select-none items-end justify-center pb-4">
        <div
          // ref={characterRef}
          style={{
            // transform: `rotateY(${rotationAngle}deg)`,
            transformStyle: 'preserve-3d',
          }}
          className="relative flex h-[650px] w-full max-w-[550px] overflow-hidden py-4">
          <div className="absolute z-10 h-full w-full"></div>
          <Image
            src={characterTest}
            title="Character Test"
            alt="Character Test"
            fill={true}
            // quality={graphic()}
            priority={true}
            className="block aspect-[5/6] h-fit w-fit select-none !object-contain drop-shadow-[0px_0px_25px_rgba(0,0,0,1)]"
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
};
const RightMenu = () => {
  return (
    <aside className="flex min-w-[350px] flex-1 flex-col gap-4 rounded-xl border-2 border-white/20 p-4 text-center text-white backdrop-blur-md">
      <CustomTitles
        tag="p"
        size={20}
        text="Selecione uma skin"
        customClass="font-Scrubland text-gray-200"
      />
      <ul className="flex flex-wrap gap-4 overflow-y-auto scrollbar-none">
        {[0, 1, 2, 3, 4, 5].map((item) => {
          return (
            <li
              key={item}
              // style={{ borderRadius: '20px 0' }}
              className={`bg-skin_preview group relative aspect-[1/2] w-[calc((100%/3)-.7rem)] min-w-[128px] flex-1 overflow-hidden rounded-bl-md rounded-br-2xl rounded-tl-2xl rounded-tr-md bg-red-500/30 bg-contain ${
                item === 0 ? 'bg-blend-exclusion' : ''
              }`}>
              <div
                className={`relative h-full w-full rounded-bl-md rounded-br-2xl rounded-tl-2xl rounded-tr-md border-2 ${
                  item === 0 ? 'border-amber-700' : 'border-white/30'
                }`}>
                <Image
                  src={characterTestPreview}
                  title="Character Test"
                  alt="Character Test"
                  fill={true}
                  // quality={graphic()}
                  className="block h-fit w-fit scale-[.8] select-none !object-contain drop-shadow-[0px_0px_25px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="absolute left-0 top-0 h-[172%] w-full -translate-y-[36%] transform bg-gradient-to-t from-[rgba(0,0,0,0.1)] via-[rgba(0,0,0,0.07)] to-[rgba(255,255,255,0.15)] opacity-50 transition-all group-hover:translate-y-[0%] group-hover:opacity-100"></div>
              <div className="absolute bottom-[.15rem] left-[.15rem] h-12 w-[calc(100%-.3rem)] rounded-bl-md rounded-br-xl bg-gradient-to-t from-black/90 p-1 pt-6">
                <CustomTitles
                  tag="p"
                  size={20}
                  pos="center"
                  text="Guerreiro Real"
                  customClass="font-Scrubland text-xs uppercase text-amber-500"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default ProfileAccount;
