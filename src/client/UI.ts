const menu = <HTMLElement>(document.getElementById("front"));
import { BufferWriter } from "../BinaryUtils";
import { ws } from "./socket";
const usernameInput = document.getElementById("username-input");
import { CommCode } from "../Config";

export function showMenu(){
    menu.style.display = "flex";
}

export function hideMenu(){
    menu.style.display = "none";
}

export default function UserInterface() {
usernameInput.addEventListener("keydown", (e: KeyboardEvent) => {
    if(e.code === "Enter") {
           console.log("Clicked")
           const bufWriter = new BufferWriter();
           bufWriter.writeU8(CommCode.addPlayer)
           bufWriter.writeU8(10);
           bufWriter.writeU32(10);

           console.log(CommCode.addEntity)

           const bytes = bufWriter.getBytes();

           ws.send(bytes)
           hideMenu();
    }
})
}