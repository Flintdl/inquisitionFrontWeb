import { ArrowFatLineLeft, ArrowFatLineRight } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

function CustomizationExhibition({ props, actions }) {
  const { personsTest, pos, direction } = props;
  const { navigateBackward, navigateForward } = actions;

  return (
    <section className="mx-auto mt-auto flex h-full w-fit select-none items-end">
      <div className="flex items-center justify-center gap-4">
        <div
          onClick={navigateBackward}
          className="flex h-fit cursor-pointer items-center justify-center rounded-lg border-2 bg-black/60 p-1 hover:opacity-80">
          <ArrowFatLineLeft size={32} weight="fill" className="text-white" />
        </div>
        <AnimatePresence>
          <ul className="">
            {personsTest.map(({ name, image }, i) => {
              return i === pos ? (
                <motion.div
                  key={i}
                  initial={{ x: direction ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction ? -300 : 300, opacity: 0 }}
                  className="relative mx-auto flex overflow-hidden pb-12 pt-12">
                  {/* <div className="absolute left-[50%] top-0 z-10 -translate-x-[50%] rounded-md border-2 bg-black px-4 py-1 font-AntonRegular text-xl text-white">
                        {name}
                      </div> */}
                  <div className="absolute z-10 h-full w-full"></div>
                  <Image
                    src={image}
                    title={name}
                    alt={name}
                    width={500}
                    height={600}
                    // fill={true}
                    priority={true}
                    className="block select-none drop-shadow-[0_35px_35px_rgba(0,0,0,1)] xl:!object-cover"
                  />
                </motion.div>
              ) : null;
            })}
          </ul>
        </AnimatePresence>
        <div
          onClick={navigateForward}
          className="flex h-fit cursor-pointer items-center justify-center rounded-lg border-2 bg-black/60 p-1 hover:opacity-80">
          <ArrowFatLineRight size={32} weight="fill" className="text-white" />
        </div>
      </div>
    </section>
  );
}

export default CustomizationExhibition;
