// Importa o módulo Express para criar um servidor web
const express = require('express');
// Importa o cors
const cors = require('cors');
// Cria uma instância do aplicativo Express
const app = express();
// Cria um servidor HTTP usando o aplicativo Express
const server = require('http').Server(app);
// Importa a função para gerar UUIDs únicos
const { v4: uuidV4 } = require('uuid');

// Configura o socket.io para comunicação em tempo real
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});


app.use(cors());

app.use(express.json());


// Define o mecanismo de visualização como EJS
app.set('view engine', 'ejs');
// Configura o middleware para servir arquivos estáticos
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;





// // Rota para redirecionar para uma nova sala
// app.get('/', (req, res) => {
//   res.redirect(`/${uuidV4()}`) // Redireciona para uma nova sala com um UUID único

// });



// // Rota para renderizar uma sala existente
// app.get('/:room', (req, res) => {
//   res.render('room', { roomId: req.params.room }) // Renderiza o modelo 'room' com o ID da sala

// });



// // Configuração da comunicação via socket
// io.on('connection', socket => {
  
//   socket.on('join-room', (roomId, userId) => {
//     socket.join(roomId); // O usuário é adicionado à sala
//     socket.to(roomId).emit('user-connected', userId); // Um evento é emitido para outros usuários informando a conexão

//     socket.on('disconnect', () => {
//       socket.to(roomId).emit('user-disconnected', userId) // Um evento é emitido para outros usuários informando a desconexão
//     })

//   });
// });


app.get('/', (req, res) => {
	res.send('Running');
	console.log('Running');
});




io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});






////////////////////////////////////////////////////////////////////////////////////////////////



const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'database.json');


//Pega os dados de todos os usuários no "db"
function getUsers () {
  const rawData = fs.readFileSync(dataFilePath);
  const data = JSON.parse(rawData);
  return data.users;

}



//Pega os dados primeiro usuário no "db"
function getUser () {
  const rawData = fs.readFileSync(dataFilePath);
  const data = JSON.parse(rawData);
  return data.user[0];

}









//Rota para pegar todos os usuários
app.get('/api/user', (req, res) => {
  const users = getUsers(); // Obtém os dados do usuário usando a função do módulo de dados
  res.json(users);
});





//Rota de login
app.post('/api/login', (req, res) => {
	const { email, senha } = req.body; // Supondo que você esteja usando um middleware para analisar o corpo da solicitação
  
	const users = getUsers();
	const user = users.find(u => u.email === email && u.senha === senha);
  
	if (!user) {
	  return res.status(401).json({ message: 'Credenciais inválidas' });
	}
  
	// Se a autenticação for bem-sucedida, você pode retornar um token ou apenas um status 200
	res.status(200).json({ message: 'Login bem-sucedido' });
  });
  



  //Rota para pegar lista de amigos
  app.get('/api/friends', (req, res) => {
	const userId = 1; // Supondo que você tenha o ID do usuário atual após o login
	const users = getUsers();
  
	const currentUser = users.find(user => user.id === userId);
	if (!currentUser) {
	  return res.status(404).json({ message: 'Usuário não encontrado' });
	}
  
	const friends = currentUser.friends.map(friendId => {
	  return users.find(user => user.id === friendId);
	});
  
	res.json(friends);

  });







// Inicialização do servidor na porta 5000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));