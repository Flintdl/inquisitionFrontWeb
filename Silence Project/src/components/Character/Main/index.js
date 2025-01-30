import Image from 'next/image';

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
    <div className="relative mt-12 flex h-full w-full max-w-[350px] select-none items-end justify-center">
      <div className="absolute top-0 z-20 h-full w-full"></div>
      <div className="relative flex h-[480px] min-h-[30rem] w-[200px] min-w-[13rem] max-w-[200px] select-none rounded-md">
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
          className="block h-auto w-fit select-none !object-contain"
        />
        <div className="absolute -top-16 left-[50%] z-10 -translate-x-[50%] rounded-md bg-gray-500/30 px-2 py-1 font-AntonRegular text-lg text-white backdrop-blur-sm">
          {character.name}
        </div>
        <div className="absolute -bottom-12 left-1/2 -z-[5] h-[200px] w-[400px] -translate-x-1/2 bg-gradient-to-b from-white/70 via-white/70 to-white/20 opacity-80 blur-xl"></div>
      </div>

      <div className="absolute -bottom-[90px] left-0 -z-10 overflow-hidden">
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
        sizes="100vw"
        quality={graphic()}
        className="block select-none"
      />
    </div>
  );
}

function Hair({ src, graphic }) {
  return (
    <div className="absolute -top-4 left-[50%] z-10 h-[200px] w-[200px] -translate-x-[50%]">
      <Image
        src={src}
        title="hatSkinTest"
        alt="hatSkinTest"
        fill={true}
        sizes="100vw"
        quality={graphic()}
        className="block select-none"
      />
    </div>
  );
}

function Glasses({ src, graphic }) {
  return (
    <div className="absolute left-[50%] top-4 z-10 h-[100px] w-[150px] -translate-x-[50%] ">
      <Image
        src={src}
        title="hatSkinTest"
        alt="hatSkinTest"
        fill={true}
        sizes="100vw"
        quality={graphic()}
        className="block select-none"
      />
    </div>
  );
}

function Eye({ src, graphic }) {
  return (
    <div className="absolute left-[50%] top-4 z-10 h-[90px] w-[150px] -translate-x-[50%] ">
      <Image
        src={src}
        title="hatSkinTest"
        alt="hatSkinTest"
        fill={true}
        sizes="100vw"
        quality={graphic()}
        className="block select-none"
      />
    </div>
  );
}

function Mouth({ src, graphic }) {
  return (
    <div className="absolute left-1/2 top-12 z-10 h-[70px] w-[150px] -translate-x-1/2">
      <Image
        src={src}
        title="hatSkinTest"
        alt="hatSkinTest"
        fill={true}
        sizes="100vw"
        quality={graphic()}
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
        sizes="100vw"
        quality={graphic()}
        className="block select-none"
      />
    </div>
  );
}

export default MainCharacter;
