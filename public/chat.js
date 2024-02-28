 // Conectar ao servidor Socket.io
 const res = document.getElementById("res")
 const socket = io();

 // Referências aos elementos do DOM
 const form = document.getElementById('form');
 const input = document.getElementById('input');
 const messages = document.getElementById('messages');


 // Lidar com envio de mensagem
 form.addEventListener('submit', (e) => {
     e.preventDefault();
     if (input.value) {
         const mensage = input.value;
         const username = 'diego'
         const data = {
             mensage,
             username
         }
         socket.emit('mensagem', data);
         console.log(username, mensage);
         input.value = '';
     }
 });

 // Lidar com recebimento de mensagem
 socket.on('mensagem', data => {
     res.innerHTML += `<li>${data.username}</li>
                       <li>${data.mensage}</li>`
     messages.appendChild(item);
     window.scrollTo(0, document.body.scrollHeight);
 });