export const ws = new WebSocket(`ws://localhost:${8081}`);
import { BinaryTypes, BufferReader, BufferSchema, BufferWriter, SchemaCollection } from "../BinaryUtils";
import { hideMenu } from "./UI";


export function socket(port: number) {
    ws.binaryType ="arraybuffer"

    ws.addEventListener("open", () => {
    console.log("We are connected!");

    })

    ws.onmessage = function (e) {
        console.log(e)
    }
}