// Importar os módulos necessários
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Inicializar o Express e o servidor HTTP
const app = express();
const server = http.createServer(app);

// Configurar o Socket.io para usar o servidor HTTP
const io = socketIo(server);

// Configurar o middleware do Express para servir arquivos estáticos (opcional)
app.use(express.static(__dirname + '/public'));

// Rota para a página inicial (opcional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Evento de conexão com o Socket.io
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  // Lidar com evento de mensagem recebida
  socket.on('mensagem', (mensagem) => {
    console.log('Mensagem recebida:', mensagem);
    
    // Enviar a mensagem para todos os clientes, incluindo o remetente
    io.emit('mensagem', mensagem);
  });

  // Lidar com evento de desconexão
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Iniciar o servidor e ouvir a porta 8080
server.listen(8080, () => {
  console.log('Servidor Socket.io está ouvindo na porta 8080');
});
