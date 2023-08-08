// Inicialização do socket.io para comunicação com o servidor
const socket = io('/');

// Seleciona o elemento do HTML onde os vídeos serão exibidos
const videoGrid = document.getElementById('video-grid');


// Inicialização do Peer.js para comunicação peer-to-peer
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
});


// Criação do elemento de vídeo do próprio usuário
const myVideo = document.createElement('video');
myVideo.muted = true


// Objeto para rastrear conexões com outros pares
const peers = {};




// Captura de mídia (vídeo e áudio) do dispositivo do usuário
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream); // Adiciona o vídeo do próprio usuário à interface

  // Quando alguém liga para nós
  myPeer.on('call', call => {
    call.answer(stream); // Atende a chamada e envia nosso próprio fluxo de mídia

    const video = document.createElement('video');

    // Quando recebemos o fluxo de vídeo de outra pessoa
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);  // Adiciona o vídeo do usuário remoto à interface

    })
  })

  // Quando outro usuário se conecta à sala
  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream); // Estabelecemos conexão com o novo usuário

  })
});





// Quando outro usuário se desconecta
socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close(); // Encerramos a chamada com o usuário desconectado

});




// Quando a conexão do Peer.js é estabelecida
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id); // Emitimos o evento 'join-room' para o servidor

});





// Função para conectar-se a um novo usuário
function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream); // Iniciamos uma chamada para o novo usuário
  const video = document.createElement('video');

  // Quando recebemos o fluxo de vídeo do novo usuário
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream); // Adicionamos o vídeo do novo usuário à interface
  })


  // Quando a chamada é encerrada
  call.on('close', () => {
    video.remove(); // Removemos o elemento de vídeo quando a chamada é encerrada

  })

  // Armazena a chamada no objeto de pares
  peers[userId] = call

};





// Função para adicionar um fluxo de vídeo a um elemento de vídeo
function addVideoStream(video, stream) {
  video.srcObject = stream; // Associamos o fluxo de mídia ao elemento de vídeo
  
  // Quando os metadados do vídeo estão carregados, o vídeo é reproduzido
  video.addEventListener('loadedmetadata', () => {
    video.play() // Iniciamos a reprodução do vídeo

  })

  // Adiciona o elemento de vídeo ao grid
  videoGrid.append(video)

};