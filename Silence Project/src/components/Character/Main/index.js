import Image from 'next/image';
import { useState } from 'react';

import characterTest from '../../../../public/images/characters/default_character.png';
import hatSkin01 from '../../../../public/images/characters_skins/hat_skin_01.png';
import hairSkin02 from '../../../../public/images/characters_skins/hair/hair_skin_02.png';
import eyeSkin01 from '../../../../public/images/characters_skins/eye_skin_01.png';
import mouthSkin01 from '../../../../public/images/characters_skins/mouth/mouth_skin_03.png';
import glassesSkin03 from '../../../../public/images/characters_skins/glasess/glasess_skin_04.png';
import floorLobbyCharacter01 from '../../../../public/images/characters/floor_character_01.png';

function MainCharacter({ configuration, character }) {
  const graphic = () => {
    switch (configuration.graphics) {
      case 0:
        return 10;
      case 1:
        return 50;
      case 2:
        return 100;
      default:
        return 100;
    }
  };

  return (
    <div className="relative flex h-full select-none items-end justify-end pb-4 2xl:pr-40">
      <div className="absolute top-0 z-20 h-full w-full"></div>
      <div className="relative flex h-[520px] w-[300px] max-w-[600px] select-none rounded-md">
        {character.skins.eye && (
          <Eye src={character.skins.eye} graphic={() => graphic()} />
        )}
        {character.skins.mouth && (
          <Mouth src={character.skins.mouth} graphic={() => graphic()} />
        )}
        {character.skins.glasses && (
          <Glasses src={character.skins.glasses} graphic={() => graphic()} />
        )}
        {character.skins.hair && (
          <Hair src={character.skins.hair} graphic={() => graphic()} />
        )}
        {character.skins.hat && (
          <Hat src={character.skins.hat} graphic={() => graphic()} />
        )}
        {character.skins.wings && (
          <Wings src={character.skins.wings} graphic={() => graphic()} />
        )}
        <Image
          src={character.person}
          title="Character Test"
          alt="Character Test"
          fill={true}
          quality={graphic()}
          priority={true}
          className="block h-auto w-fit select-none !object-contain "
        />
        <div className="absolute -top-8 left-[50%] z-10 -translate-x-[50%] font-AntonRegular text-xl text-white">
          {character.name}
        </div>
      </div>
      <div className="absolute -bottom-32 -left-36 -z-10 overflow-hidden">
        <Image
          src={floorLobbyCharacter01}
          title="Character Test"
          alt="Character Test"
          quality={graphic()}
          priority={true}
          className="block h-auto w-fit select-none !object-contain "
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
  );
}

function Hat({ src, graphic }) {
  return (
    <div className="absolute bottom-[calc(100%-164px)] left-[55%] z-10 h-[250px] w-[250px] -translate-x-[50%] rotate-6">
      <Image
        src={src}
        title="hatSkinTest"
        alt="hatSkinTest"
        fill={true}
        quality={graphic()}
        priority={true}
        className="block select-none"
      />
    </div>
  );
}

function Hair({ src, graphic }) {
  return (
    <div className="absolute bottom-[calc(100%-368px)] left-[50%] z-10 h-[360px] w-[360px] -translate-x-[50%]">
      <Image
        src={src}
        title="hatSkinTest"
        alt="hatSkinTest"
        fill={true}
        quality={graphic()}
        priority={true}
        className="block select-none"
      />
    </div>
  );
}

function Glasses({ src, graphic }) {
  return (
    <div className="absolute bottom-[calc(100%-259px)] left-[50%] z-10 h-[225px] w-[300px] -translate-x-[50%] ">
      <Image
        src={src}
        title="hatSkinTest"
        alt="hatSkinTest"
        fill={true}
        quality={graphic()}
        priority={true}
        className="block select-none"
      />
    </div>
  );
}

function Eye({ src, graphic }) {
  return (
    <div className="absolute bottom-[calc(100%-239px)] left-[50%] z-10 h-[180px] w-[300px] -translate-x-[50%] ">
      <Image
        src={src}
        title="hatSkinTest"
        alt="hatSkinTest"
        fill={true}
        quality={graphic()}
        priority={true}
        className="block select-none"
      />
    </div>
  );
}

function Mouth({ src, graphic }) {
  return (
    <div className="absolute bottom-[calc(100%-229px)] left-[50%] z-10 h-[150px] w-[270px] -translate-x-[50%] ">
      <Image
        src={src}
        title="hatSkinTest"
        alt="hatSkinTest"
        fill={true}
        quality={graphic()}
        priority={true}
        className="block select-none"
      />
    </div>
  );
}

function Wings({ src, graphic }) {
  return (
    <div className="absolute bottom-[calc(100%-375px)] left-[50%] z-0 h-[200px] w-[400px] -translate-x-[50%] ">
      <Image
        src={src}
        title="hatSkinTest"
        alt="hatSkinTest"
        fill={true}
        quality={graphic()}
        priority={true}
        className="block select-none"
      />
    </div>
  );
}

export default MainCharacter;
