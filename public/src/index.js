import { getData } from './modules/services'
import { CarouselCartas } from './modules/CarrouselCartas'
import { mostrarMatch } from './modules/MostrarMatch'
import { PartidaGuardada } from './modules/PartidasGuardadas'
import './css/main.css'

// Botones
const botonJugar = document.getElementById('play')
const volverAtirar = document.querySelector('#volverAtirar')
const save = document.querySelector('#save')
const verMatch = document.querySelector('#verMatch')
const buttonsCarousel = document.querySelectorAll('.buttons-carousel')
//Pantallas
const containers = document.querySelectorAll('container')
const menu = document.querySelector('#menu')
const load = document.querySelector('#load')
const cards = document.querySelector('#cards')
const match = document.querySelector('#match')
//Resultados
let jugadaCartas = document.querySelector('#jugada')
const match_result = document.querySelector('#match_result')
const partidasGuardadas = document.querySelector('#partidasGuardadas')
let partidaJugada

console.log(buttonsCarousel)


/**
 * @param {Number} buttonNumber - numero del boton del carrousel
 */
const buttonAsigned = (buttonNumber) => {
  buttonsCarousel.forEach(button => {
    button.style.display = 'none'
  })
  buttonsCarousel[buttonNumber].style.display = 'block'
}

/**
 * 
 * @param {HTMLElement} pantalla - pantalla a mostrar
 */
const PasarPantalla = (pantalla) => {
  containers.forEach(container => {
    container.style.display = 'none'
    console.log(container)
  })

  pantalla.style.display = 'block'

  if (pantalla === load) {
    setTimeout(() => {
      PasarPantalla(cards)
    }, 3000)
  }
}

const removeAllChilds = (parent) => {
  while (parent.firstChild) {
    console.log(parent.firstChild)
    parent.removeChild(parent.firstChild)
  }
}

const chuck = (cards) => {

  let play = []
  for (let chunck = 0; chunck < 6; chunck++) {
    let numberRandom = Math.round(Math.random() * 21)
    let carta = cards[numberRandom]
    if (play.includes(carta)) {
      console.log(`${carta.name} this letter was repeated`)
      chunck--
    } else {
      play.push(cards[numberRandom])
    }
  }
  return (play)
}

const chunckCards = () => getData().then(cards => chuck(cards))

const mostrarCartas = ({ cards, players }, carga = 'Obteniendo Cartas...') => {
  while (jugadaCartas.childNodes.length < 7) {
    if (jugadaCartas.childNodes.length > 0) {
      removeAllChilds(jugadaCartas)
    }
    else {
      cards.forEach((card,i) => {
        jugadaCartas.innerHTML += CarouselCartas(card, i, players)
        i++
      })
      console.log(jugadaCartas.childNodes.length)
      const charge = 'https://firebasestorage.googleapis.com/v0/b/tarot-c4969.appspot.com/o/extra%2Floader.gif?alt=media&token=9f25aa95-12ff-4090-a423-3a03f36357bd'
      // Pantalla de Carga
      load.innerHTML = `        
      <div class="load" >
      <img src="${charge}" alt="">
      <h4>${carga}</h4>    
      </div>`

      PasarPantalla(load)

      break
    }
  }
}

const resultadoMatch = (cards) => {
  let score = 0
  cards.forEach(card => {
    score += card.score
  })
  return score % 2 === 0
}

let partidasJugadas = []


const initGame = () => {
  let cards = []
  let partida = {
    players: [],
    cards: []
  }

  botonJugar.addEventListener('click', async () => {
    let player1 = document.getElementById('player1').value
    let player2 = document.getElementById('player2').value

    const validateChuck = player1 !== '' && player2 !== ''

    if (validateChuck) {
      cards = await chunckCards()
      partida.cards = cards
      partida.players = [player1, player2]
      player1 = document.getElementById('player1').value = ''
      player2 = document.getElementById('player2').value = ''
      mostrarCartas(partida)
      PasarPantalla(load)
      console.log(partida)
      buttonAsigned(0)
    }

  })

  volverAtirar.addEventListener('click', async () => {
    cards = await chunckCards()
    partida.cards = cards
    mostrarCartas(partida)
    PasarPantalla(load)
    console.log(partida.cards)
  })

  save.addEventListener('click', () => {
    const res = resultadoMatch(partida.cards)
    match_result.innerHTML += mostrarMatch(res, partida.cards)
    let ids = partidasJugadas.map(partida => partida.id ?? 0)
    partida = {
      ...partida,
      result: res,
      id: ids.length > 0 ? Math.max(...ids) + 1 : 1
    }
    if (ids.length === 0) {
      partidasGuardadas.innerHTML = `            
      <h4>Partidas Guardadas</h4>
      <div class="partidasJugadas" id="partidaJugada"></div>
      `
    }
    partidaJugada = document.querySelector('#partidaJugada')
    partidaJugada.innerHTML += PartidaGuardada(partida)
    partidasJugadas.push(partida)
    console.log(partidasJugadas)
    PasarPantalla(match)
  })

  match.addEventListener('click', (e) => {
    partida = {
      players: [],
      cards: []
    }
    if (e.target.id === 'salirMatch') {
      removeAllChilds(match_result)
      PasarPantalla(menu)
    }
  })
}

PasarPantalla(menu)
initGame()

partidasGuardadas.addEventListener('click', (e) => {

  partidasJugadas.forEach(partida => {
    console.log(partida.id)
    if (partida.id === Number(e.target.value)) {
      mostrarCartas(partida, 'Cargando Partida...')
      buttonAsigned(1)
      verMatch.addEventListener('click', () => {
        match_result.innerHTML += mostrarMatch(partida.res, partida.cards)
        PasarPantalla(match)
      })
    }
  })
})
