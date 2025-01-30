import { useEffect } from 'react';
import { Configuration } from '../contexts/ConfigurationContext';
import { SocketMessage } from '../contexts/MessageContex';
import { SocketContext } from '../contexts/SocketContext';
import { SoundAllowed } from '../contexts/SoundContext';
import { User } from '../contexts/UserContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === '+' || event.key === '-' || event.key === '0')
      ) {
        event.preventDefault();
      }
    });

    document.addEventListener(
      'wheel',
      function (event) {
        if (event.ctrlKey) {
          event.preventDefault();
        }
      },
      { passive: false },
    );
  }, []);

  return (
    <>
      <SocketContext>
        <User>
          <SocketMessage>
            <SoundAllowed>
              <Configuration>
                <Component {...pageProps} />
              </Configuration>
            </SoundAllowed>
          </SocketMessage>
        </User>
      </SocketContext>
    </>
  );
}

export default MyApp;
