// Importa o módulo Express para criar um servidor web
const express = require('express');
// Cria uma instância do aplicativo Express
const app = express();
// Cria um servidor HTTP usando o aplicativo Express
const server = require('http').Server(app);
// Configura o socket.io para comunicação em tempo real
const io = require('socket.io')(server);
// Importa a função para gerar UUIDs únicos
const { v4: uuidV4 } = require('uuid');




// Define o mecanismo de visualização como EJS
app.set('view engine', 'ejs');
// Configura o middleware para servir arquivos estáticos
app.use(express.static('public'));



// Rota para redirecionar para uma nova sala
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`) // Redireciona para uma nova sala com um UUID único

});



// Rota para renderizar uma sala existente
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room }) // Renderiza o modelo 'room' com o ID da sala

});



// Configuração da comunicação via socket
io.on('connection', socket => {
  
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId); // O usuário é adicionado à sala
    socket.to(roomId).emit('user-connected', userId); // Um evento é emitido para outros usuários informando a conexão

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId) // Um evento é emitido para outros usuários informando a desconexão
    })

  });
});



// Inicialização do servidor na porta 3000
server.listen(5000);