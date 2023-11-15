import React, { useState } from 'react';

import CustomDialog from '../_Global/Dialog';
import CustomTitles from '../_Global/Commons/Titles';

function Configurations({ actions, soundAllowed }) {
  const { setOpenConfiguration } = actions;

  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [{ name: 'Exibição' }, { name: 'Sons' }, { name: 'Controles' }];

  return (
    <CustomDialog title="Configurações" close={setOpenConfiguration} size="lg">
      <section className="min-h-[190px]">
        <ul className="flex w-full select-none justify-center">
          {tabs.map(({ name }, i) => {
            return (
              <li
                key={i}
                onClick={() => setTabIndex(i)}
                className={`${
                  tabIndex === i
                    ? 'border-amber-700/10 bg-amber-900/60'
                    : 'border-white/10 backdrop-blur-sm hover:opacity-70'
                } cursor-pointer border-y px-2 py-1 first:rounded-l-lg first:border-l last:rounded-r-lg last:border-r`}>
                <CustomTitles
                  tag="p"
                  size={14}
                  pos="center"
                  text={name}
                  customClass="font-KanitBold"
                />
              </li>
            );
          })}
        </ul>
        <ul className="flex w-full select-none flex-col items-center pt-6">
          {tabIndex === 0 && (
            <>
              <li className="flex w-full items-center justify-between gap-4 whitespace-nowrap border-b border-white/10 pb-2">
                <CustomTitles
                  tag="p"
                  size={14}
                  pos="center"
                  text="Gráficos"
                  customClass="font-KanitBold uppercase !text-gray-400"
                />
                <select
                  id="countries"
                  class="block rounded-lg border border-white/20 bg-transparent px-2 py-1 font-KanitBold text-sm text-gray-400 placeholder-black backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500">
                  <option className="text-gray-700" selected value="full">
                    ALTO
                  </option>
                  <option className="text-gray-700" value="window">
                    MÉDIO
                  </option>
                  <option className="text-gray-700" value="window_full">
                    BAIXO
                  </option>
                </select>
              </li>
              <li className="flex w-full items-center justify-between gap-4 whitespace-nowrap border-b border-white/10 pb-2 pt-2">
                <CustomTitles
                  tag="p"
                  size={14}
                  pos="center"
                  text="Resoluções"
                  customClass="font-KanitBold uppercase !text-gray-400"
                />
                <select
                  id="countries"
                  class="block rounded-md border border-white/20 bg-transparent px-2 py-1 font-KanitBold text-sm text-gray-400 placeholder-black backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500">
                  <option className="text-gray-700" selected value="1920">
                    1920x1080
                  </option>
                </select>
              </li>
              <li className="flex w-full items-center justify-between gap-4 whitespace-nowrap pt-2">
                <CustomTitles
                  tag="p"
                  size={14}
                  pos="center"
                  text="Modo de Exibição"
                  customClass="font-KanitBold uppercase !text-gray-400"
                />
                <select
                  id="countries"
                  class="block rounded-md border border-white/20 bg-transparent px-2 py-1 font-KanitBold text-sm text-gray-400 placeholder-black backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500">
                  <option className="text-gray-700" selected value="full">
                    Tela Cheia
                  </option>
                  <option className="text-gray-700" value="window">
                    Janela
                  </option>
                  <option className="text-gray-700" value="window_full">
                    Janela em tela cheia
                  </option>
                </select>
              </li>
            </>
          )}
          {tabIndex === 1 && (
            <li className="flex w-full p-2 first:rounded-l-md last:rounded-r-md">
              <CustomTitles
                tag="p"
                size={14}
                pos="center"
                text="Teste Sons"
                customClass="font-KanitBold"
              />
            </li>
          )}
        </ul>
      </section>
    </CustomDialog>
  );
}

export default Configurations;
