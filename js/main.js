const btnceleste = document.getElementById('celeste')
const btnvioleta = document.getElementById('violeta')
const btnnaranja = document.getElementById('naranja')
const btnverde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
  constructor() {
    this.inicializar()
  }

  inicializar() {
    btnEmpezar.classList.add('hide')
  }
}

function empezarJuego() {
  var juego = new Juego()
}
