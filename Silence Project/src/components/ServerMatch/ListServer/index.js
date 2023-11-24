import { MagnifyingGlass } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import CustomDialog from '../../_Global/Dialog';
import CustomButton from '../../_Global/Commons/Buttons';
import { useRouter } from 'next/router';
import CustomTitles from '../../_Global/Commons/Titles';

function ListServer({ actions, soundAllowed, roomsList, socket }) {
  const { setOpenServerFind } = actions;
  const { roomActive, setRoomActive } = roomsList;

  const [timeOut, setTimeOut] = useState(false);
  const [rooms, setRooms] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const newRoomHandler = (data) => {
      setRooms((prevState) => [...prevState, { room: data }]);
    };

    const requestRooms = (data, rooms) => {
      console.log('foi request');

      if (Array.isArray(data)) {
        data.forEach((newRoom) => {
          const findIndex = rooms.findIndex(
            (item) => item.roomID === newRoom.roomID,
          );

          console.log(findIndex);

          if (findIndex !== -1) {
            console.log('find array');
            // Se a sala já existe, atualize a sala específica
            setRooms((prevState) => {
              const updatedRooms = [...prevState];
              updatedRooms[findIndex] = {
                ...updatedRooms[findIndex],
                users: newRoom.users,
              };
              return updatedRooms;
            });
          } else {
            console.log('else array');
            console.log(newRoom);
            // Se a sala não existe, adicione uma nova sala ao estado
            setRooms((prevState) => [...prevState, newRoom]);
          }
        });
      } else {
        console.log('not array');
        console.log(rooms);
        console.log(data);

        // Movendo a lógica do findIndex para fora do setRooms
        const findIndex = rooms.findIndex(
          (item) => item.roomID === data.roomID,
        );

        console.log(findIndex);

        if (findIndex !== -1) {
          console.log('find not array');
          // Se a sala já existe, atualize a sala específica
          setRooms((prevState) => {
            const updatedRooms = [...prevState];
            updatedRooms[findIndex] = {
              ...updatedRooms[findIndex],
              users: data.users,
            };
            return updatedRooms;
          });
        } else {
          console.log('else not array');
          console.log(data);
          // Se a sala não existe, adicione uma nova sala ao estado
          setRooms((prevState) => [...prevState, data]);
        }
      }
    };

    if (rooms.length <= 0) socket.emit('request_all_servers');

    socket.on('result_all_servers', (data) => {
      // console.log(rooms);
      // requestRooms(data, rooms);
      setRooms(data);
    });
    socket.on('new_room', newRoomHandler);

    // socket.off('result_all_servers', requestRooms);
    socket.off('new_room', newRoomHandler);

    if (rooms.length <= 0)
      setTimeout(() => {
        setTimeOut(true);
      }, 5000);
  }, []);

  return (
    <CustomDialog
      title="Encontrar Servidor"
      close={setOpenServerFind}
      soundAllowed={soundAllowed}>
      <>
        {rooms.length > 1 && (
          <div className="relative">
            <input
              className="rounded-tg mb-2 h-11 w-full appearance-none rounded-lg border-2 border-gray-300 border-transparent bg-gray-300/50 p-3 pr-12 font-KanitRegular text-sm text-white placeholder-white focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Procurar um servidor"
              autoFocus
            />
            <MagnifyingGlass
              weight="fill"
              size={24}
              className="absolute right-3 top-3 text-white"
            />
          </div>
        )}
      </>
      <ul className="flex w-full flex-col gap-3">
        {rooms.length > 0 ? (
          rooms.map(({ roomID, users, maxUsers, name, favorite, match }, i) => {
            // const { quantity, max, privateMatch } = match;
            return (
              <ServerList
                key={i}
                props={{
                  roomID,
                  users,
                  maxUsers,
                  router,
                  setRoomActive,
                  socket,
                  // , name, favorite, quantity, max, privateMatch
                }}
              />
            );
          })
        ) : (
          <>
            {!timeOut && <Loading />}
            {timeOut && (
              <CustomTitles
                tag="p"
                size={14}
                pos="center"
                text="Nenhum servidor encontrado"
                customClass="font-KanitRegular"
              />
            )}
          </>
        )}
        {/* {servers.length > 0 && <ShowMore />} */}
      </ul>
    </CustomDialog>
  );
}

const ServerList = ({ props }) => {
  const {
    roomID,
    users,
    maxUsers,
    router,
    setRoomActive,
    socket,
    // name, favorite, quantity, max, privateMatch
  } = props;
  return (
    <li
      // key={id}
      onClick={() => {
        // socket.emit("join_room", roomID); // Emitir mensagem para o servidor para entrar em uma sala de partida rápida
        router.push(`/match-fast-game/${roomID}`);
      }}
      className="flex cursor-pointer items-center justify-between rounded-md border border-gray-300/30 bg-gradient-to-r from-gray-200/30 to-gray-100/30 p-2 font-AntonRegular text-gray-600">
      <div className="flex items-center gap-2">
        {/* <p className="mt-1 text-sm text-cyan-600">ID: {id}</p> */}
        {/* <Star
          size={18}
          weight={favorite ? "fill" : "duotone"}
          className={`${favorite ? "text-yellow-500" : "text-white"}`}
        /> */}
        <p className="text-white">{roomID}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="mt-1 text-sm text-gray-300">
          {/* <span className="text-white">{quantity || "0"}</span>/
          <span className="text-gray-300">{max || "10"}</span> */}
          <span className="text-white">{users.length}</span>/
          <span className="text-gray-300">{maxUsers}</span>
        </p>
        {/* <p>
          {privateMatch && privateMatch ? (
            <Lock weight="fill" size={20} className="text-red-500" />
          ) : (
            <LockKeyOpen weight="fill" size={20} className="text-green-500" />
          )}
        </p> */}
      </div>
    </li>
  );
};

const Loading = () => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <p className="animate-pulse font-AntonRegular text-white">
        Carregando...
      </p>
    </div>
  );
};

const ShowMore = () => {
  const [loading, setLoading] = useState(false);
  return (
    <li className="mx-auto flex">
      <CustomButton
        title="Mostrar mais"
        color="primary"
        outline={true}
        loading={loading}
        action={{ onClick: () => setLoading(!loading) }}
      />
    </li>
  );
};

export default ListServer;
