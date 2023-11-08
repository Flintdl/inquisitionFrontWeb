import { useEffect, useState } from "react";
import CustomButton from "../../_Global/Commons/Buttons";
import CustomTitles from "../../_Global/Commons/Titles";
import CustomDialog from "../../_Global/Dialog";
import { ArrowFatLeft } from "@phosphor-icons/react";
import { useSocket } from "../../../../contexts/SocketContext";
import { useMessage } from "../../../../contexts/MessageContex";
import MessageContainer from "../../_Global/Messages";

function LobbyCreateMatch({ actions, soundAllowed, roomsList }) {
  const { setOpenCreateMatch } = actions;
  const {
    rooms,
    setRooms,
    roomActive,
    setRoomActive,
    usersRoom,
    setUsersRoom,
  } = roomsList;

  const { socket } = useSocket();
  const [turn, setTurn] = useState(false);
  const [count, setCount] = useState(15);

  const [friends, setFriends] = useState([]);

  const [loadingFastMatch, setLoadingFastMatch] = useState(false);
  const [loadingFriendMatch, setLoadingFriendMatch] = useState(false);

  const handleQuickMatch = () => {
    const idM = Math.random().toString(36).substr(2, 9);
    setRooms((prevState) => [...prevState, { roomID: idM }]);
    socket.emit("create_room", idM); // Emitir mensagem para o servidor para entrar em uma sala de partida rápida
    setRoomActive(idM);
    // socket.emit("start_game");
  };

  useEffect(() => {
    console.log(socket);

    socket.emit("request_users");

    socket.on("room_users", (data) => {
      setUsersRoom(data.users);
      console.log(data.users);
    });
    socket.on("insufficient_players", () => {
      console.log("insufficient_players");
    });

    socket.on("your_turn", () => {
      console.log("your_turn");
      setTurn(true);
    });
    socket.on("turn_over", () => {
      console.log("turn_over");
      setTurn(false);
    });
    socket.on("turn_info", (data) => {
      setCount(data.countdown);
      const countdownInterval = setInterval(() => {
        data.countdown--; // Decrementa o contador
        setCount(data.countdown);

        if (data.countdown <= 0) {
          clearInterval(countdownInterval); // Limpa o intervalo quando o contador chega a 0
        }
      }, 1000);
    });
    socket.on("result_users", (data) => {
      setFriends(data);
    });
  }, []);

  return (
    <>
      {!roomActive && (
        <CustomDialog
          title={`${
            loadingFriendMatch ? "Selecione seus amigos" : "Criar Sala"
          }`}
          close={setOpenCreateMatch}
          size="md"
          soundAllowed={soundAllowed}
        >
          <section>
            {!loadingFriendMatch ? (
              <>
                <CustomTitles
                  tag="h5"
                  size={12}
                  pos="left"
                  text="Você pode criar tanto uma partida com os amigos, quanto uma partida rápida, sem configurações, experimente e divirta-se da forma que você acha melhor!"
                />
                Rooms: {JSON.stringify(rooms)} <br />
                Ativo: {JSON.stringify(roomActive)}
                {/* {turn && (
                <div className="mt-3 flex items-center rounded-md border-2 bg-cyan-500 p-2">
                  <CustomTitles
                    tag="p"
                    size={18}
                    pos="center"
                    text="Sua vez"
                    customClass="!text-red-500"
                  />
                  <CustomTitles
                    tag="p"
                    size={18}
                    pos="center"
                    text={count}
                    customClass="!text-orange-500 !ml-2"
                  />
                </div>
              )}
              {!turn && (
                <CustomTitles
                  tag="p"
                  size={18}
                  pos="center"
                  text={`Turno do usuário terminando em: ${count}`}
                  customClass="!text-orange-500 !ml-2"
                />
              )} */}
                <div className="flex justify-between gap-2 pt-4">
                  <CustomButton
                    title="Jogar com amigos"
                    color="secondary"
                    outline={true}
                    loading={loadingFriendMatch}
                    action={{
                      onClick: () => setLoadingFriendMatch(!loadingFriendMatch),
                    }}
                  />
                  <CustomButton
                    title="Criar sala"
                    color="danger"
                    outline={true}
                    loading={loadingFriendMatch}
                    // action={{
                    //   onClick: () => setLoadingFriendMatch(!loadingFriendMatch),
                    // }}
                  />
                  <CustomButton
                    title="Partida rápida"
                    color="primary"
                    // loading={loadingFastMatch}
                    action={{
                      onClick: () => {
                        setLoadingFastMatch(!loadingFastMatch);
                        handleQuickMatch();
                      },
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <CustomTitles
                  tag="h5"
                  size={14}
                  pos="left"
                  text="Aqui você encontra seus amigos, clique neles para selecionar e dê pronto para iniciar a partida com o convite."
                  customClass="text-black font-KanitRegular"
                />
                <ul className="flex flex-col gap-2 py-2">
                  {friends?.map(({ id }, i) => {
                    return (
                      <li
                        key={id}
                        className="flex items-center justify-between gap-2 rounded-md bg-white/40 p-2"
                      >
                        <CustomTitles
                          tag="p"
                          size={14}
                          pos="left"
                          text={`#${i}`}
                          customClass="font-KanitBold !text-slate-700"
                        />
                        <CustomTitles
                          tag="p"
                          size={14}
                          pos="left"
                          text={id}
                          customClass="font-KanitBold !text-black"
                        />
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {loadingFriendMatch && (
              <div
                className="flex w-fit cursor-pointer items-center gap-1 transition-all hover:gap-2"
                onClick={() => setLoadingFriendMatch(false)}
              >
                <ArrowFatLeft
                  weight="duotone"
                  size={24}
                  className="text-cyan-500"
                />
                <CustomTitles
                  tag="h5"
                  size={14}
                  pos="left"
                  text="Retornar"
                  customClass="!text-cyan-500"
                />
              </div>
            )}
          </section>
        </CustomDialog>
      )}
    </>
  );
}

export default LobbyCreateMatch;
