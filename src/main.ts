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
  </div>
`

document.querySelector("#swipeLeft")?.addEventListener('click', () => game.swipe("left"))
document.querySelector("#swipeTop")?.addEventListener('click', () => game.swipe("top"))
document.querySelector("#swipeRight")?.addEventListener('click', () => game.swipe("right"))
document.querySelector("#swipeBottom")?.addEventListener('click', () => game.swipe("bottom"))