const path = require('path');
const fs = require('fs');

class Turno {
    constructor(numero, modulo) {
        this.numero = numero;
        this.modulo = modulo;
    }
}

class TurnoControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.turnos = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            turnos: this.turnos,
            ultimos4: this.ultimos4,
        }
    }

    init() {
        const { ultimo, hoy, turnos, ultimos4 } = require('../db/data.json');
        if (hoy === this.hoy) {
            this.turnos = turnos;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // Es otro dia
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguiente() {
        this.ultimo += 1;
        const turno = new Turno(this.ultimo, null);
        this.turnos.push(turno);

        this.guardarDB();

        return 'Turno ' + turno.numero;
    }

    atenderTurno(modulo) {

        // No tenemos turnos
        if (this.turnos.length === 0) {
            return null;
        }

        const turno = this.turnos.shift();
        turno.modulo = modulo;

        this.ultimos4.unshift(turno);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }

        this.guardarDB();

        return turno;
    }
}

module.exports = TurnoControl;
