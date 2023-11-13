import Image from 'next/image';
import image04 from '../../public/images/match_backgrounds/background_match_option_01.png';
import characterTest from '../../public/images/character_vampire_01.png';
import { useEffect, useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import { io } from 'socket.io-client';
import Loading from '../../src/components/_Global/Loading';

function MatchFastGame({ id }) {
  const { socket, setSocket } = useSocket();
  const [loading, setLoading] = useState(true);

  const socketInitializer = async () => {
    await fetch('/api');
    let sk = io('ws://localhost:3000', {
      transports: ['websocket'],
    });

    setSocket(sk);

    sk.on('connect', () => {
      setLoading(false);
    });

    sk.on('room_users', (data) => {
      console.log(data.users);
    });
    sk.emit('join_room', id);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket) {
        socket.emit('leave_room', id);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    if (socket) {
      socket.on('room_users', (data) => {
        console.log(data.users);
      });
      socket.emit('join_room', id);
      setLoading(false);
    } else {
      socketInitializer();
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [socket, id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
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
          <div className="relative flex h-full w-full flex-col overflow-hidden p-4 font-Kanit text-white">
            <Image
              src={image04}
              title="Character Test"
              alt={`Character match`}
              quality={100}
              fill={true}
              priority={true}
              className="block h-auto w-full select-none !object-cover"
            />
            <ul
              style={{
                position: 'relative',
                width: '1080px',
                height: '300px',
              }}
              className="relative z-10 mx-auto mb-20 mt-auto flex h-full items-end justify-center">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const qual = () => {
                  switch (i) {
                    case 0:
                      return {
                        transform:
                          'translateY(60px) translateX(100px) rotateY(180deg)',
                        zIndex: 4,
                      };
                    case 1:
                      return {
                        transform:
                          'translateY(30px) translateX(50px) rotateY(180deg)',
                        zIndex: 3,
                      };
                    case 2:
                      return {
                        transform:
                          'translateY(0px) translateX(0px) rotateY(180deg)',
                        zIndex: 2,
                      };
                    case 3:
                      return {
                        transform:
                          'translateY(-10px) translateX(-40px) rotateY(180deg)',
                        zIndex: 1,
                      };
                    case 4:
                      return {
                        transform:
                          'translateY(-12px) translateX(-60px) rotateY(0deg)',
                        zIndex: i,
                      };
                    case 5:
                      return {
                        transform:
                          'translateY(-14px) translateX(-70px) rotateY(0deg)',
                        zIndex: i,
                      };
                    case 6:
                      return {
                        transform:
                          'translateY(0px) translateX(-110px) rotateY(0deg)',
                        zIndex: i,
                      };
                    case 7:
                      return {
                        transform:
                          'translateY(20px) translateX(-150px) rotateY(0deg)',
                        zIndex: i,
                      };
                    case 8:
                      return {
                        transform:
                          'translateY(-12px) translateX(-100px) rotateY(0deg)',
                        zIndex: i,
                      };
                  }
                };
                return (
                  <li
                    key={i}
                    style={qual()}
                    className="relative flex h-[250px] w-[200px] flex-col items-center justify-center gap-1 p-1">
                    {/* <p className="font-KanitBold text-sm text-white">
                            {id}
                          </p> */}
                    <div
                      className="relative h-full w-full"
                      style={{ transform: `translateY(${i}%)` }}>
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
        <aside className="absolute right-0 top-0 z-10 h-full w-12 rounded-md bg-slate-900">
          a
        </aside>
      </MatchContent>
    </>
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
            socket.emit('leave_room', roomActive);
            setRoomActive(null);
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
        <div
          className="flex w-fit cursor-pointer items-center gap-1 transition-all hover:gap-2"
          onClick={() => {
            socket.emit('teste_sala', roomActive);
          }}>
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
              className="col-span-2 flex flex-col items-center justify-center gap-1 rounded-md border-2 border-slate-500/50 bg-slate-800/50 p-1 text-green-500">
              {i !== 11 && i !== 9 && <Cat size={24} weight="fill" />}

              <p className="font-KanitRegular text-sm text-gray-300">
                {i !== 11 && i !== 9 ? 'Vampiro' : '?'}
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

        <div className="relative flex h-full w-full flex-col gap-4 rounded-md bg-slate-800 p-2">
          <ul className="absolute flex h-[calc(100%-84px)] w-[calc(100%-16px)] flex-col overflow-auto rounded-md bg-slate-900 p-2 font-Kanit text-white scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-500">
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
                if (e.key === 'Enter') sendMessage();
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
        </div>
      </div>
    </aside>
  );
};

export const getServerSideProps = (context) => {
  const { id } = context.params;

  return { props: { id } };
};

export default MatchFastGame;
