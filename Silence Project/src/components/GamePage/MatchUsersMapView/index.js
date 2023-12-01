import Image from 'next/image';

function MatchUsersMapView({ props, person }) {
  const { socket, roomInfo, characters, positions } = props;
  const { character03 } = person;

  return (
    <ul
      style={{
        position: 'relative',
        width: '1100px',
        height: '300px',
      }}
      className="relative z-10 mx-auto mb-20 mt-auto flex h-full max-w-[90%] items-end justify-center">
      {Array.from({ length: roomInfo.maxUsers }).map((_, i) => {
        const user = roomInfo.users[i]; // Obtenha o usuário correspondente (se existir)
        const characterIndex = i % characters.length;
        const character = characters[characterIndex];
        const position = positions[i]; // Use a posição correspondente

        return (
          <li
            key={i}
            style={position}
            className={`absolute flex h-[250px] w-[150px] flex-col items-center justify-center gap-1 p-1`}>
            <div className="absolute -top-12 left-0 z-10 h-full w-full"></div>
            <span className="absolute -top-8 whitespace-nowrap rounded-lg bg-black/40 px-2 py-1 font-AntonRegular uppercase text-gray-300">
              {user && (
                <>
                  {user.id}
                  {user.id === socket.id && (
                    <span className="text-purple-500"> (você)</span>
                  )}
                </>
              )}
              {!user && 'Aguardando usuário'}
            </span>
            <div
              className={`relative h-full w-full ${
                user ? 'drop-shadow-[16px_-16px_4px_rgba(0,0,0,.5)]' : ''
              }`}>
              <span
                className={`h-full w-full ${
                  user
                    ? user.id === socket.id
                      ? 'drop-shadow-[0_0px_2px_rgba(255,255,255,1)]'
                      : 'drop-shadow-[0_0px_2px_rgba(0,0,0,1)]'
                    : 'drop-shadow-[0_0px_2px_rgba(255,255,255,1)]'
                }`}>
                {user && (
                  <Image
                    src={user.id === socket.id ? character.image : character03}
                    alt={`Character ${i + 1}`}
                    width={300}
                    height={200}
                    quality={100}
                    className="left-0 top-0 block h-auto w-fit select-none brightness-90"
                  />
                )}
                {!user && (
                  // Renderize algo para indicar que o slot está vazio
                  <Image
                    src={character03}
                    alt={`Character ${i + 1}`}
                    width={300}
                    height={200}
                    quality={100}
                    className="bh-white left-0 top-0 block h-auto w-fit select-none brightness-0"
                  />
                )}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default MatchUsersMapView;
