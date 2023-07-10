import { camera } from "./game";

export function renderer() {
  const canvas = document.getElementById('gamecanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  canvas.style.backgroundColor = "#4d7c51";

let scale = 1;
let inverseScale = 1 / scale;
let canvasWidth = canvas.width * inverseScale;
let canvasHeight = canvas.height * inverseScale;
let halfCanvasWidth = canvasWidth * .5;
let halfCanvasHeight = canvasHeight * .5;

canvas.oncontextmenu = function (e) {
    e.preventDefault();
};

(<any>window).ctx = ctx;

const _viewportWidth = window.innerWidth; //TODO: remove this, it was only for testing
const _viewportHeight = window.innerHeight;

//attach resize handelers onto the canvas
/**
 * Resizes the canvas in response to window resize
 * @method onResize
 */
function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scale = Math.max(window.innerWidth / _viewportWidth, window.innerHeight / _viewportHeight);
    inverseScale = 1 / scale;
    canvasWidth = canvas.width * inverseScale;
    canvasHeight = canvas.height * inverseScale;
    halfCanvasWidth = canvasWidth * .5;
    halfCanvasHeight = canvasHeight * .5;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

  window.addEventListener("resize", onResize);
  onResize(); //call function once to resize once DOM loaded

  /* function drawGrid(offsetX, offsetY) {
    const gameWidth = window.innerWidth;
    const gameHeight = window.innerHeight;

    const gridSize = 100;

    const GRID_SIZE = gridSize;
    const GRID_COLOR = "#00000023";

    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = 4;


    let startX = Math.max(0, Math.floor((offsetX - gameWidth * 0.5) / GRID_SIZE) * GRID_SIZE);
    let startY = Math.max(0, Math.floor((offsetY - gameHeight * 0.5) / GRID_SIZE) * GRID_SIZE);
    let endX = Math.min(mapWidth, Math.floor((offsetX + gameWidth * 0.5) / GRID_SIZE + 1) * GRID_SIZE);
    let endY = Math.min(mapHeight, Math.floor((offsetY + gameHeight * 0.5) / GRID_SIZE + 1) * GRID_SIZE);

    //ctx.fillStyle = COLORS.;
    //ctx.fillRect(startX, startY, endX - startX, endY - startY);

    ctx.beginPath();
    for (let dx = startX; dx <= endX; dx += GRID_SIZE) {
        ctx.moveTo(dx, startY);
        ctx.lineTo(dx, endY);
    }
    for (let dy = startY; dy <= endY; dy += GRID_SIZE) {
        ctx.moveTo(startX, dy);
        ctx.lineTo(endX, dy);
    }

    ctx.closePath();
    ctx.stroke();
} */

  function update() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    requestAnimationFrame(update)

    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI, true);
    ctx.fillStyle = '#edba76';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(100 + 40, 100 - 40, 19, 0, 2 * Math.PI, true);
    ctx.fillStyle = '#edba76';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(100 + 40, 100 + 40, 19, 0, 2 * Math.PI, true);
    ctx.fillStyle = '#edba76';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
  }
  update();
}