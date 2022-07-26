/**
 * Muestra el match en el DOM 
 * @param {Number} res 
 * @param {Array} cards 
 * @returns {HTMLElement} 
 */

export const mostrarMatch = (res,cards) => {
  let resultadoTexto = 'Resultado del Match'
  return (
    `   <button type="button" class="salirMatch" id="salirMatch">X</button>
        <div class="resMatch">
          <div class="resMatch-img">
            <img src="${cards[0].img}">
            <img src="${cards[1].img}">
            <img src="${cards[2].img}">
          </div>
          <h3>${resultadoTexto}</h3>
          <p>${res ? 'Si' : 'No'}</p>
          <div class="resMatch-img">
            <img src="${cards[3].img}">
            <img src="${cards[4].img}">
            <img src="${cards[5].img}">
          </div>
        </div>
        `
  )
}