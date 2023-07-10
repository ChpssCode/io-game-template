export enum CommCode {
    addPlayer,
    addEntity,
    updateEntity,
    removeEntity,
    respawn,
    keyDown,
    handshake,
    mouse,
    mouseDown,
    mouseUp,
    gameover,
    leaderboard,
}

export const Controls = {
    UP: 1,
    DOWN: 2,
    LEFT: 4,
    RIGHT: 8,
    ROTATE_CW: 16,
    ROTATE_CCW: 32,
}

export enum ENTITY {
    PLAYER = 0,
    BULLET = 1,
    WALL = 2,
    COIN = 3,
}

export const gridSize = 150 * 2;

export const mapWidth = 19 * gridSize;//3000;
export const mapHeight = 19 * gridSize;//3000;