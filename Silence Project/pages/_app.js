import { Configuration } from '../contexts/ConfigurationContext';
import { SocketMessage } from '../contexts/MessageContex';
import { SocketContext } from '../contexts/SocketContext';
import { SoundAllowed } from '../contexts/SoundContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SocketContext>
        <SocketMessage>
          <SoundAllowed>
            <Configuration>
              <Component {...pageProps} />
            </Configuration>
          </SoundAllowed>
        </SocketMessage>
      </SocketContext>
    </>
  );
}

export default MyApp;
