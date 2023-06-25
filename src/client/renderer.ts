import { camera } from "./game";

const canvas = document.getElementById('gamecanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

export let vx = 0;
export let vy = 0;

export function renderer() {
  function update() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.beginPath();
    let x = 0;
    let y = 0;
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
     ctx.fill();
    requestAnimationFrame(update)
  }
  update();
}