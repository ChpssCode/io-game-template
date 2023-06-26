import { BinaryTypes, BufferReader, BufferSchema, BufferWriter, SchemaCollection } from "../BufferUtils";
import { player_schema } from "../schemas";

export const ws = new WebSocket(`ws://localhost:${8081}`);

export function socket(port: number) {
    ws.binaryType ="arraybuffer"

    ws.addEventListener("open", () => {
    console.log("We are connected!");
    })

    ws.onmessage = function (e) {
        console.log(e)
    }
}