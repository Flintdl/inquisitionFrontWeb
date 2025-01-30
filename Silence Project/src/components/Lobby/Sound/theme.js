import { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import CustomTitles from '../../_Global/Commons/Titles';
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  SpeakerHigh,
  SpeakerLow,
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
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [openVolume, setOpenVolume] = useState(false);

  const getRandomMusic = () => {
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (themeMusicLobbyPaused) {
        themeMusicLobby.pause();
      }
    } else {
      if (soundAllowed === 'allowed') {
        if (themeMusicLobbyPaused) {
          themeMusicLobby.play();
        }
      }
    }
  };

  const handleMusicEnd = () => {
    const nextIndex = (currentMusicIndex + 1) % urls.length;
    setCurrentMusicIndex(nextIndex);
    const nextMusic = urls[nextIndex];
    setThemeActually(nextMusic.name);

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
    const handleTimeUpdate = () => {
      if (themeMusicLobby) {
        setCurrentTime(themeMusicLobby.currentTime);
        setDuration(themeMusicLobby.duration);
      }
    };

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
        themeMusicLobby.volume = volume;
      }
    } else if (themeMusicLobby !== null) {
      themeMusicLobby.pause();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (themeMusicLobby) {
      themeMusicLobby.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (themeMusicLobby) {
        themeMusicLobby.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [soundAllowed, themeMusicLobby, themeMusicLobbyPaused, urls, volume]);

  useEffect(() => {
    return () => {
      if (themeMusicLobby) themeMusicLobby.pause();
    };
  }, [themeMusicLobby]);

  const handleProgressBarClick = (e) => {
    if (themeMusicLobby) {
      const progressBar = e.currentTarget;
      const clickPosition =
        e.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.clientWidth;
      const newPosition = (clickPosition / progressBarWidth) * duration;

      themeMusicLobby.currentTime = newPosition;
    }
  };

  // Recupera o estado do áudio dos cookies
  useEffect(() => {
    const savedAudioState = parseCookies().audioState;
    if (savedAudioState) {
      const parsedAudioState = JSON.parse(savedAudioState);
      setCurrentMusicIndex(parsedAudioState.currentMusicIndex);
      setVolume(parsedAudioState.volume);
      setCurrentTime(parsedAudioState.currentTime);
      setThemeMusicLobbyPaused(parsedAudioState.paused);
    }
  }, [setThemeMusicLobbyPaused]);

  // Salvar o estado do áudio nos cookies
  useEffect(() => {
    const audioState = {
      paused: themeMusicLobbyPaused,
      currentMusicIndex,
      volume,
      currentTime,
      duration,
    };

    // Salvar o objeto de estado do áudio nos cookies
    setCookie(null, 'audioState', JSON.stringify(audioState), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }, [themeMusicLobbyPaused, currentMusicIndex, volume, currentTime, duration]);

  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="flex w-full items-center gap-1">
        <CustomTitles
          tag="p"
          size={12}
          pos="left"
          text={themeActually}
          customClass="!text-gray-400 font-KanitBold uppercase !text-sm mr-auto"
        />
        <SkipBack
          weight="fill"
          onClick={playPreviousMusic}
          className="cursor-pointer"
        />
        {themeMusicLobbyPaused && (
          <Pause
            weight="fill"
            onClick={() => setThemeMusicLobbyPaused(!themeMusicLobbyPaused)}
            className="cursor-pointer"
          />
        )}
        {!themeMusicLobbyPaused && (
          <Play
            weight="fill"
            onClick={() => setThemeMusicLobbyPaused(!themeMusicLobbyPaused)}
            className="cursor-pointer"
          />
        )}
        <SkipForward
          weight="fill"
          onClick={playNextMusic}
          className="cursor-pointer"
        />
      </div>

      <div className="flex w-full items-center justify-center gap-1">
        <div className="flex w-fit items-center gap-1">
          {volume >= 0.7 && (
            <SpeakerHigh
              weight="fill"
              size={20}
              className="cursor-pointer"
              onClick={() => setOpenVolume((prevState) => !prevState)}
            />
          )}
          {volume < 0.7 && (
            <SpeakerLow
              weight="fill"
              size={20}
              className="cursor-pointer"
              onClick={() => setOpenVolume((prevState) => !prevState)}
            />
          )}
          {openVolume && (
            <div className="absolute -left-20 top-[calc(100%+90px)] z-10 flex rotate-90 items-center gap-1 rounded-md bg-gray-400 py-1">
              <span className="ml-2 block -rotate-90 font-KanitBold text-sm">
                0
              </span>
              <div className="h-fit w-fit rounded-lg">
                <input
                  type="range"
                  step={0.1}
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  min={0}
                  max={1}
                  className="h-3 appearance-none bg-transparent p-0 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/40 [&::-webkit-slider-thumb]:h-[8px] [&::-webkit-slider-thumb]:w-[8px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </div>
              <span className="block -rotate-90 font-KanitBold text-sm">
                100
              </span>
            </div>
          )}
        </div>
        <span className="block w-10 text-left font-KanitRegular text-sm">
          {formatTime(currentTime)}
        </span>
        <span
          className="relative h-2 flex-1 rounded-md bg-gray-400"
          onClick={handleProgressBarClick}>
          <span
            style={{ width: `${(currentTime / duration) * 100}%` }}
            className="absolute left-0 top-0 h-2 rounded-md bg-white"
            onClick={handleProgressBarClick}></span>
        </span>
        <span className="block w-10 text-right font-KanitRegular text-sm">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

export default LobbyThemeMusic;
