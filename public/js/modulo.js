// Referencias HTML
const lblModulo = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTurno = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('modulo')) {
    window.location = 'index.html';
    throw new Error('El modulo es obligatorio');
}

const modulo = searchParams.get('modulo');
lblModulo.innerText = 'Módulo ' + modulo;

divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('turnos-pendientes', (pendientes) => {
    if (pendientes === 0) {
        lblPendientes.style.display = 'none';
        divAlerta.style.display = '';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
        divAlerta.style.display = 'none';
    }
});

btnAtender.addEventListener('click', () => {

    socket.emit('atender-turno', { modulo }, ({ ok, turno, msg }) => {
        if (!ok) {
            lblTurno.innerText = 'Nadie';
            return divAlerta.style.display = '';
        }

        lblTurno.innerText = 'Turno ' + turno.numero;
        divAlerta.style.display = 'none';
    });

});
