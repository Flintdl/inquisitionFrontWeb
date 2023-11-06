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

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [openServerFind, setOpenServerFind] = useState(false);
  const [openCreateMatch, setOpenCreateMatch] = useState(false);

  const { socket, setSocket } = useSocket();
  const { messages, setMessages } = useMessage();

  const socketInitializer = async () => {
    await fetch("/api");
    let sk = io("ws://localhost:3000", {
      transports: ["websocket"],
    });

    setSocket(sk);

    sk.on("connect", () => {
      console.log("connected");
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
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ContentLobby>
      <MenuLobby />
      <MiddleLobby actions={{ setOpenServerFind, setOpenCreateMatch }} />
      <FooterLobby />
      <>{openServerFind && <ListServer actions={{ setOpenServerFind }} />}</>
      <>
        {openCreateMatch && (
          <LobbyCreateMatch actions={{ setOpenCreateMatch }} />
        )}
      </>
      <>
        {messages.length > 0 && (
          <MessageContainer messages={messages} setMessages={setMessages} />
        )}
      </>
    </ContentLobby>
  );
}
