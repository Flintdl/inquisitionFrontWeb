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

export default function HomePage() {
  const { soundAllowed, setSoundAllowed } = useSoundAllowed();
  const [themeMusicLobby, setThemeMusicLobby] = useState(null);
  const [themeMusicLobbyPaused, setThemeMusicLobbyPaused] = useState(true);

  const [loading, setLoading] = useState(true);

  const [openServerFind, setOpenServerFind] = useState(false);
  const [openCreateMatch, setOpenCreateMatch] = useState(false);
  const [openAcceptSound, setOpenAcceptSound] = useState(true);

  const [bgLobby, setBgLobby] = useState("bg-lobby");

  const { socket, setSocket } = useSocket();
  const { messages, setMessages } = useMessage();

  const socketInitializer = async () => {
    await fetch("/api");
    let sk = io("ws://192.168.33.118:3000", {
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
    });
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Pausa o som quando a página é minimizada
      themeMusicLobby.pause();
    } else {
      if (themeMusicLobbyPaused) {
        // Continua o som quando a página é restaurada
        themeMusicLobby.play();
        themeMusicLobby.loop = true;
      }
    }
  };

  useEffect(() => {
    if (themeMusicLobby === null)
      setThemeMusicLobby(new Audio("/sounds/theme-music-lobby.mp3"));
    socketInitializer();

    if (soundAllowed === "allowed" && themeMusicLobbyPaused) {
      themeMusicLobby.play();
      themeMusicLobby.loop = true;
    } else if (themeMusicLobby !== null) {
      themeMusicLobby.pause();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Remove o event listener quando o componente é desmontado
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [soundAllowed, themeMusicLobby, themeMusicLobbyPaused]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ContentLobby bgLobby={bgLobby}>
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
        {openServerFind && <ListServer actions={{ setOpenServerFind }} />}
        {openCreateMatch && (
          <LobbyCreateMatch actions={{ setOpenCreateMatch }} />
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
      </>
    </ContentLobby>
  );
}
