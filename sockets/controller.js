const TurnoControl = require("../models/turno-control");

const turnoControl = new TurnoControl();

const socketController = (socket) => {

    // Cuando un cliente se conecta
    socket.emit('ultimo-turno', turnoControl.ultimo);
    socket.emit('estado-actual', turnoControl.ultimos4);
    socket.emit('turnos-pendientes', turnoControl.turnos.length);

    socket.on('siguiente-turno', (payload, callback) => {

        const siguiente = turnoControl.siguiente();
        callback(siguiente);

        // Notificar que hay un nuevo turno
        socket.broadcast.emit('turnos-pendientes', turnoControl.turnos.length);
    })

    socket.on('atender-turno', ({ modulo }, callback) => {

        if (!modulo) {
            return callback({
                ok: false,
                msg: 'El modulo es obligatorio'
            });
        }

        const turno = turnoControl.atenderTurno(modulo);

        // Notificar cambios
        socket.broadcast.emit('estado-actual', turnoControl.ultimos4);
        socket.emit('turnos-pendientes', turnoControl.turnos.length);
        socket.broadcast.emit('turnos-pendientes', turnoControl.turnos.length);

        if (!turno) {
            return callback({
                ok: false,
                msg: 'Ya no hay turnos pendientes'
            });
        } else {
            return callback({
                ok: true,
                turno
            });
        }

    })

}

module.exports = {
    socketController
}
