import { SocketMessage } from "../contexts/MessageContex";
import { SocketContext } from "../contexts/SocketContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SocketContext>
        <SocketMessage>
          <Component {...pageProps} />
        </SocketMessage>
      </SocketContext>
    </>
  );
}

export default MyApp;
