export const CarouselCartas = (...params) => {
  // console.log({params})

  const {name,desc,img} = params[0]
  const {player1,player2} = params[2]

  // console.log(`jugador1:${player1}`)
  // console.log(`jugador2:${player2}`)
  // console.log(name, desc, img)

  // Poner Modo ACTIVO
  let active
  params[1] === 0 ? active = 'active' : active = ''
  // Crear Cartas
  if (params[1] < 3) {
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