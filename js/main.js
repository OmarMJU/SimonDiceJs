// Se obtienen los botones para el juego.
const btnceleste = document.getElementById("celeste");
const btnvioleta = document.getElementById("violeta");
const btnnaranja = document.getElementById("naranja");
const btnverde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");

/**
* Clase del juego la cual contiene toda la lógica.
*/
class Juego {

  /**
  * El constructor es el primer método (Callback) que se va a ejecutar en
  * una clase.
  * Se puede utilizar para manda a llamar más métodos o inicializar variables
  * o propiedades.
  */
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    this.siguienteNivel();
  }

  /**
  * Inicializa las propiedades necesarias para el juego.
  */
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

  /**
  * Genera una secuencia aleatorìa con la cual se van a iluminar los
  * botones.
  */
  generarSecuencia() {
    // Se puede declarar un atributo nuevo aunque en la clase no se espeficique.
    this.secuencia = new Array(10).fill(0).map(num => Math.floor(Math.random() * 4));
  }

  /**
  * Aumenta el nivel cada que el jugador logre superar el nivel anterior.
  */
  siguienteNivel() {
    this.iluminarSecuencia();
  }

  /**
  * Transforma un número de la secuencia aleatoria a un color para poder
  * iluminar el botón.
  */
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

  /**
  * Ilumina los botones de acuerdo con la secuencia aleatoria generada.
  */
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroColor(this.secuencia[i]);
      setTimeout(() => this.iluminaColor(color), 1000 * i);
    }
  }

  /**
  * Agrega la clase "ligth" a cada botòn para simular el efecto
  * de iluminado.
  */
  iluminaColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagaColor(color), 350);
  }

  /**
  * Elimina la clase "light" para simular el efecto de apagado.
  */
  apagaColor(color) {
    this.colores[color].classList.remove("light");
  }
}


/**
* Función que arranca el juego.
*/
function empezarJuego() {
  window.juego = new Juego();
}
