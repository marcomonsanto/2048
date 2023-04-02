import './style.css'
import { Game } from './game'

const game = new Game();
console.table(game.board);
console.log(game.empty);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>2048</h1>
    <div>
      <button id="swipeLeft" type="button">Left</button>
      <button id="swipeTop" type="button">Top</button>
      <button id="swipeRight" type="button">Right</button>
      <button id="swipeBottom" type="button">Bottom</button>
      <div id="board"></div>
    </div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`

