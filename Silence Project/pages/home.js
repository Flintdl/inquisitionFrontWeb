import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ContentLobby from '../src/components/Lobby/Content';
import MenuLobby from '../src/components/Lobby/Menu';
import MiddleLobby from '../src/components/Lobby/Middle';
import Loading from '../src/components/_Global/Loading';
import ListServer from '../src/components/ServerMatch/ListServer';
import FooterLobby from '../src/components/Lobby/Footer';
import LobbyCreateMatch from '../src/components/ServerMatch/CreateMatch';
import { useSocket } from '../contexts/SocketContext';
import { useMessage } from '../contexts/MessageContex';
import MessageContainer from '../src/components/_Global/Messages';
import CustomDialog from '../src/components/_Global/Dialog';
import CustomButton from '../src/components/_Global/Commons/Buttons';
import CustomTitles from '../src/components/_Global/Commons/Titles';
import { useSoundAllowed } from '../contexts/SoundContext';
import CharacterCustomization from '../src/components/Character/Customization';
import Configurations from '../src/components/Configurations';
import { useConfiguration } from '../contexts/ConfigurationContext';
import CharacterChart from '../src/components/Charts';
import Head from 'next/head';

export default function HomePage() {
  const { soundAllowed, setSoundAllowed } = useSoundAllowed();
  const { configuration, setConfiguration } = useConfiguration();

  const [loading, setLoading] = useState(true);

  const [messagesRoom, setMessagesRoom] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  // Character

  const [openCharacterCustomization, setOpenCharacterCustomization] =
    useState(false);

  const [openConfiguration, setOpenConfiguration] = useState(false);

  // Character

  const [roomActive, setRoomActive] = useState(null);
  const [usersRoom, setUsersRoom] = useState([]);
  const [characters, setCharacters] = useState([]);

  const [openServerFind, setOpenServerFind] = useState(false);
  const [openCreateMatch, setOpenCreateMatch] = useState(false);
  const [openAcceptSound, setOpenAcceptSound] = useState(true);

  const [bgLobby, setBgLobby] = useState(4);

  const { socket, setSocket } = useSocket();
  const { messages, setMessages } = useMessage();

  const socketInitializer = async () => {
    var sk = socket;

    if (!sk) {
      sk = io('ws://localhost:3001', {
        transports: ['websocket'],
      });

      setSocket(sk);

      sk.on('connect', () => {
        setLoading(false);
      });
    }

    console.log(sk);

    if (sk) setLoading(false);

    const roomUsersHandler = (data) => {
      setUsersRoom(data.users);
    };

    const roomUsersTesteHandler = (data) => {
      alert(data.message);
    };

    const receivedMessageHandler = (data) => {
      setMessagesRoom((prevState) => [
        ...prevState,
        { id: data.id, message: data.message },
      ]);
    };

    // Add event listeners

    sk.on('room_users', roomUsersHandler);
    sk.on('room_users_teste', roomUsersTesteHandler);
    sk.on('received_message', receivedMessageHandler);

    // To remove listeners when they are no longer needed
    sk.off('room_users', roomUsersHandler);
    sk.off('room_users_teste', roomUsersTesteHandler);
    sk.off('received_message', receivedMessageHandler);
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ContentLobby bgLobby={bgLobby} configuration={configuration}>
      <Head>
        <title>SL | Home Page</title>
      </Head>
      <MenuLobby setBgLobby={setBgLobby} soundAllowed={soundAllowed} />
      <MiddleLobby
        actions={{
          setOpenServerFind,
          setOpenCreateMatch,
          setOpenCharacterCustomization,
          setOpenConfiguration,
        }}
        permissions={{ soundAllowed }}
        configuration={configuration}
      />
      <>
        {openServerFind && (
          <ListServer
            actions={{ setOpenServerFind }}
            soundAllowed={soundAllowed}
            roomsList={{ roomActive, setRoomActive }}
            socket={socket}
          />
        )}
        {openCreateMatch && (
          <LobbyCreateMatch
            actions={{ setOpenCreateMatch }}
            soundAllowed={soundAllowed}
            roomsList={{
              roomActive,
              setRoomActive,
              usersRoom,
              setUsersRoom,
            }}
          />
        )}
        {soundAllowed === 'not-allowed' && openAcceptSound && (
          <CustomDialog
            title="Deseja melhorar a experiencia?"
            close={setOpenAcceptSound}
            buttonClose={false}
            size="sm">
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
                    setSoundAllowed('not-allowed');
                    setOpenAcceptSound(false);
                  },
                }}
              />
              <CustomButton
                title="Aceitar"
                color="primary"
                action={{
                  onClick: () => {
                    setSoundAllowed('allowed');
                    setOpenAcceptSound(false);
                  },
                }}
              />
            </section>
          </CustomDialog>
        )}
        {openCharacterCustomization && (
          <CharacterCustomization
            actions={{ setOpenCharacterCustomization }}
            soundAllowed={soundAllowed}
          />
        )}
        {openConfiguration && (
          <Configurations
            actions={{ setOpenConfiguration }}
            soundAllowed={soundAllowed}
            configurationObj={{ configuration, setConfiguration }}
          />
        )}
      </>
      <FooterLobby />
    </ContentLobby>
  );
}
