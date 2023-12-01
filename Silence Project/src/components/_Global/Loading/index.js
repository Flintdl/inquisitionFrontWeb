import Image from 'next/image';
import WereWolfLogotype from '../../../../public/images/silence_logotype.png';
import image04 from '../../../../public/images/match_backgrounds/background_match_option_01_old.png';

function Loading() {
  return (
    <section className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-gradient-to-tr from-[#260006] to-[#bb2d43] text-2xl text-white">
      <Image
        src={image04}
        alt="bgLobbyMatch"
        fill={true}
        quality={100}
        priority={true}
        className="block h-auto w-full select-none !object-cover"
      />
      <div className="absolute left-0 top-0 h-full w-full bg-black/70"></div>
      <div className="absolute bottom-24 left-24 flex w-[650px] items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-red-500/20 bg-red-500/5 py-2 pl-2 pr-10 backdrop-blur-lg">
        {/* <div className="motion-safe:animate-lightAnimation absolute h-96 w-12 bg-gradient-to-br from-transparent via-white to-transparent" /> */}
        <Image
          width={150}
          height={150}
          src={WereWolfLogotype}
          quality={100}
          alt="Logotype"
          priority
        />
        <div className="flex flex-col gap-2">
          <p className="font-AntonRegular text-red-600">Dica</p>
          <p className="font-AntonRegular text-lg text-gray-300">
            Preste atenção quando alguém agir de maneira estranha, pode ser que
            seja alguém com más intenções
          </p>
        </div>
      </div>
    </section>
  );
}

export default Loading;
