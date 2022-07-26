export const PartidaGuardada = (partida) => {
  
  const {players,id} = partida 

  return(`
       <div class="partida">
        <div class="jugadores">
        <p>${players.player1} & ${players.player2}</p>
        </div>
        <button value=${id} type="button">Ver Partida</button>
        </div>
        `)
}