import { Server } from "socket.io";

var users = [];
var usersRoom = [];

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

      socket.on("create_room", (roomName) => {
        socket.join(roomName);
        socket.room = roomName;
        console.log(`User ${socket.id} create room: ${roomName}`);

        // Se a sala não existe, crie uma nova sala
        usersRoom.push({
          roomID: roomName,
          users: [{ id: socket.id }],
        });

        io.to(roomName).emit("room_users", {
          adapter: io.sockets.adapter.rooms.get(roomName),
          users: [{ id: socket.id }],
        });
        socket.broadcast.emit("new_room", { roomName });
      });

      socket.on("join_room", (roomName) => {
        const users = [];
        socket.join(roomName);
        socket.room = roomName;
        console.log(`User ${socket.id} joined room: ${roomName}`);
        // Procurar a sala com base no roomName
        const existingRoom = usersRoom.find((room) => room.roomID === roomName);

        if (existingRoom) {
          // Se a sala já existe, adicione o usuário a essa sala
          existingRoom.users.push({ id: socket.id });
        } else {
          // Se a sala não existe, crie uma nova sala
          usersRoom.push({
            roomID: roomName,
            users: [{ id: socket.id }],
          });
        }

        console.log(usersRoom);
        console.log("roomName: ", roomName);
        console.log(existingRoom);
        io.to(roomName).emit("room_users", {
          adapter: io.sockets.adapter.rooms.get(roomName),
          users: existingRoom ? existingRoom.users : [],
        });
      });

      socket.on("start_game", () => {
        const roomName = socket.room;
        const room = io.sockets.adapter.rooms.get(roomName);

        if (room && room.size >= 3) {
          io.to(roomName).emit("game_started");
          startGame(io, roomName);
        } else {
          io.to(roomName).emit("insufficient_players");
        }
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

const startGame = (io, roomName) => {
  const room = io.sockets.adapter.rooms.get(roomName);
  const users = Array.from(room);

  if (users.length >= 3) {
    let currentPlayerIndex = 0;
    let countdownTimer;

    countdownTimer = setInterval(() => {
      const currentPlayerId = users[currentPlayerIndex];
      io.to(currentPlayerId).emit("your_turn");
      io.to(roomName).emit("turn_info", {
        currentPlayer: currentPlayerId,
        countdown: 15,
      });

      setTimeout(() => {
        io.to(currentPlayerId).emit("turn_over");
        currentPlayerIndex = (currentPlayerIndex + 1) % users.length;
      }, 15000);
    }, 16000); // Delay timer by 1 second to account for network latency
  } else {
    io.to(roomName).emit("insufficient_players");
  }
};

// const startGame = (io, roomName) => {
//   const room = io.sockets.adapter.rooms.get(roomName);
//   const users = Array.from(room);

//   if (users.length >= 3) {
//     let currentPlayerIndex = 0;
//     let countdownTimer;

//     countdownTimer = setInterval(() => {
//       const currentPlayerId = users[currentPlayerIndex];
//       io.to(currentPlayerId).emit("your_turn");
//       io.to(roomName).emit("turn_info", {
//         currentPlayer: currentPlayerId,
//         countdown: 15, // Defina o tempo inicial do contador
//       });

//       let countdown = 15; // Tempo inicial do contador
//       const countdownInterval = setInterval(() => {
//         countdown--; // Decrementa o contador
//         io.to(roomName).emit("turn_info", {
//           currentPlayer: currentPlayerId,
//           countdown: countdown, // Envie o contador regressivamente aos clientes
//         });

//         if (countdown <= 0) {
//           clearInterval(countdownInterval); // Limpa o intervalo quando o contador chega a 0
//           io.to(currentPlayerId).emit("turn_over");
//           currentPlayerIndex = (currentPlayerIndex + 1) % users.length;
//           startGame(io, roomName); // Inicie o próximo turno
//         }
//       }, 1000); // Atualiza o contador a cada segundo
//     }, 16000); // Delay timer by 1 second to account for network latency
//   } else {
//     io.to(roomName).emit("insufficient_players");
//   }
// };

export default SocketHandler;
