import { getData } from './modules/services.js'
import { CarouselCartas } from './modules/CarrouselCartas.js'


// Botones
const botonJugar = document.getElementById('play')
let volverAtirar = document.querySelector('#volverAtirar')
let save = document.querySelector('#save')
//Pantallas
const containers = document.querySelectorAll('.container')
const menu = document.querySelector('#menu')
const load = document.querySelector('#load')
const cards = document.querySelector('#cards')
//Resultados
let jugadaCartas = document.querySelector('#jugada')

function PasarPantalla (pantalla) {
  containers.forEach(container => {
    container.style.display = 'none'
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

function chuck (cards) {

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

const chunckCards = async ()=> await getData().then(cards => chuck(cards))

const mostrarCartas = ({cards,players}) => {
  while (jugadaCartas.childNodes.length < 7) {
    if (jugadaCartas.childNodes.length > 0) {
      removeAllChilds(jugadaCartas)
    } else {
      let i = 0
      cards.forEach(card => {
        jugadaCartas.innerHTML += CarouselCartas(card, i, players)
        i++
      })
      console.log(jugadaCartas.childNodes.length)
      PasarPantalla(load)
      break
    }
  }
}


function initGame () {
  PasarPantalla(menu)
  let cards = []
  let partidasJugadas = [{id:1},{id:3}]
  let partida = {
    players: [],
    cards: []
  }
  
  botonJugar.addEventListener('click', async () => {
    const player1 = document.getElementById('player1').value 
    const player2 = document.getElementById('player2').value
    
    const validateChuck = player1 !== '' && player2 !== ''
    
    if (validateChuck) { 
      cards = await chunckCards()
      partida.cards = cards
      partida.players= {player1,player2}
      mostrarCartas(partida)
      PasarPantalla(load)
      console.log(partida.cards)
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
    const {score} = partida.cards
    console.log(score)
    partida.id = partidasJugadas.length + 1
  })
}


initGame()
