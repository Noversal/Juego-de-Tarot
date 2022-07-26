
/**
 * Genera un carrousel con las cartas de ambos jugadores
 * @param {Object} card
 * @param {String} active
 * @param {String[]} player
 * @returns {HTMLElement}
 */

export const CarouselCartas = (card,active,player) => {

  const {name,desc,img} = card
  const {player1,player2} = player

console.log({card,active,player})
  // Poner Modo ACTIVO
  let firstActive
  active === 0 ? firstActive = 'active' : active = ''
  // Crear Cartas
  if (active< 3) {
    return [
      `<div class="carousel-item ${firstActive}">
                <h4>Cartas de ${player1}</h4>
                <img src="${img}" class="d-block w-100" alt="${name}">
                <div class="carousel-caption d-md-block">
                    <p class="desc-carta">${desc}</p>
                </div>
            </div>`
    ]
  }
  else {
    return [
      `<div class="carousel-item ${firstActive}">
            <h4>Cartas de ${player2}</h4>
            <img src="${img}" class="d-block w-100" alt="${name}">
            <div class="carousel-caption d-md-block">
                <p class="desc-carta">${desc}</p>
            </div>
        </div>`
    ]
  }
}