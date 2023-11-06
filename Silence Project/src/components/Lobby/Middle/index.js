import Image from "next/image";
import characterTest from "../../../../public/images/character_example_pixel.png";
import { ArrowBendDownLeft, ArrowBendDownRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

function MiddleLobby({ actions }) {
  const { setOpenServerFind, setOpenCreateMatch } = actions;

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotatingLeft, setIsRotatingLeft] = useState(false);
  const [isRotatingRight, setIsRotatingRight] = useState(false);
  const characterRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleRotate = () => {
      if (isRotatingLeft) {
        setRotationAngle((prevAngle) => prevAngle - 2);
      }
      if (isRotatingRight) {
        setRotationAngle((prevAngle) => prevAngle + 2);
      }

      animationFrameId = requestAnimationFrame(handleRotate);
    };

    if (isRotatingLeft || isRotatingRight) {
      handleRotate();
    } else {
      cancelAnimationFrame(animationFrameId);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRotatingLeft, isRotatingRight]);

  return (
    <section className="grid h-full grid-cols-12 pb-6 pt-32">
      <div className="col-span-4 flex flex-col">
        <h5 className="mt-12 font-AntonRegular text-4xl text-white/70">
          Bem-vindo, <span className="text-red-600">Flintovsk</span>
        </h5>
        <ul className="flex flex-col gap-3 pt-12 font-AntonRegular text-3xl text-white/70">
          <li
            onClick={() => setOpenCreateMatch(true)}
            className="w-fit cursor-pointer text-green-500 transition-all hover:pl-1 hover:opacity-70"
          >
            Jogar
          </li>
          <li
            className="w-fit cursor-pointer transition-all hover:pl-1 hover:opacity-70"
            onClick={() => setOpenServerFind(true)}
          >
            Encontrar servidor
          </li>
          <li className="w-fit cursor-pointer transition-all hover:pl-1 hover:opacity-70">
            Customizar
          </li>
          <li className="w-fit cursor-pointer transition-all hover:pl-1 hover:opacity-70">
            Funções
          </li>
          <li className="w-fit cursor-pointer transition-all hover:pl-1 hover:opacity-70">
            Tutorial
          </li>
          <li className="w-fit cursor-pointer transition-all hover:pl-1 hover:opacity-70">
            Sair
          </li>
        </ul>
      </div>
      <div className="relative col-span-8 h-full w-full select-none">
        <div className="absolute left-[50%] z-10 -translate-x-[50%] font-AntonRegular text-xl text-white">
          Flintovsk
        </div>
        <div
          ref={characterRef}
          style={{
            transform: `rotateY(${rotationAngle}deg)`,
            transformStyle: "preserve-3d",
          }}
          className="relative flex h-[calc(100%-3rem)] w-full"
        >
          <div className="absolute z-10 h-full w-full"></div>

          <Image
            src={characterTest}
            title="Character Test"
            alt="Character Test"
            fill={true}
            priority={true}
            className="block h-auto w-fit select-none !object-contain"
          />
        </div>
        <div className="absolute bottom-80 mt-auto flex h-12 w-full items-center justify-center gap-96">
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
        </div>
      </div>
    </section>
  );
}

export default MiddleLobby;
