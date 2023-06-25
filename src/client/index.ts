import { socket } from "./socket"
import { renderer } from "./renderer";
import { CommCode } from "../Config";
import { ws } from "./socket";
import { BufferWriter } from "../BinaryUtils";

new socket(8081);

setInterval(() => {
    new renderer();
}, 66)

window.addEventListener("mouseup", function(event: MouseEvent){
const bufWriter = new BufferWriter();
bufWriter.writeU8(123)
bufWriter.writeU16(1234)
bufWriter.writeString("chpss");

const packet = bufWriter.getBytes();

ws.send(packet);
})


window.addEventListener("keydown", function (e: KeyboardEvent) {
    switch (e.code) {
       case "Enter": console.log("Enter clicked!")
       break;
    }
});

window.addEventListener("keyup", function (e: KeyboardEvent) {
    switch (e.code) {
        
    }
});