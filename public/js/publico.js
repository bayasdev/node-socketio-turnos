// Referencias HTML
const lblTurno1 = document.querySelector('#lblTurno1');
const lblModulo1 = document.querySelector('#lblModulo1');
const lblTurno2 = document.querySelector('#lblTurno2');
const lblModulo2 = document.querySelector('#lblModulo2');
const lblTurno3 = document.querySelector('#lblTurno3');
const lblModulo3 = document.querySelector('#lblModulo3');
const lblTurno4 = document.querySelector('#lblTurno4');
const lblModulo4 = document.querySelector('#lblModulo4');

const socket = io();

socket.on('estado-actual', (payload) => {

    const audio = new Audio('./audio/sound.mp3');
    audio.play();

    const [turno1, turno2, turno3, turno4] = payload;

    if (turno1) {
        lblTurno1.innerText = 'Turno ' + turno1.numero;
        lblModulo1.innerText = 'Módulo ' + turno1.modulo;
    }

    if (turno2) {
        lblTurno2.innerText = 'Turno ' + turno2.numero;
        lblModulo2.innerText = 'Módulo ' + turno2.modulo;
    }

    if (turno3) {
        lblTurno3.innerText = 'Turno ' + turno3.numero;
        lblModulo3.innerText = 'Módulo ' + turno3.modulo;
    }

    if (turno4) {
        lblTurno4.innerText = 'Turno ' + turno4.numero;
        lblModulo4.innerText = 'Módulo ' + turno4.modulo;
    }

});
