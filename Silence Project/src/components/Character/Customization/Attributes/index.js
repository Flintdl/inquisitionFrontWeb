import { Info } from '@phosphor-icons/react';
import React from 'react';

import CustomTitles from '../../../_Global/Commons/Titles';
import CharacterChart from '../../../Charts';

function CustomizationRightBar({ props }) {
  const { personsTest, pos, characterAttributes } = props;

  return (
    <nav className="hidden h-full w-auto flex-1 p-4 lg:flex">
      <ul className="flex h-full w-full flex-col gap-2 rounded-xl border-2 border-white/10 p-2 backdrop-blur-lg">
        <li className="flex items-center gap-2 p-1">
          <Info size={24} weight="fill" className="text-gray-300" />
          <CustomTitles
            tag="p"
            size={18}
            pos="center"
            text="Atributos"
            customClass="!text-gray-300 font-Kanit"
          />
        </li>
        <li className="flex h-[calc(100%-38px)] flex-col gap-2 overflow-y-auto p-1 scrollbar-thin scrollbar-track-gray-900/40 scrollbar-thumb-gray-500/40">
          <div className="flex max-h-[300px] justify-center">
            <CharacterChart attributes={personsTest[pos].attributes} />
          </div>

          <div className="flex flex-col gap-2">
            {personsTest[pos].info.attributes.map(
              ({ name, tier, description }, i) => (
                <React.Fragment key={i}>
                  <CustomTitles
                    tag="p"
                    size={18}
                    pos="left"
                    text={name}
                    customClass="!text-cyan-400 font-KanitRegular"
                  />
                  <CustomTitles
                    tag="p"
                    size={12}
                    pos="left"
                    text={`Classificação: ${tier}`}
                    customClass="!text-yellow-400 font-KanitRegular"
                  />
                  <CustomTitles
                    tag="p"
                    size={14}
                    pos="left"
                    text={description}
                    customClass="!text-gray-300 font-Kanit"
                  />
                </React.Fragment>
              ),
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default CustomizationRightBar;
