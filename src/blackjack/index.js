import { crearDeck, pedirCarta, valorCarta} from './usecases';


const miModulo = (() => {
  'use strict'

  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

  let puntosJugadores = [],
      cartasJugadores = [];

  //HTML REFERENCES

  const btnPedir   = document.querySelector('.btnPedir'),
        btnDetener = document.querySelector('.btnDetener'),
        btnNuevo   = document.querySelector('.btnNuevo');

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

  // START GAME

  const iniciarJuego = ( numJugadores = 2 ) => {
     deck = crearDeck(tipos, especiales);
     

     puntosJugadores = [];
     cartasJugadores= [];
     for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0);
        cartasJugadores.push([]);
     };

     console.clear();
     

     puntosHTML.forEach( elem => elem.innerText = 0);
     divCartasJugadores.forEach( elem => elem.innerHTML = '');

     btnPedir.disabled   = false;
     btnDetener.disabled = false;
  };
  

  // POINTS COUNTER - where 0 is equal first player and the last one is equal to the computer

  const acumularPuntos = (carta, turno ) => {

     let aux = valorCarta(carta);
     // the ace is equal to 11 or 1 depending on the point counter
     if(aux === 11 && (aux + puntosJugadores[turno]) > 21 && cartasJugadores[turno] === 2)  {
        puntosJugadores[turno] = (puntosJugadores[turno] + aux) - 20;
     } else if (aux === 11 && (aux + puntosJugadores[turno]) > 21) {
        puntosJugadores[turno] = (puntosJugadores[turno] + aux) - 10
     } else {
        puntosJugadores[turno] = puntosJugadores[turno] + aux;
     }
     puntosHTML[turno].innerText = puntosJugadores[turno];
     return puntosJugadores[turno];
  }

  //CREATE CARDS

  const crearCartas = (carta, turno) => {
     const imgCarta = document.createElement('img');
     imgCarta.src = `assets/cartas/${ carta }.png`;
     imgCarta.classList.add('card');
     divCartasJugadores[turno].append(imgCarta);
  }

  // COMPUTER TURN

  const turnoComputadora = (puntosMinimos) => {
     
           
     do {
        const carta = pedirCarta(deck);
        cartasJugadores[cartasJugadores.length - 1].splice(cartasJugadores.length - 1,0,carta);
        acumularPuntos(carta, puntosJugadores.length - 1);
        crearCartas(carta, puntosJugadores.length - 1);

        let cartasJugador = cartasJugadores[0],
            cartasComputadora = cartasJugadores[cartasJugadores.length - 1],
            puntosComputadora = puntosJugadores[puntosJugadores.length - 1];

     
        if (puntosMinimos > 21) {
           break;
        } else if (puntosMinimos === 21 && cartasJugador === 2) {
              if (puntosComputadora < 10 && cartasComputadora.length < 2) {
                 break;
              } else if (puntosComputadora < 21 && cartasComputadora.length <= 2) {
                 break;
              }

        } else if (puntosComputadora >= 17) {
           break;
        }

     } while ((puntosJugadores[puntosJugadores.length - 1] <= puntosMinimos) && puntosMinimos <= 21);

     determinarGanador(puntosMinimos);
  };


  // SET WINNER

const determinarGanador = (puntosMinimos) => {
  setTimeout(() => {

     let cartasJugador = cartasJugadores[0],
         cartasComputadora = cartasJugadores[cartasJugadores.length - 1],
         puntosComputadora = puntosJugadores[puntosJugadores.length - 1];

     if ((puntosComputadora === puntosMinimos) && (cartasJugador.length === cartasComputadora.length)) {
        alert('Empate, Nadie Gana ni Pierde');
     }else if ((puntosComputadora === puntosMinimos) && cartasJugador.length > 2) {
        alert('Empate, Nadie Gana ni Pierde');
     } else if (cartasJugador.length === 2 && puntosMinimos === 21)  {
        alert('BlackJack! Jugador Gana');
     } else if (puntosMinimos > 21 ) {
        alert('Computadora Gana');
     } else if (puntosComputadora > 21 ) {
        alert('Jugador Gana');
     } else if (puntosComputadora > puntosMinimos) {
        if (cartasComputadora.length === 2 && puntosComputadora === 21) {
           alert('BlackJack! Computadora Gana');
        } else {
           alert('Computadora Gana');
        }
     } else if (puntosComputadora === puntosMinimos) {
        alert('Empate, Nadie Gana ni Pierde');
     } else {
        alert('Jugador Gana');
     }



  }, 100);
}

  //EVENTS

  btnPedir.addEventListener('click', () => {

     
     const carta = pedirCarta(deck);
     cartasJugadores[0].splice(0,0,carta);
     const puntosJugador = acumularPuntos(carta, 0);

     crearCartas(carta, 0);

     if (puntosJugador > 21 ) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
     } else if (puntosJugador === 21 ) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
     } 
        
  });

  btnDetener.addEventListener('click', () => {
     btnPedir.disabled   = true;
     btnDetener.disabled = true;
     turnoComputadora( puntosJugadores[0] );
  });

  btnNuevo.addEventListener('click', () => {
     //document.location.reload();
     
     iniciarJuego();
     
  });

  return {
     nuevoJuego: iniciarJuego
  }

}) ();




