import { Info } from '@phosphor-icons/react';
import React from 'react';

import CustomTitles from '../../../_Global/Commons/Titles';
import { AnimatePresence, motion } from 'framer-motion';

function CustomizationLeftBar({ props }) {
  const { personsTest, pos } = props;

  return (
    <nav className="hidden h-full w-auto flex-1 p-4 lg:flex">
      <ul className="flex h-full w-full flex-col gap-2 rounded-xl border-2 border-white/10 p-2 backdrop-blur-lg">
        <li className="flex items-center gap-2 p-1">
          <Info size={24} weight="fill" className="text-gray-300" />
          <CustomTitles
            tag="p"
            size={18}
            pos="center"
            text={`Informações sobre ${personsTest[pos].name}`}
            customClass="!text-gray-300 font-Kanit"
          />
        </li>
        <li className="flex items-center gap-2 p-1">
          <CustomTitles
            tag="p"
            size={18}
            pos="center"
            text={`Nome: ${personsTest[pos].info.name}`}
            customClass="!text-gray-300 font-Kanit"
          />
        </li>
        <li className="flex h-full gap-2 overflow-y-auto p-1 scrollbar-thin scrollbar-track-gray-900/40 scrollbar-thumb-gray-500/40">
          <div className="flex h-full flex-col gap-4">
            <AnimatePresence>
              {personsTest[pos].info.biography.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <CustomTitles
                    tag="p"
                    size={14}
                    pos="left"
                    text={item}
                    customClass="!text-gray-300 font-Kanit"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default CustomizationLeftBar;
