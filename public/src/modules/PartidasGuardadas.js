export const PartidaGuardada = (partida) => {
  const {players,id} = partida 
  const [player1, player2] = players

  return(`
      <div class="partida">
        <div class="jugadores">
          <p class="playersName">${player1} & ${player2}</p>
        </div>
        <button value="${id}" type="button">Ver Partida</button>
      </div>
        `)
}