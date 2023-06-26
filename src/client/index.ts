import { socket } from "./socket"
import { renderer } from "./renderer";
import { CommCode } from "../Config";
import { ws } from "./socket";
import { BufferWriter } from "../BufferUtils";
import { userInterface } from "./userInterface";

new socket(8081);
userInterface();

setInterval(() => {
    new renderer();
}, 66)

const usernameInput = document.getElementById("nickname");

usernameInput.addEventListener("keydown", function (evt) {
    if (evt.code === "Enter") {
        //emit the request to respawn event
        const nickname: string = (<HTMLInputElement>usernameInput).value;
        const bufWriter = new BufferWriter();
        bufWriter.writeU8(123)
        bufWriter.writeU16(1234)
        bufWriter.writeString(nickname);
        console.log(nickname)

        const packet = bufWriter.getBytes();

        ws.send(packet);
    }
});

window.addEventListener("mouseup", function(event: MouseEvent){
})