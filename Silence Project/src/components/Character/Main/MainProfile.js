import Image from 'next/image';

function MainCharacterProfile({ configuration, character }) {
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
    <div className="relative flex h-full w-full select-none items-end justify-center pb-4">
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
          className="mt-4 block h-auto w-fit select-none !object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,1)]"
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
    <div className="absolute bottom-[calc(100%-180px)] left-[55%] z-10 h-[250px] w-[250px] -translate-x-[50%] rotate-6">
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
    <div className="absolute bottom-[calc(100%-380px)] left-[50%] z-10 h-[360px] w-[360px] -translate-x-[50%]">
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
    <div className="absolute bottom-[calc(100%-275px)] left-[50%] z-10 h-[225px] w-[300px] -translate-x-[50%] ">
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
    <div className="absolute bottom-[calc(100%-255px)] left-[50%] z-10 h-[180px] w-[300px] -translate-x-[50%] ">
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
    <div className="absolute bottom-[calc(100%-245px)] left-[50%] z-10 h-[150px] w-[270px] -translate-x-[50%] ">
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

export default MainCharacterProfile;
