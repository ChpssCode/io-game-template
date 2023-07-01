import { socket } from "./socket"
import { renderer } from "./renderer";
import { CommCode } from "../Config";
import { ws } from "./socket";
import UserInterface from "./UI";

new socket(8081);
UserInterface();

setInterval(() => {
    new renderer();
}, 66)

window.addEventListener("mouseup", function(event: MouseEvent){

})