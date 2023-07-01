const menu = <HTMLElement>(document.getElementById("front"));
import { BufferWriter } from "../BinaryUtils";
import { ws } from "./socket";
const usernameInput = document.getElementById("username-input");

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
           bufWriter.writeU8(123)
           bufWriter.writeU16(1234)
           bufWriter.writeString((<HTMLInputElement>usernameInput).value);

           const bytes = bufWriter.getBytes();

           ws.send(bytes)
    }
})
}