import { useEffect, useState } from "react";
import io from "socket.io-client";
import ContentLobby from "../src/components/Lobby/Content";
import MenuLobby from "../src/components/Lobby/Menu";
import MiddleLobby from "../src/components/Lobby/Middle";
import Loading from "../src/components/_Global/Loading";
import ListServer from "../src/components/ServerMatch/ListServer";
import FooterLobby from "../src/components/Lobby/Footer";
import LobbyCreateMatch from "../src/components/ServerMatch/CreateMatch";
import { useSocket } from "../contexts/SocketContext";
import { useMessage } from "../contexts/MessageContex";
import MessageContainer from "../src/components/_Global/Messages";
import CustomDialog from "../src/components/_Global/Dialog";
import CustomButton from "../src/components/_Global/Commons/Buttons";
import CustomTitles from "../src/components/_Global/Commons/Titles";
import { useSoundAllowed } from "../contexts/SoundContext";
import LobbyThemeMusic from "../src/components/Lobby/Sound/theme";
import { ArrowFatLeft } from "@phosphor-icons/react";

export default function HomePage() {
  const { soundAllowed, setSoundAllowed } = useSoundAllowed();
  const [themeMusicLobby, setThemeMusicLobby] = useState(null);
  const [themeMusicLobbyPaused, setThemeMusicLobbyPaused] = useState(true);

  const [loading, setLoading] = useState(true);

  const [rooms, setRooms] = useState([]);
  const [roomActive, setRoomActive] = useState(null);
  const [usersRoom, setUsersRoom] = useState([]);

  const [openServerFind, setOpenServerFind] = useState(false);
  const [openCreateMatch, setOpenCreateMatch] = useState(false);
  const [openAcceptSound, setOpenAcceptSound] = useState(true);

  const [bgLobby, setBgLobby] = useState(0);

  const { socket, setSocket } = useSocket();
  const { messages, setMessages } = useMessage();

  const socketInitializer = async () => {
    await fetch("/api");
    let sk = io("ws://localhost:3000", {
      transports: ["websocket"],
    });

    setSocket(sk);

    sk.on("connect", () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      // sk.on("result_users", (data) => {
      //   const idM = Math.random().toString(36).substr(2, 9);

      //   setMessages((prevState) => [
      //     ...prevState,
      //     {
      //       id: idM,
      //       type: "success",
      //       description: `O usuário ${data[data.length - 1]} entrou`,
      //     },
      //   ]);
      // });

      sk.on("new_room", (data) => {
        setRooms((prevState) => [...prevState, { roomID: data.roomName }]);
        console.log("novo server");
      });
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ContentLobby bgLobby={bgLobby}>
      <LobbyThemeMusic
        props={{
          soundAllowed,
          themeMusicLobby,
          themeMusicLobbyPaused,
          setThemeMusicLobby,
          url: "/sounds/theme-music-lobby.mp3",
        }}
      />
      <MenuLobby
        setBgLobby={setBgLobby}
        lobbyThemeMusic={{ themeMusicLobbyPaused, setThemeMusicLobbyPaused }}
      />
      <MiddleLobby
        actions={{ setOpenServerFind, setOpenCreateMatch }}
        permissions={{ soundAllowed }}
      />
      <FooterLobby />
      <>
        {openServerFind && (
          <ListServer
            actions={{ setOpenServerFind }}
            soundAllowed={soundAllowed}
            roomsList={{ rooms, setRooms, roomActive, setRoomActive }}
            socket={socket}
          />
        )}
        {openCreateMatch && (
          <LobbyCreateMatch
            actions={{ setOpenCreateMatch }}
            soundAllowed={soundAllowed}
            roomsList={{
              rooms,
              setRooms,
              roomActive,
              setRoomActive,
              usersRoom,
              setUsersRoom,
            }}
          />
        )}
        {messages.length > 0 && (
          <MessageContainer messages={messages} setMessages={setMessages} />
        )}
        {openAcceptSound && (
          <CustomDialog
            title="Deseja melhorar a experiencia?"
            close={setOpenAcceptSound}
            buttonClose={false}
            size="sm"
          >
            <CustomTitles
              tag="p"
              size={14}
              pos="center"
              text="Aceite a permissão de executarmos sons, para melhorar a sua experiencia e vivencia-la 100% enquanto joga."
              customClass="font-KanitRegular"
            />
            <section className="flex items-center justify-center gap-2">
              <CustomButton
                title="Recusar"
                color="danger"
                outline={true}
                action={{
                  onClick: () => {
                    setSoundAllowed("not-allowed");
                    setOpenAcceptSound(false);
                  },
                }}
              />
              <CustomButton
                title="Aceitar"
                color="primary"
                action={{
                  onClick: () => {
                    setSoundAllowed("allowed");
                    setOpenAcceptSound(false);
                  },
                }}
              />
            </section>
          </CustomDialog>
        )}
        {roomActive && (
          <CustomDialog
            title={`Sala: ${roomActive}`}
            close={setOpenCreateMatch}
            size="full"
            soundAllowed={soundAllowed}
          >
            <nav className="flex w-full items-center gap-2 rounded-md bg-black p-1">
              <div
                className="flex w-fit cursor-pointer items-center gap-1 transition-all hover:gap-2"
                onClick={() => setRoomActive(null)}
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
                  text="Sair da Sala"
                  customClass="!text-cyan-500"
                />
              </div>
            </nav>
            <CustomTitles
              tag="h5"
              size={14}
              pos="left"
              text="Usuários na sala"
              customClass="!text-green-500"
            />
            <section className="flex h-full gap-4">
              <ul className="flex w-fit flex-col rounded-md bg-black p-4">
                {usersRoom?.map(({ id }) => {
                  return (
                    <li key={id}>
                      <CustomTitles
                        tag="p"
                        size={14}
                        pos="left"
                        text={`ID: ${id}`}
                        customClass="!text-white font-KanitRegular"
                      />
                    </li>
                  );
                })}
              </ul>
              <div className="h-full w-full rounded-md bg-slate-900 p-4 font-Kanit text-white">
                a
              </div>
            </section>
          </CustomDialog>
        )}
      </>
    </ContentLobby>
  );
}
