import Image from 'next/image';
import bgImage from '../../../public/images/profile_backgrounds/background_profile_option_01.png';
import characterTestPreview from '../../../public/images/profile_skins/preview/preview_skin_profile.png';
import CustomTitles from '../_Global/Commons/Titles';

import { useUser } from '../../../contexts/UserContext';
import { useConfiguration } from '../../../contexts/ConfigurationContext';

import characterTest from '../../../public/images/characters/default_character.png';
import hatSkin01 from '../../../public/images/characters_skins/hat_skin_01.png';
import glassesSkin01 from '../../../public/images/characters_skins/glasess_skin_01.png';
import glassesSkin02 from '../../../public/images/characters_skins/glasess/glasess_skin_02.png';
import glassesSkin03 from '../../../public/images/characters_skins/glasess/glasess_skin_03.png';
import glassesSkin04 from '../../../public/images/characters_skins/glasess/glasess_skin_04.png';
import glassesSkin05 from '../../../public/images/characters_skins/glasess/glasess_skin_05.png';
import glassesSkin06 from '../../../public/images/characters_skins/glasess/glasess_skin_06.png';
import glassesSkin07 from '../../../public/images/characters_skins/glasess/glasess_skin_07.png';
import redWings from '../../../public/images/characters_skins/wings-red.store.png';
import emptySkin01 from '../../../public/images/characters_skins/empty_skin_01.png';
import eyeSkin01 from '../../../public/images/characters_skins/eye_skin_01.png';
import eyeSkin02 from '../../../public/images/characters_skins/eye_skin_02.png';
import mouthSkin01 from '../../../public/images/characters_skins/mouth/mouth_skin_01.png';
import mouthSkin02 from '../../../public/images/characters_skins/mouth/mouth_skin_02.png';
import mouthSkin03 from '../../../public/images/characters_skins/mouth/mouth_skin_03.png';
import mouthSkin04 from '../../../public/images/characters_skins/mouth/mouth_skin_04.png';
import mouthSkin05 from '../../../public/images/characters_skins/mouth/mouth_skin_05.png';
import hairSkin01 from '../../../public/images/characters_skins/hair/hair_skin_01.png';
import hairSkin02 from '../../../public/images/characters_skins/hair/hair_skin_02.png';
import hairSkin03 from '../../../public/images/characters_skins/hair/hair_skin_03.png';
import hairSkin04 from '../../../public/images/characters_skins/hair/hair_skin_04.png';

