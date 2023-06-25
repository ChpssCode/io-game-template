export enum CommCode {
    addEntity,
    updateEntity,
    removeEntity,
    respawn,
    keyboard,
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