import { List } from '@phosphor-icons/react';

import CustomButton from '../../_Global/Commons/Buttons';

function MatchInfoRounds({ props, actions }) {
  const { socket, roomInfo, youTurn, turnInfo, transitionDay } = props;
  const { startGame, openInfoMenu, setOpenInfoMenu } = actions;

  return (
    <div className="absolute left-12 top-12 flex items-center gap-6">
      <div className="flex gap-4">
        <p
          onClick={() => setOpenInfoMenu(!openInfoMenu)}
          className="text-md w-fit cursor-pointer rounded-lg border-2 border-white/20 p-2 text-center font-AntonRegular backdrop-blur-md hover:opacity-70">
          <List size={24} weight="bold" />
        </p>
        <p className="flex items-center rounded-lg border-2 border-white/20 p-2 text-center font-AntonRegular text-sm uppercase italic backdrop-blur-md">
          HOST: {roomInfo.hostID}
        </p>
      </div>
      <p className="text-md rounded-lg border-2 border-white/20 px-3 py-2 text-center font-AntonRegular uppercase italic backdrop-blur-md">
        {roomInfo.startGame
          ? turnInfo.isDay
            ? youTurn && transitionDay === 0
              ? `Termina a votação de todos em ${turnInfo.countdown}`
              : `Está amanhecendo em ${transitionDay}`
            : transitionDay === 0
            ? youTurn
              ? `Sua vez de votar termina em ${turnInfo.countdown}`
              : 'Espere sua vez'
            : `Está anoitecendo em ${transitionDay}`
          : 'Esperando o Host'}
      </p>

      {!roomInfo.startGame && roomInfo.hostID === socket.id && (
        <CustomButton
          title="INICIAR O JOGO"
          color="danger"
          action={{ onClick: () => startGame() }}
        />
      )}
    </div>
  );
}

export default MatchInfoRounds;
