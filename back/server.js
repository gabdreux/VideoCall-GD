// Importa o módulo Express para criar um servidor web
const express = require('express');
// Importa o cors
const cors = require('cors');
// Cria uma instância do aplicativo Express
const app = express();
// const app = express.Router();
// Cria um servidor HTTP usando o aplicativo Express
const server = require('http').Server(app);
// Importa a função para gerar UUIDs únicos
const { v4: uuidV4 } = require('uuid');


app.use(express.static('public'));

app.get('/', (req, res) => {
	// const indexPath = path.join(__dirname, 'views', 'index.html');
	// res.sendFile(indexPath);
	res.send('Running');
  });



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


  app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();

  });
  

app.use(cors(corsOptions));

app.use(express.json());


// Define o mecanismo de visualização como EJS
app.set('view engine', 'ejs');
// Configura o middleware para servir arquivos estáticos
app.use(express.static('public'));



const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'database.json');






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









io.on("connection", (socket) => {



	socket.emit("me", socket.id, console.log('Cliente conectado:', socket.id));


	socket.on("me", () => {
		console.log("ME CHAMADO PELO CLIENTE!");
	});


	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded");
		console.log('Cliente desconectado:', socket.id);
	});



	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});


	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});


	socket.on("leaveCall", (data) => {
		io.to(data.to).emit("callEnded", data.signal)
	});


	socket.on("leaveCall", (data) => {
		socket.broadcast.to(data.to).emit("callEnded", data.signal);
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




  app.post("/saveme", extractUserId, (req, res) => {
	const { me } = req.body;
	const userId = req.userId;

	  console.log("Corpo da solicitação:", req.body);
  	  console.log("Valor de 'me':", me);
  
	const users = getUsers();
	const currentUser = users.find(user => user.id === userId);
  
	if (!currentUser) {
	  return res.status(404).json({ message: 'Usuário não encontrado' });
	}

	currentUser.me = me;

	saveUsers(users);

	res.status(200).json({ message: 'String "me" salva com sucesso' });


  })




  // Middleware de verificação do token
function verifyToken(req, res, next) {

	const token = req.headers.authorization;


	console.log('Token recebido NO VERIFYTOKEN:', token);
  
	if (!token) {
	  return res.status(401).json({ message: 'Token não fornecido' });
	}
  

	try {
	  const decoded = jwt.verify(token, config.jwtSecret);
	  req.userId = decoded.userId;
	  console.log('Token válido!!!!:', decoded.userId);
	  next();
	} catch (err) {
	  return res.status(403).json({ message: 'Token inválido' });
	}


  }




app.get('/api/check-auth', verifyToken, (req, res) => {
	res.json({ authenticated: true });
	
}); 





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


	res.header("Authorization", `Bearer ${token}`);

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


  

function extractUserId(req, res, next) {
	const token = req.headers.authorization;
  
	if (!token) {
	  return res.status(401).json({ message: 'Token não fornecido' });
	}
  
	try {
	  const decoded = jwt.verify(token, config.jwtSecret);
	  req.userId = decoded.userId; // Adiciona o userId ao objeto req
	  next();
	} catch (err) {
	  return res.status(403).json({ message: 'Token inválido' });
	}
  }


  

app.get('/api/friends', extractUserId, (req, res) => {
	const userId = req.userId;
  
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
  


  

  app.post('/idtocall', extractUserId, (req, res) => {
	const userId = req.userId;
	const { email } = req.body;
  
	const users = getUsers();
	const currentUser = users.find(user => user.id === userId);
	const userToCall = users.find(user => user.email === email);
  
	if (!currentUser) {
	  return res.status(404).json({ message: 'Usuário não encontrado' });
	}
  
	const idToCall = userToCall.me;

	res.status(200).json(idToCall);
  

  });












// Inicialização do servidor na porta 5000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));