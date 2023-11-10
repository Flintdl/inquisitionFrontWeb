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
import { ArrowFatLeft, Cat, EyeClosed, Magnet } from "@phosphor-icons/react";
import image04 from "../public/images/lobby_backgrounds/background_initial_page_option_03.png";
import characterTest from "../public/images/character_vampire_01.png";

import Image from "next/image";

export default function HomePage() {
  const { soundAllowed, setSoundAllowed } = useSoundAllowed();

  const [loading, setLoading] = useState(true);

  const [messagesRoom, setMessagesRoom] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const [rooms, setRooms] = useState([]);
  const [roomActive, setRoomActive] = useState(null);
  const [usersRoom, setUsersRoom] = useState([]);
  const [characters, setCharacters] = useState([]);

  const [openServerFind, setOpenServerFind] = useState(false);
  const [openCreateMatch, setOpenCreateMatch] = useState(false);
  const [openAcceptSound, setOpenAcceptSound] = useState(true);

  const [bgLobby, setBgLobby] = useState(3);

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

      sk.on("room_users", (data) => {
        setUsersRoom(data.users);
        console.log(data.users);
      });

      sk.on("room_users_teste", (data) => {
        alert(data.message);
      });

      sk.on("received_message", (data) => {
        setMessagesRoom((prevState) => [
          ...prevState,
          { id: data.id, message: data.message },
        ]);
      });
    });
  };

  const sendMessage = () => {
    socket.emit("write_message", {
      roomName: roomActive,
      id: socket.id,
      messageInput,
    });
    setMessageInput("");
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const [characterPositions, setCharacterPositions] = useState([]);

  useEffect(() => {
    const numberOfPositions = 6;
    const containerWidth = 1080;
    const containerHeight = 300;

    const positionsArray = Array.from({ length: numberOfPositions }, (_, i) => {
      const x = Math.random() * (containerWidth - 100); // Subtraindo 100 para garantir que o personagem não ultrapasse a borda direita
      const y = Math.random() * (containerHeight - 100); // Subtraindo 100 para garantir que o personagem não ultrapasse a borda inferior
      return { x, y };
    });

    setCharacterPositions(positionsArray);
  }, []);

  const getRandomPosition = () => {
    const randomIndex = Math.floor(Math.random() * characterPositions.length);
    return characterPositions[randomIndex];
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ContentLobby bgLobby={bgLobby}>
      <MenuLobby setBgLobby={setBgLobby} soundAllowed={soundAllowed} />
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
            <MatchContent>
              {/* <MatchLeftMenu
                props={{
                  socket,
                  setRoomActive,
                  roomActive,
                  usersRoom,
                  messageInput,
                  setMessageInput,
                  sendMessage,
                  messagesRoom,
                }}
              /> */}
              <section className="flex h-full w-full gap-4">
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-md bg-black p-4 font-Kanit text-white">
                  <Image
                    src={image04}
                    title="Character Test"
                    alt={`Character match`}
                    fill={true}
                    priority={true}
                    className="block h-auto w-full select-none !object-cover"
                  />
                  <ul
                    style={{
                      position: "relative",
                      width: "1080px",
                      height: "300px",
                    }}
                    className="z-10 flex h-full items-end justify-center pb-32"
                  >
                    {characterPositions.map((position, i) => {
                      return (
                        <li
                          key={i}
                          className="relative flex h-[250px] w-[170px] flex-col items-center justify-center gap-1 p-1"
                          style={{
                            position: "absolute",
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                          }}
                        >
                          {/* <p className="font-KanitBold text-sm text-white">
                            {id}
                          </p> */}
                          <div
                            className="relative h-full w-full"
                            style={{ transform: `translateY(${i}%)` }}
                          >
                            <Image
                              src={characterTest}
                              title="Character Test"
                              alt="Character Test"
                              fill={true}
                              priority={true}
                              className="block h-auto w-fit select-none !object-contain xl:!object-cover"
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
              <aside className="w-12 rounded-md bg-slate-900">a</aside>
            </MatchContent>
          </CustomDialog>
        )}
      </>
    </ContentLobby>
  );
}

const MatchContent = ({ children }) => {
  return (
    <section className="flex h-full gap-4">
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </section>
  );
};

const MatchLeftMenu = ({ props }) => {
  const {
    socket,
    setRoomActive,
    roomActive,
    usersRoom,
    messageInput,
    setMessageInput,
    sendMessage,
    messagesRoom,
  } = props;
  return (
    <aside className="col-span-3 flex h-full flex-col gap-4">
      <nav className="flex w-full items-center justify-between gap-2 rounded-md bg-slate-800 p-2">
        <div
          className="flex w-fit cursor-pointer items-center gap-1 transition-all hover:gap-2"
          onClick={() => {
            socket.emit("leave_room", roomActive);
            setRoomActive(null);
          }}
        >
          <ArrowFatLeft weight="duotone" size={24} className="text-cyan-500" />
          <CustomTitles
            tag="h5"
            size={14}
            pos="left"
            text="Sair da Sala"
            customClass="!text-cyan-500"
          />
        </div>
        <div
          className="flex w-fit cursor-pointer items-center gap-1 transition-all hover:gap-2"
          onClick={() => {
            socket.emit("teste_sala", roomActive);
          }}
        >
          <CustomTitles
            tag="h5"
            size={14}
            pos="left"
            text="Sinal to na sala"
            customClass="!text-red-500"
          />
        </div>
      </nav>
      <ul className="grid grid-cols-12 gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          return (
            <li
              key={i}
              className="col-span-2 flex flex-col items-center justify-center gap-1 rounded-md border-2 border-slate-500/50 bg-slate-800/50 p-1 text-green-500"
            >
              {i !== 11 && i !== 9 && <Cat size={24} weight="fill" />}

              <p className="font-KanitRegular text-sm text-gray-300">
                {i !== 11 && i !== 9 ? "Vampiro" : "?"}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="flex h-full gap-2">
        {/* <CustomTitles
          tag="h5"
          size={14}
          pos="left"
          text="Usuários na sala"
          customClass="!text-green-500"
        /> */}
        {/* <ul className="flex max-h-[150px] min-h-[150px] flex-col">
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
        </ul> */}

        {/* <div className="relative flex h-full w-full flex-col gap-4 rounded-md bg-slate-800 p-2">
          <ul className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900 absolute flex h-[calc(100%-84px)] w-[calc(100%-16px)] flex-col overflow-auto rounded-md bg-slate-900 p-2 font-Kanit text-white">
            {messagesRoom?.map(({ id, message }, i) => {
              return (
                <li key={i} className="flex flex-col">
                  <p className="font-KanitBold text-purple-500">{id} (mudo)</p>
                  <p>{message}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex gap-2 rounded-md bg-slate-600 p-2">
            <input
              value={messageInput}
              placeholder="Digite a sua mensagem"
              className="w-full rounded-md border-2 border-cyan-500 px-2 font-KanitBold text-cyan-500"
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <CustomButton
              title="Enviar"
              color="primary"
              action={{
                onClick: () => {
                  sendMessage();
                },
              }}
            />
          </div>
        </div> */}
      </div>
    </aside>
  );
};
