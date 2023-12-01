import { ArrowFatLeft, List } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import CustomTitles from '../../_Global/Commons/Titles';

function MatchLeftMenu({ props }) {
  const { socket, roomInfo, openInfoMenu, setOpenInfoMenu } = props;
  return (
    <motion.aside
      initial={{ x: '-130%' }}
      animate={{ x: '0px' }}
      exit={{ x: '-130%' }}
      className="fixed left-6 top-6 z-30 flex h-[calc(100%-48px)] w-[400px] flex-col gap-4 rounded-lg border-2 border-black/40 bg-black/40 p-4 text-white backdrop-blur-lg">
      <p
        onClick={() => setOpenInfoMenu(!openInfoMenu)}
        className="text-md absolute -right-16 top-0 w-fit cursor-pointer rounded-lg border-2 border-black/40 bg-black/40 p-2 text-center font-AntonRegular backdrop-blur-md hover:opacity-70">
        <List size={24} weight="bold" />
      </p>
      <nav className="flex w-full items-center justify-between gap-2 rounded-md bg-slate-800 p-2">
        <div
          className="flex w-fit cursor-pointer items-center gap-1 transition-all hover:gap-2"
          onClick={() => {
            socket.emit('leave_room', {
              roomName: roomInfo.roomID,
              user: socket.id,
            });
          }}>
          <ArrowFatLeft weight="duotone" size={24} className="text-cyan-500" />
          <CustomTitles
            tag="h5"
            size={14}
            pos="left"
            text="Sair da Sala"
            customClass="!text-cyan-500"
          />
        </div>
      </nav>
      <ul className="grid grid-cols-12 gap-2">
        {roomInfo?.users?.map(({ id }, i) => {
          return (
            <li
              key={i}
              className="col-span-12 flex flex-grow flex-col gap-1 rounded-md border-2 border-slate-500/50 bg-slate-800/50 p-1 text-green-500">
              <p className="font-KanitRegular text-sm text-gray-300">
                Usuário: {id}
              </p>
            </li>
          );
        })}
      </ul>
      {/* <Menu */}
    </motion.aside>
  );
}

export default MatchLeftMenu;
