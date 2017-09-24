
module.exports = function(server){

  var io = require('socket.io').listen(server);

  var users = [];
  var sockets = [];

io.on('connection', function(socket){
  console.log('Nueva conexión establecida.');

  /**El evento 'newConnection' se recibe cada vez que se conecta ya sea un emisor o u receptor
  *Se comprueba si es emisor, y si lo es se añade al array de emisores
  *Independientemente de si se conecta un emisor o un receptor se envía el evento 'updateUsers' por todos los sockets
  **/
  socket.on('newConnection',function(data){
    if((data.isEmitter)==true){
                                                                   //Esto es una solucion temporal para almacenar
      console.log('Emisor con nombre ' + data.name + ' conectado');    //emisores con nombres distintos
      socket.emit('userName',data.name);
      users.push(data.name);
      sockets.push(socket);
    }
    console.log("Número de usuarios emitiendo: "+users.length);
    io.emit('updateUsers',users);
  });

  /**El evento 'sendStream' será recibido cada vez que un emisor envíe un frame de su video
  *Se envíará a todos los sockets excepto a el del propio emisor
  **/
  socket.on('sendStream',function(data){
    socket.broadcast.emit('sendStream',data);
  });

  /**El evento 'closeConnection' será recibido cada vez que un emisor deje de hacer streaming
  *Se elminará del array de emisores
  *Se comunicará que se ha desconectado un emisor y se enviará un evento de 'updateUsers'
  **/
  socket.on('closeConnection', function(name){
    users.splice(users.indexOf(name),1);
    console.log("Número de usuarios emitiendo: "+users.length);
    io.emit('stopStreaming',undefined);
    io.emit('updateUsers',users);
  });

  socket.on('disconnect', function(){
    sockets.splice(sockets.indexOf(socket),1);
    users.splice(sockets.indexOf(socket),1);
    //console.log('Emisor con nombre ' + name + ' desconectado');
    console.log("Número de usuarios emitiendo: "+users.length);
    io.emit('stopStreaming',undefined);
    io.emit('updateUsers',users);
  });

});

}
