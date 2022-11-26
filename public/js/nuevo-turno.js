// Referencias HTML
const lblNuevoTurno = document.querySelector('#lblNuevoTurno');
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('ultimo-turno', (ultimo) => {
    lblNuevoTurno.innerText = 'Turno ' + ultimo;
});

btnCrear.addEventListener('click', () => {

    socket.emit('siguiente-turno', null, (turno) => {
        lblNuevoTurno.innerText = turno;
    });

});