import {
  Backpack,
  BaseballCap,
  Coins,
  Eye,
  Plus,
  SketchLogo,
  Sunglasses,
  Tooth,
  User,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import MainCharacterProfile from '../Character/Main/MainProfile';

function ProfileAccount() {
  const { user } = useUser();
  const { configuration, setConfiguration } = useConfiguration();

  const [character, setCharacter] = useState({
    name: 'Flintovsk',
    person: characterTest,
    skins: {
      hat: hatSkin01,
      hair: hairSkin02,
      clothes: null,
      pants: null,
      body: null,
      wings: null,
      eye: eyeSkin01,
      mouth: mouthSkin01,
      glasses: glassesSkin03,
      gloves: null,
      weapon: null,
      boots: null,
    },
  });

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
      <Middle
        configuration={configuration}
        characterConfig={{ character, setCharacter }}
      />
      <RightMenu characterConfig={{ character, setCharacter }} />
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
        <li className="flex flex-col gap-4 font-Scrubland">
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
const Middle = ({ configuration, characterConfig }) => {
  const { character, setCharacter } = characterConfig;

  return (
    <section className="flex w-[50%] px-4 py-24">
      <MainCharacterProfile
        configuration={configuration}
        character={character}
      />
    </section>
  );
};

const RightMenu = ({ characterConfig }) => {
  const { character, setCharacter } = characterConfig;

  const [select, setSelect] = useState({
    hat: character.skins['hat'] || null,
    hair: character.skins['hair'] || null,
    clothes: character.skins['clothes'] || null,
    pants: character.skins['pants'] || null,
    body: character.skins['body'] || null,
    wings: character.skins['wings'] || null,
    eye: character.skins['eye'] || null,
    mouth: character.skins['mouth'] || null,
    glasses: character.skins['glasses'] || null,
    gloves: character.skins['gloves'] || null,
    weapon: character.skins['weapon'] || null,
    boots: character.skins['boots'] || null,
  });

  const [tabSelect, setTabSelect] = useState('hat');

  useEffect(() => {
    console.log(select);
  }, [select]);

  const skins = {
    hat: {
      icon: <BaseballCap weight="fill" size={24} />,
      items: [
        { name: 'Nenhum', image: emptySkin01, bind: 0 },
        {
          name: 'Cartola',
          image: hatSkin01,
        },
      ],
    },
    hair: {
      icon: <User weight="fill" size={24} />,
      items: [
        { name: 'Nenhum', image: emptySkin01, bind: 0 },
        {
          name: 'Cabelo Louro',
          image: hairSkin01,
        },
        {
          name: 'Cabelo Curto',
          image: hairSkin02,
        },
        {
          name: 'Cabelo Moicano',
          image: hairSkin03,
        },
        {
          name: 'Cabelo Afro',
          image: hairSkin04,
        },
      ],
    },
    wings: {
      icon: <Backpack weight="fill" size={24} />,
      items: [
        { name: 'Nenhum', image: emptySkin01, bind: 0 },
        { name: 'Asa Vermelha', image: redWings },
      ],
    },
    eye: {
      icon: <Eye weight="fill" size={24} />,
      items: [
        { name: 'Nenhum', image: emptySkin01, bind: 0 },
        { name: 'Padrão', image: eyeSkin01 },
        { name: 'Assustado', image: eyeSkin02 },
      ],
    },
    mouth: {
      icon: <Tooth weight="fill" size={24} />,
      items: [
        { name: 'Nenhum', image: emptySkin01, bind: 0 },
        { name: 'Padrão', image: mouthSkin01 },
        { name: 'Assustado', image: mouthSkin02 },
        { name: 'Assustado', image: mouthSkin03 },
        { name: 'Assustado', image: mouthSkin04 },
        { name: 'Assustado', image: mouthSkin05 },
      ],
    },
    glasses: {
      icon: <Sunglasses weight="fill" size={24} />,
      items: [
        { name: 'Nenhum', image: emptySkin01, bind: 0 },
        // { name: 'Juliet', image: glassesSkin01 },
        { name: 'Segurança', image: glassesSkin02 },
        { name: 'Engraçado', image: glassesSkin03 },
        { name: 'Juliet', image: glassesSkin04 },
        { name: '3D', image: glassesSkin05 },
        { name: 'Coração', image: glassesSkin06 },
        { name: 'Sem Grau', image: glassesSkin07 },
      ],
    },
  };

  const tabs = [
    { title: 'Chapéu', bind: 'hat' },
    { title: 'Cabelo', bind: 'hair' },
    { title: 'Costas', bind: 'wings' },
    { title: 'Olhos', bind: 'eye' },
    { title: 'Boca', bind: 'mouth' },
    { title: 'Óculos', bind: 'glasses' },
  ];

  return (
    <aside className="flex min-w-[500px] max-w-[500px] flex-col gap-4 rounded-xl border-2 border-white/20 p-4 text-center text-white backdrop-blur-md">
      <CustomTitles
        tag="p"
        size={20}
        text="Selecione uma skin"
        customClass="font-Scrubland text-gray-200"
      />

      <ul className="mb-4 flex gap-4">
        {tabs.map(({ title, bind }) => (
          <li
            key={bind}
            onClick={() => setTabSelect(bind)}
            className={`flex cursor-pointer items-center rounded px-4 py-2 ${
              tabSelect === bind
                ? 'bg-amber-700 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}>
            {skins[bind].icon}
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-4 overflow-y-auto scrollbar-none">
        {skins[tabSelect]?.items.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setCharacter((prevState) => {
                const isCategorySelected = !!prevState.skins[tabSelect];
                return {
                  ...prevState,
                  skins: {
                    ...prevState.skins,
                    [tabSelect]: item.bind === 0 ? null : item.image,
                  },
                };
              });
              setSelect((prevState) => {
                const isCategorySelected = !!prevState[tabSelect];
                return {
                  ...prevState,
                  [tabSelect]: item.bind === 0 ? null : item.image,
                };
              });
            }}
            className={`group relative aspect-square w-[calc((100%/3)-.7rem)] min-w-[128px] overflow-hidden rounded-bl-md rounded-br-2xl rounded-tl-2xl rounded-tr-md bg-amber-500/30 bg-contain ${
              item.image === select[tabSelect]
                ? 'bg-skin_preview bg-blend-exclusion'
                : ''
            }`}>
            <div
              className={`relative h-full w-full rounded-bl-md rounded-br-2xl rounded-tl-2xl rounded-tr-md border-2 ${
                item.image === select[tabSelect]
                  ? 'border-amber-700'
                  : 'border-white/30'
              }`}>
              <Image
                src={item.image}
                title={item.name}
                alt={item.name}
                fill={true}
                className="block h-fit w-fit scale-[.8] select-none !object-contain drop-shadow-[0px_0px_25px_rgba(0,0,0,1)]"
              />
            </div>
            <div className="absolute left-0 top-0 h-[172%] w-full -translate-y-[36%] transform bg-gradient-to-t from-[rgba(0,0,0,0.1)] via-[rgba(0,0,0,0.07)] to-[rgba(255,255,255,0.15)] opacity-50 transition-all group-hover:translate-y-[0%] group-hover:opacity-100"></div>
            <div className="absolute bottom-[.15rem] left-[.15rem] h-12 w-[calc(100%-.3rem)] rounded-bl-md rounded-br-xl bg-gradient-to-t from-black/90 p-1 pt-7">
              <CustomTitles
                tag="p"
                size={20}
                pos="center"
                text={item.name}
                customClass="font-Scrubland text-xs uppercase text-amber-500"
              />
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ProfileAccount;
