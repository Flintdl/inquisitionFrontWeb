import Image from 'next/image';
import WereWolfLogotype from '../../../../public/images/silence_logotype.png';

function Loading() {
  return (
    <section className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-gradient-to-tr from-[#260006] to-[#bb2d43] text-2xl text-white">
      <div className="relative flex flex-col items-center justify-center overflow-hidden">
        {/* <div className="motion-safe:animate-lightAnimation absolute h-96 w-12 bg-gradient-to-br from-transparent via-white to-transparent" /> */}
        <Image
          width={300}
          height={300}
          src={WereWolfLogotype}
          quality={100}
          title="Werewolf Logotype"
          alt="Werewolf Logotype"
          priority
        />
        <p className="animate-pulse font-AntonRegular">Carregando...</p>
      </div>
    </section>
  );
}

export default Loading;
