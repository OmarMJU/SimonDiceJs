const btnceleste = document.getElementById("celeste");
const btnvioleta = document.getElementById("violeta");
const btnnaranja = document.getElementById("naranja");
const btnverde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    this.siguienteNivel();
  }

  inicializar() {
    btnEmpezar.classList.add("hide");
    this.generarSecuencia();
    this.nivel = 1;
    this.colores = {
      btnceleste,
      btnvioleta,
      btnnaranja,
      btnverde
    }
  }

  generarSecuencia() {
    // Se puede declarar un atributo nuevo aunque en la clase no se espeficique.
    this.secuencia = new Array(10).fill(0).map(num => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.iluminarSecuencia();
  }

  transformarNumeroColor(numero) {
    switch (numero) {
      case 0:
        return "btnceleste";
      case 1:
        return "btnvioleta";
      case 2:
        return "btnvioleta";
      case 3:
        return "btnverde";
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroColor(this.secuencia[i]);
      setTimeout(() => this.iluminaColor(color), 1000 * i);
    }
  }

  iluminaColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagaColor(color), 350);
  }

  apagaColor(color) {
    this.colores[color].classList.remove("light");
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
