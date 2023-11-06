import { Server } from "socket.io";

var users = [];

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      const userON = users.some((el) => el.id === socket.id);
      if (!userON) users.push({ id: socket.id });
      console.log(users);
      socket.broadcast.emit("result_users", users);

      // Mensagem privada
      socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
          content,
          from: socket.id,
        });
      });

      socket.on("request_users", () => {
        socket.emit("result_users", users);
      });

      socket.on("disconnect", () => {
        console.log("Usuário desconectado:", socket.id);
        users = users.filter((user) => user.id !== socket.id);
        console.log("Lista de usuários após desconexão:", users);
        socket.broadcast.emit("result_users", users);
      });
    });
  }
  res.end();
};

export default SocketHandler;
