import "./style.css";
import { setupBoard } from "./board";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
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
`;

setupBoard(document.querySelector("#board")!);
