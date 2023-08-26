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


const cookieParser = require('cookie-parser');
app.use(cookieParser())



// Configura o socket.io para comunicação em tempo real
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});



const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./config');


const corsOptions = {
	origin: 'http://localhost:3000', // Troque pelo endereço real do seu front-end
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true, // Permite que cookies sejam enviados na solicitação (importante para autenticação)
  };


app.use(cors(corsOptions));

app.use(express.json());


// Define o mecanismo de visualização como EJS
app.set('view engine', 'ejs');
// Configura o middleware para servir arquivos estáticos
app.use(express.static('public'));



const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'database.json');






const PORT = process.env.PORT || 5000;





// // Rota para redirecionar para uma nova sala
// app.get('/', (req, res) => {
//   res.redirect(`/${uuidV4()}`) // Redireciona para uma nova sala com um UUID único

// });



// // Rota para renderizar uma sala existente
// app.get('/:room', (req, res) => {
//   res.render('room', { roomId: req.params.room }) // Renderiza a página 'room' com o ID da sala

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





//Pega os dados de todos os usuários no "db"
function getUsers () {
  const rawData = fs.readFileSync(dataFilePath);
  const data = JSON.parse(rawData);
  return data.users;

}


function saveUsers (users) {
	const data = { users };
	fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

  }




//Pega os dados primeiro usuário no "db"
function getUser () {
  const rawData = fs.readFileSync(dataFilePath);
  const data = JSON.parse(rawData);
  return data.user[0];

}






// const socketToUser = {};


io.on("connection", (socket) => {


	// socket.emit("me", socket.id);

	socket.emit("me", socket.id, console.log('Novo cliente conectado:', socket.id));

	socket.on("me", () => {
		console.log('Novo cliente conectado:', socket.id);
	});


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





//Rota para pegar todos os usuários
app.get('/api/user', (req, res) => {
  const users = getUsers(); // Obtém os dados do usuário usando a função do módulo de dados
  res.json(users);
});






// Rota de registro
app.post("/register", async (req, res) => {
	const { userName, pwd, email } = req.body;
  
	const token = await bcrypt.hash(pwd, 10);
  
	const users = getUsers();
  
	const userAlreadyExists = users.find(u => u.email === email);
  
	if (userAlreadyExists) {
	  console.log("Esse username já está sendo usado");
	  return res.status(409).json("Username already taken");
	}
  
	const newUser = {
		id: users.length + 1,
		name: userName,
		email: email,
		senha: token,
		friends: [],
	  };
  
	users.push(newUser);
	saveUsers(users);
  
	console.log("usuário criado com sucesso!");

	
	const responseUser = {
		id: newUser.id,
		name: newUser.name,
		email: newUser.email,
		senha: newUser.senha,
		friends: newUser.friends,
	  };  


	return res.status(201).json(responseUser);

  });




  // Middleware de verificação do token
function verifyToken(req, res, next) {
	const token = req.header('Authorization');
  
	if (!token) {
	  return res.status(401).json({ message: 'Token não fornecido' });
	}
  
	try {
	  const decoded = jwt.verify(token, config.jwtSecret);
	  req.userId = decoded.userId;
	  next();
	} catch (err) {
	  return res.status(403).json({ message: 'Token inválido' });
	}
  }



  


//Rota de login
app.post('/api/login', async (req, res) => {
	const { email, senha } = req.body;
  
	const users = getUsers();
	const user = users.find(u => u.email === email);
  
	if (!user) {
	  return res.status(401).json({ message: 'Credenciais inválidas' });
	}
  
	// Usando bcrypt para comparar a senha fornecida com a senha armazenada
	const isPasswordValid = await bcrypt.compare(senha, user.senha);
  
	if (!isPasswordValid) {
	  return res.status(401).json({ message: 'Credenciais inválidas' });
	}

	const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });

	  // Configurar o cookie HttpOnly
	  res.cookie('token', token, {
		httpOnly: true,
		// Outras opções do cookie, como "secure" para HTTPS
		maxAge: 3600000,
	  });

	console.log('Token configurado:', token);
	res.status(200).json({ message: 'Login bem-sucedido!', userId: user.id, token: token });
  });
  








// Rota de logout
app.post('/api/logout', (req, res) => {

  
	// Limpe o cookie contendo o token no lado do cliente
	res.clearCookie('token');
  

	res.status(200).json({ message: 'Logout bem-sucedido' });


	res.redirect('/login');
	

  });


  







//   Rota para pegar lista de amigos
//   app.get('/api/friends', (req, res) => {
// 	const userId = 1; // Supondo que você tenha o ID do usuário atual após o login
// 	const users = getUsers();
  
// 	const currentUser = users.find(user => user.id === userId);
// 	if (!currentUser) {
// 	  return res.status(404).json({ message: 'Usuário não encontrado' });
// 	}
  
// 	const friends = currentUser.friends.map(friendId => {
// 	  return users.find(user => user.id === friendId);
// 	});
  
// 	res.json(friends);

//   });




app.get('/api/friends', (req, res) => {
	const token = req.cookies.token; // Pegue o token dos cookies

	console.log("TOKEN ROTA FRIENDS:", token);
  
	if (!token) {
	  return res.status(401).json({ message: 'Token não fornecido' });
	}
  
	try {
	  // Verificar e decodificar o token
	  const decodedToken = jwt.verify(token, config.jwtSecret);
  
	  // O ID do usuário logado estará em decodedToken.userId
	  const userId = decodedToken.userId; // Use o userId do token
  
	  const users = getUsers();
	  const currentUser = users.find(user => user.id === userId);
  
	  if (!currentUser) {
		return res.status(404).json({ message: 'Usuário não encontrado' });
	  }
  
	  const friends = currentUser.friends.map(friendId => {
		return users.find(user => user.id === friendId);
	  });
  
	  res.json(friends);
	} catch (error) {
	  return res.status(401).json({ message: 'Token inválido' });
	}
  });
  












// Inicialização do servidor na porta 5000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));