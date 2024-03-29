
/**
 * Genera un carrousel con las cartas de ambos jugadores
 * @param {Object} card
 * @param {String} active
 * @param {String[]} player
 * @returns {HTMLElement}
 */

export const CarouselCartas = (card,active,player) => {

  // console.log({player1,player2})
  // Poner Modo ACTIVO
  // let firstActive
  console.log({active})
  const firstActive = active === 0 ? 'active' : ''
  // Crear Cartas
  if (active > 2) {
    return (
      `<div class="carousel-item ${firstActive}">
                <h4>Cartas de ${player[0]}</h4>
                <img src="${card.img}" class="d-block w-100" alt="${card.name}">
                <div class="carousel-caption d-md-block">
                    <p class="desc-carta">${card.desc}</p>
                </div>
            </div>`
    )
  }

  return (
    `<div class="carousel-item ${firstActive}">
            <h4>Cartas de ${player[1]}</h4>
            <img src="${card.img}" class="d-block w-100" alt="${card.name}">
            <div class="carousel-caption d-md-block">
                <p class="desc-carta">${card.desc}</p>
            </div>
        </div>`
  )

}