// Se obtienen los botones para el juego.
const btnceleste = document.getElementById("celeste");
const btnvioleta = document.getElementById("violeta");
const btnnaranja = document.getElementById("naranja");
const btnverde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 3;

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
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500);
  }

  /**
  * Inicializa las propiedades necesarias para el juego.
  */
  inicializar() {
    this.elegirColor = this.elegirColor.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.toggleBotonInicio();
    this.generarSecuencia();
    this.nivel = 1;
    this.colores = {
      btnceleste,
      btnvioleta,
      btnnaranja,
      btnverde
    }
  }

  toggleBotonInicio() {
    if (btnEmpezar.classList.contains("hide")) btnEmpezar.classList.remove("hide");
    else btnEmpezar.classList.add("hide");
  }

  /**
  * Genera una secuencia aleatorìa con la cual se van a iluminar los
  * botones.
  */
  generarSecuencia() {
    // Se puede declarar un atributo nuevo aunque en la clase no se espeficique.
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(num => Math.floor(Math.random() * 4));
  }

  /**
  * Aumenta el nivel cada que el jugador logre superar el nivel anterior.
  */
  siguienteNivel() {
    this.subNivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
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
        return "btnnaranja";
      case 3:
        return "btnverde";
    }
  }

  transformarColorNumero(color) {
    switch (color) {
      case "btnceleste":
        return 0;
      case "btnvioleta":
        return 1;
      case "btnnaranja":
        return 2;
      case "btnverde":
        return 3;
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

  agregarEventosClick() {
    this.colores.btnceleste.addEventListener("click", this.elegirColor);
    this.colores.btnvioleta.addEventListener("click", this.elegirColor);
    this.colores.btnnaranja.addEventListener("click", this.elegirColor);
    this.colores.btnverde.addEventListener("click", this.elegirColor);
  }

  eliminarEventosClick() {
    this.colores.btnceleste.removeEventListener("click", this.elegirColor);
    this.colores.btnvioleta.removeEventListener("click", this.elegirColor);
    this.colores.btnnaranja.removeEventListener("click", this.elegirColor);
    this.colores.btnverde.removeEventListener("click", this.elegirColor);
  }

  elegirColor(evn) {
    const nombreColor = "btn" + evn.target.dataset.color;
    const numColor = this.transformarColorNumero(nombreColor);
    this.iluminaColor(nombreColor);

    if (numColor === this.secuencia[this.subNivel]) {
      this.subNivel++;

      if (this.subNivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();

        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoJuego();
        } else {
          setTimeout(this.siguienteNivel, 1000);
        }
      }
    } else {
      this.perdioJuego();
    }
  }

  ganoJuego() {
    swal("FELICIDADES", "Has ganado el juego", "success").then(this.inicializar);
  }

  perdioJuego() {
    swal("OH NO!", "No te ha dio muy bien hoy", "error")
    .then(() => {
      this.eliminarEventosClick();
      this.inicializar();
    });
  }
}


/**
* Función que arranca el juego.
*/
function empezarJuego() {
  window.juego = new Juego();
}
