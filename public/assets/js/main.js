// import { v4 as uuidv4 } from 'uuid'

const containers = document.querySelectorAll('.container')
const menu = document.querySelector('#menu')
const load = document.querySelector('#load')
const cards = document.querySelector('#cards')
const play = document.querySelector('#play')
let jugadaCartas = document.querySelector('#jugada')
let volverAtirar = document.querySelector('#volverAtirar')
let save = document.querySelector('#save')
let match = document.querySelector('#match')
let match_result = document.querySelector('#match_result')
let partidasGuardadas = document.querySelector('#partidasGuardadas')
let cartasJugadas = []


const cartas = () => {
    return (new Promise
        ((resolve, reject) => {
            fetch('assets/js/cartas.json') // Promise
                .then(res => res.json())
                .then(data => resolve(data.data))
        })
    )
}

const PasarPantalla = (pantalla) => {
    containers.forEach(container => {
        container.style.display = 'none';
    })
    pantalla.style.display = 'block'

    if (pantalla === load) {
        setTimeout(() => {
            PasarPantalla(cards)
        }, 3000)
    }
}

const tirada = (cartas) => {
    let jugada = []
    for (let tirada = 0; tirada < 6; tirada++) {
        let numeroRandom = Math.round(Math.random() * 21)
        let carta = cartas[numeroRandom]
        if (jugada.includes(carta)) {
            console.log(`${carta.name} esta carta fue repetida`)
            tirada--
        } else {
            jugada.push(cartas[numeroRandom])
        }
    }
    return (jugada)
}

const CarouselCartas = ({ name, desc, img }, ...params) => {
    let { player1, player2 } = params[1].jugadores
    console.log(player1, player2)
    console.log(name, desc, img)
    // Poner Modo ACTIVO
    let active
    params[0] === 0 ? active = 'active' : active = ''
    // Crear Cartas
    if (params[0] < 3) {
        return [
            `<div class="carousel-item ${active}">
                <p>Cartas de ${player1}</p>
                <img src="${img}" class="d-block w-100" alt="${name}">
                <div class="carousel-caption d-none d-md-block">
                    <p class="desc-carta">${desc}</p>
                </div>
            </div>`
        ]
    }
    else {
        return [
            `<div class="carousel-item ${active}">
            <p>Cartas de ${player2}</p>
            <img src="${img}" class="d-block w-100" alt="${name}">
            <div class="carousel-caption d-none d-md-block">
                <p class="desc-carta">${desc}</p>
            </div>
        </div>`
        ]
    }
}
const removeAllChilds = (parent) => {
    while (parent.firstChild) {
        console.log(parent.firstChild)
        parent.removeChild(parent.firstChild);
    }
}

const mostrarCartas = (cartas, partida) => {
    let jugada = tirada(cartas)
    while (jugadaCartas.childNodes.length < 7) {
        if (jugadaCartas.childNodes.length > 0) {
            removeAllChilds(jugadaCartas)
        } else {
            let i = 0
            jugada.forEach(carta => {
                jugadaCartas.innerHTML += CarouselCartas(carta, i, partida)
                i++
            })
            console.log(jugadaCartas.childNodes.length)
            PasarPantalla(load)
            break
        }
    }
    return jugada
}


cartas().then(data => {
    PasarPantalla(menu)
    const cartas = data
    console.log(cartas)
    let partidasJugadas = {}
    let partida = {
        jugadores: [],
        cartas: []
    }
    let i = 0

    // console.log(uuidv4())
    play.addEventListener('click', (() => {
        let player1 = document.querySelector('#player1').value
        let player2 = document.querySelector('#player2').value
        if (player1 !== "" && player2 !== "") {
            partida.jugadores = { player1, player2 }
            cartasJugadas = mostrarCartas(cartas, partida)
        }
        player1.innerHTML = ''
        player2.innerHTML = ''
    }))

    volverAtirar.addEventListener('click', (() => {
        cartasJugadas = mostrarCartas(cartas, partida)
        // console.log(cartasJugadas)
    }))

    save.addEventListener('click', (() => {
        partida.cartas = cartasJugadas
        let valor = 0
        console.log(cartasJugadas)
        cartasJugadas.map(({ score }) => {
            console.log(score)
            valor += score
        })
        // console.log(valor, 'resultado')
        // console.log(partida.cartas, 'Nuevas Cartas')
        // console.log(i)

        resultadoMatch(partida)
        partidasJugadas[i++] = {
            cartas: partida.cartas,
            jugadores: partida.jugadores,
            res: partida.res,
            value: partida.value
        }
        console.log(partidasJugadas)
        match_result.innerHTML += mostrarMatch(partida)

    }))


    match_result.addEventListener('click', ((e) => {
        console.log(e.target.firstChild.textContent === "X")
        console.log(e.target.firstChild.textContent, 'hijos')
        if (e.target.firstChild.textContent === "X") {
            removeAllChilds(match_result)
            PasarPantalla(menu)
        }

    })
    )
})

const resultadoMatch = (partida) => {
    const { cartas } = partida
    // console.log(cartasJugadas, 'resultado en resultadoMatch')
    let valor = 0
    cartas.map(({ score }) => {
        console.log(score)
        valor += score
    })
    // console.log(valor, 'resultado en resultadoMatch')
    // console.log(valor / 2, 'Hola')
    partida.value = valor
    if (valor % 2 === 0) {
        partida.res = true
    } else {
        partida.res = false
    }
}

const mostrarMatch = (partida) => {
    PasarPantalla(match)
    console.log(partida)
    const { cartas, res } = partida
    console.log(cartas[0].img)
    let resultadoTexto = 'Resultado del Match'
    return (

        `<button class="salirMatch"><span>X</span></button>
        <div class="resMatch">
        <div class="resMatch-img">
        <img src="${cartas[0].img}">
        <img src="${cartas[1].img}">
        <img src="${cartas[2].img}">
        </div>
        <h3>${resultadoTexto}</h3>
        <p>${res ? 'Si' : 'No'}</p>
        <div class="resMatch-img">
        <img src="${cartas[3].img}">
        <img src="${cartas[4].img}">
        <img src="${cartas[5].img}">
        </div>
        </div>`
    )
}
