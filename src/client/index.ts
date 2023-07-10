import { socket } from "./socket"
import { renderer } from "./renderer";
import { CommCode, Controls } from "../Config";
import { ws } from "./socket";
import UserInterface from "./UI";
import { BufferWriter } from "../BinaryUtils";

new socket(8081);
UserInterface();

setInterval(() => {
    new renderer();
}, 66)

window.addEventListener("mouseup", function(event: MouseEvent){

})

window.addEventListener("keydown", function(event: KeyboardEvent) {
if(event.code === "KeyW") {
    console.log("KeyW pressed")
    const bufWriter = new BufferWriter();
    bufWriter.writeU8(CommCode.keyDown)
    bufWriter.writeU8(Controls.UP);

    const bytes = bufWriter.getBytes();

    ws.send(bytes)
}
if(event.code === "KeyA") {
    console.log("KeyA pressed")
}
if(event.code === "KeyS") {
    console.log("KeyS pressed")
}
if(event.code === "KeyD") {
    console.log("KeyD pressed")
}
})