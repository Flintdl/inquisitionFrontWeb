import { ArrowFatLeft } from "@phosphor-icons/react";
import CustomTitles from "../../src/components/_Global/Commons/Titles";

function MatchFastGame({ id }) {
  return (
    <>
      <nav className="flex w-full items-center gap-2 bg-black p-1">
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
        <div className="flex h-full w-full flex-col rounded-md bg-slate-900 p-4 font-Kanit text-white">
          <ul className="flex flex-col">
            {messagesRoom?.map(({ id, message }) => {
              return (
                <li key={id}>
                  <p>Usuário: {id}</p>
                  <p>{message}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex gap-4">
            <input
              value={messageInput}
              className="text-black"
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={() => sendMessage()}>mandar</button>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = (context) => {
  const { id } = context.params;

  return { props: { id } };
};

export default MatchFastGame;
