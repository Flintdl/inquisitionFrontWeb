import { useEffect } from "react";

function LobbyThemeMusic({ props }) {
  const {
    soundAllowed,
    themeMusicLobby,
    themeMusicLobbyPaused,
    setThemeMusicLobby,
    url,
  } = props;

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
    if (themeMusicLobby === null) setThemeMusicLobby(new Audio(url));

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

  return;
}

export default LobbyThemeMusic;
