import { CheckCircle, Eye, EyeClosed } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import CustomButton from '../../_Global/Commons/Buttons';
import { useState } from 'react';

function MatchVotingMenu({ props }) {
  const { roomInfo, characters, hiddenVoting, setHiddenVoting } = props;

  const [selectVoting, setSelectVoting] = useState(null);

  return (
    <>
      {!hiddenVoting && (
        <div className="fixed left-0 top-0 z-20 h-full w-full bg-black/80"></div>
      )}
      <motion.aside
        initial={{ height: '0' }}
        animate={{ height: 'fit-content' }}
        exit={{ height: '0' }}
        className={`absolute z-20 flex h-[calc(100%-48px)] w-[500px] flex-col gap-4 rounded-xl border-2 border-white/20 bg-black/20 p-4 text-white backdrop-blur-md transition-all ${
          hiddenVoting
            ? 'left-12 top-12'
            : 'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'
        }`}>
        <div className="flex flex-col rounded-lg bg-white/5 p-4">
          <p className="text-center font-KanitBold text-lg uppercase">
            Você é um{' '}
            <span className="text-blue-600">
              {'<'}NOME FUNÇÃO{'>'}
            </span>
          </p>
        </div>
        <ul className="grid grid-cols-9 gap-4 overflow-hidden">
          {[0, 1, 2].map(({}, idx) => (
            <li
              key={idx}
              onClick={() =>
                setSelectVoting(() => {
                  if (selectVoting === idx) return null;
                  return idx;
                })
              }
              className={`group relative col-span-3 flex h-48 cursor-pointer justify-center overflow-hidden rounded-lg border-2 p-4 pt-2 ${
                idx === selectVoting
                  ? 'border-green-600 bg-black/50'
                  : 'border-amber-900 bg-transparent bg-gradient-to-b from-amber-950 to-amber-800'
              }`}>
              {idx === selectVoting && (
                <CheckCircle
                  className="absolute right-1 top-1 text-green-600"
                  weight="fill"
                  size={20}
                />
              )}
              <div className="absolute left-0 top-28 h-full w-full scale-[2] drop-shadow-[4px_-2px_4px_rgba(0,0,0,.5)] transition-transform group-hover:scale-[2.2]">
                <Image
                  src={characters[idx].image}
                  alt={`Character ${idx}`}
                  priority={true}
                  fill={true}
                  className="left-0 block h-auto w-fit select-none !object-contain brightness-90"
                />
              </div>
            </li>
          ))}
        </ul>

        {selectVoting !== null && (
          <div className="mt-auto flex w-full justify-end">
            <CustomButton
              title="CONFIRMAR VOTO"
              color="amber"
              // loading={true}
            />
          </div>
        )}

        <span
          onClick={() => {
            setHiddenVoting(() => {
              if (hiddenVoting) return false;
              return true;
            });
          }}
          className="absolute -bottom-14 left-[50%] w-fit -translate-x-[50%] cursor-pointer rounded-full border border-white/10 bg-gray-400/40 p-2 text-white hover:opacity-80">
          {!hiddenVoting && <EyeClosed size={20} weight="bold" />}
          {hiddenVoting && <Eye size={20} weight="bold" />}
        </span>
      </motion.aside>
    </>
  );
}

export default MatchVotingMenu;
