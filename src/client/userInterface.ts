import { ws } from "./socket";
import { BufferWriter } from "../BufferUtils";


export function userInterface() {
const usernameInput = document.getElementById("nickname");

usernameInput.addEventListener("keydown", function (evt) {
    if (evt.code === "Enter") {
        //emit the request to respawn event
        const nickname: string = (<HTMLInputElement>usernameInput).value;
        const bufWriter = new BufferWriter();
        bufWriter.writeU8(123)
        bufWriter.writeU16(1234)
        bufWriter.writeString(nickname);

        const packet = bufWriter.getBytes();

        ws.send(packet);
    }
});
}