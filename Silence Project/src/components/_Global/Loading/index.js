import Image from "next/image";
import WereWolfLogotype from "../../../../public/images/werewolfLogotype.jpeg";

function Loading() {
  return (
    <section className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-[#001426] text-2xl text-white">
      <div className="relative flex flex-col items-center justify-center overflow-hidden">
        {/* <div className="motion-safe:animate-lightAnimation absolute h-96 w-12 bg-gradient-to-br from-transparent via-white to-transparent" /> */}
        <Image
          width={220}
          height={220}
          src={WereWolfLogotype}
          title="Werewolf Logotype"
          alt="Werewolf Logotype"
          priority
        />
        <p className="font-AntonRegular animate-pulse">Carregando...</p>
      </div>
    </section>
  );
}

export default Loading;
