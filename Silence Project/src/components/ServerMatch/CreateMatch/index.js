import { useEffect, useState } from "react";
import CustomButton from "../../_Global/Commons/Buttons";
import CustomTitles from "../../_Global/Commons/Titles";
import CustomDialog from "../../_Global/Dialog";
import { ArrowFatLeft } from "@phosphor-icons/react";
import { useSocket } from "../../../../contexts/SocketContext";
import { useMessage } from "../../../../contexts/MessageContex";
import MessageContainer from "../../_Global/Messages";

function LobbyCreateMatch({ actions }) {
  const { setOpenCreateMatch } = actions;

  const { socket, setSocket } = useSocket();

  const [friends, setFriends] = useState([]);

  const [loadingFastMatch, setLoadingFastMatch] = useState(false);
  const [loadingFriendMatch, setLoadingFriendMatch] = useState(false);

  useEffect(() => {
    console.log(socket);

    socket.emit("request_users");

    socket.on("result_users", (data) => {
      setFriends(data);
    });
  }, []);

  return (
    <>
      <CustomDialog
        title={`${loadingFriendMatch ? "Selecione seus amigos" : "Criar Sala"}`}
        close={setOpenCreateMatch}
        size="sm"
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
                  title="Partida rápida"
                  color="primary"
                  loading={loadingFastMatch}
                  action={{
                    onClick: () => setLoadingFastMatch(!loadingFastMatch),
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
    </>
  );
}

export default LobbyCreateMatch;
