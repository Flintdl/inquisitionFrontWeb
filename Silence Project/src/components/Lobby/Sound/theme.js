import { useEffect, useState } from 'react';
import CustomTitles from '../../_Global/Commons/Titles';
import {
  Pause,
  Play,
  PlayPause,
  SkipBack,
  SkipForward,
  SpeakerHigh,
  SpeakerSlash,
} from '@phosphor-icons/react';

function LobbyThemeMusic({ props }) {
  const {
    soundAllowed,
    themeMusicLobby,
    setThemeMusicLobby,
    themeActually,
    setThemeActually,
    setThemeMusicLobbyPaused,
    themeMusicLobbyPaused,
    urls,
  } = props;

  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);

  const getRandomMusic = () => {
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Pausa o som quando a página é minimizada
      if (themeMusicLobbyPaused) {
        themeMusicLobby.pause();
      }
    } else {
      if (soundAllowed === 'allowed') {
        // Continua o som quando a página é restaurada
        if (themeMusicLobbyPaused) {
          themeMusicLobby.play();
        }
      }
    }
  };

  const handleMusicEnd = () => {
    // Evento chamado quando a música atual termina
    const nextIndex = (currentMusicIndex + 1) % urls.length;
    setCurrentMusicIndex(nextIndex);
    const nextMusic = urls[nextIndex];
    setThemeActually(nextMusic.name);

    // Verifica se themeMusicLobby está inicializado
    if (themeMusicLobby) {
      themeMusicLobby.src = nextMusic.url;
      themeMusicLobby.play();
    }
  };

  const playPreviousMusic = () => {
    const prevIndex = (currentMusicIndex - 1 + urls.length) % urls.length;
    setCurrentMusicIndex(prevIndex);
    const prevMusic = urls[prevIndex];
    setThemeActually(prevMusic.name);
    themeMusicLobby.src = prevMusic.url;
    themeMusicLobby.play();
  };

  const playNextMusic = () => {
    const nextIndex = (currentMusicIndex + 1) % urls.length;
    setCurrentMusicIndex(nextIndex);
    const nextMusic = urls[nextIndex];
    setThemeActually(nextMusic.name);
    themeMusicLobby.src = nextMusic.url;
    themeMusicLobby.play();
  };

  useEffect(() => {
    if (themeMusicLobby === null) {
      const initialMusic = getRandomMusic();
      setCurrentMusicIndex(urls.indexOf(initialMusic));
      setThemeActually(initialMusic.name);
      const newThemeMusicLobby = new Audio(initialMusic.url);
      newThemeMusicLobby.addEventListener('ended', handleMusicEnd);
      setThemeMusicLobby(newThemeMusicLobby);
    }

    if (themeMusicLobbyPaused && soundAllowed === 'allowed') {
      if (themeMusicLobby) {
        themeMusicLobby.play();
        themeMusicLobby.loop = false;
      }
    } else if (themeMusicLobby !== null) {
      themeMusicLobby.pause();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Remove o event listener quando o componente é desmontado

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [soundAllowed, themeMusicLobby, themeMusicLobbyPaused, urls]);

  useEffect(() => {
    return () => {
      console.log('saiu');
      console.log(themeMusicLobby);
      if (themeMusicLobby) themeMusicLobby.pause();
    };
  }, [themeMusicLobby]);

  return (
    <div className="flex items-center gap-1">
      <SkipBack
        weight="fill"
        onClick={playPreviousMusic}
        className="cursor-pointer text-amber-600"
      />
      {themeMusicLobbyPaused && (
        <Pause
          weight="fill"
          onClick={() => setThemeMusicLobbyPaused(!themeMusicLobbyPaused)}
          className="cursor-pointer text-amber-600"
        />
      )}
      {!themeMusicLobbyPaused && (
        <Play
          weight="fill"
          onClick={() => setThemeMusicLobbyPaused(!themeMusicLobbyPaused)}
          className="cursor-pointer text-amber-600"
        />
      )}
      <SkipForward
        weight="fill"
        onClick={playNextMusic}
        className="cursor-pointer text-amber-600"
      />
      <CustomTitles
        tag="p"
        size={12}
        pos="left"
        text={themeActually}
        customClass="!text-amber-400 font-KanitBold"
      />
    </div>
  );
}

export default LobbyThemeMusic;
