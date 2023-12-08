import { Configuration } from '../contexts/ConfigurationContext';
import { SocketMessage } from '../contexts/MessageContex';
import { SocketContext } from '../contexts/SocketContext';
import { SoundAllowed } from '../contexts/SoundContext';
import { User } from '../contexts/UserContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
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
