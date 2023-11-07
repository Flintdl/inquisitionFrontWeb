import {
  Lock,
  LockKeyOpen,
  MagnifyingGlass,
  Star,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import CustomDialog from "../../_Global/Dialog";
import CustomButton from "../../_Global/Commons/Buttons";

function ListServer({ actions }) {
  const { setOpenServerFind } = actions;
  const [servers, setServers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setServers([
        {
          id: 0,
          name: "Servidor 01",
          favorite: true,
          match: { quantity: 43, max: 70, privateMatch: false },
        },
        {
          id: 1,
          name: "Servidor 02",
          favorite: false,
          match: { quantity: 12, max: 15, privateMatch: true },
        },
        {
          id: 2,
          name: "Servidor 03",
          favorite: false,
          match: { quantity: 100, max: 100, privateMatch: false },
        },
      ]);
    }, 1000);
  }, []);

  return (
    <CustomDialog title="Encontrar Servidor" close={setOpenServerFind}>
      <div className="relative">
        <input
          className="rounded-tg mb-2 h-11 w-full appearance-none rounded-lg border-2 border-gray-300 border-transparent bg-gray-300/50 p-3 pr-12 font-AntonRegular text-sm text-white placeholder-white focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="Procurar um servidor"
          autoFocus
        />
        <MagnifyingGlass
          weight="duotone"
          size={24}
          className="absolute right-3 top-3 text-white"
        />
      </div>
      <ul className="flex w-full flex-col gap-3">
        {servers.length > 0 ? (
          servers.map(({ id, name, favorite, match }, i) => {
            const { quantity, max, privateMatch } = match;
            return (
              <ServerList
                key={i}
                props={{ id, name, favorite, quantity, max, privateMatch }}
              />
            );
          })
        ) : (
          <Loading />
        )}
        {servers.length > 0 && <ShowMore />}
      </ul>
    </CustomDialog>
  );
}

const ServerList = ({ props }) => {
  const { id, name, favorite, quantity, max, privateMatch } = props;
  return (
    <li
      key={id}
      className="flex items-center justify-between rounded-md border border-gray-300/30 bg-gradient-to-r from-gray-200/30 to-gray-100/30 p-2 font-AntonRegular text-gray-600"
    >
      <div className="flex items-center gap-2">
        {/* <p className="mt-1 text-sm text-cyan-600">ID: {id}</p> */}
        <Star
          size={18}
          weight={favorite ? "fill" : "duotone"}
          className={`${favorite ? "text-yellow-500" : "text-white"}`}
        />
        <p className="text-white">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="mt-1 text-sm text-gray-300">
          <span className="text-white">{quantity}</span>/
          <span className="text-gray-300">{max}</span>
        </p>
        <p>
          {privateMatch ? (
            <Lock weight="fill" size={20} className="text-red-500" />
          ) : (
            <LockKeyOpen weight="fill" size={20} className="text-green-500" />
          )}
        </p>
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
